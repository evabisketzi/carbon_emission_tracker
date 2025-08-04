import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Trip } from "../entities/trip.entity";
import { Repository } from "typeorm";
import { TripDetails } from "src/api_client/services/carbon.domain";
import { CarbonApiClient } from "src/api_client/services/carbon.service";
import { TripLog } from "./trip.domain";
import { UUID } from "crypto";

@Injectable()
export class TripService {
    constructor(
        @InjectRepository(Trip)
        private tripRepository: Repository<Trip>,
        private apiClient: CarbonApiClient,
    ){}

    async registerTrip(props: {
        tripDetails: TripDetails,
        userId: UUID
    }): Promise<TripLog> {
        const {tripDetails, userId} = props;
        const emissions = await this.apiClient.fetchEmissionsForTravel(tripDetails);

        const tripRow = this.tripRepository.create({
            ...tripDetails,
            emissions,
            userId,
        });


        try {
            await this.tripRepository.save(tripRow);
        } catch (error) {
            throw new Error(`Error while creating the trip entry: ${error}`);
        }

        return {
            id: tripRow.id,
            ...tripDetails,
            total_emissions: emissions,
            emissions_pp: emissions/tripDetails.people,
        }
    }

    async findAllTripLogsForUser(userId: UUID): Promise<TripLog[]> {
        const trips = await this.tripRepository.findBy({userId});        
        return  trips.map((entry) => {
            const tripLog: TripLog =  {
            ...entry,
            total_emissions: entry.emissions,
            emissions_pp: entry.emissions/entry.people
        }
        return tripLog;});
    }

    async findTripLogForUser(userId: UUID, tripId: UUID): Promise<TripLog | null> {
        const trip = await this.tripRepository.findOneBy({userId, id: tripId}); 
        return ( trip !== null ? {
            ...trip,
            total_emissions: trip.emissions,
            emissions_pp: trip.emissions/trip.people
        } : null)
       
    }
}