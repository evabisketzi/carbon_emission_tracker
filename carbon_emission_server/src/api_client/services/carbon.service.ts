import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import {
    TripDetails,
    Co2eResponse,
    TripTransportBody,
    VehicleFuelMap,
    TripBody
} from "./carbon.domain";
import { lastValueFrom, map } from "rxjs";
import { TravelUrl } from "./constants";

@Injectable()
export class CarbonApiClient {
    constructor(private httpService: HttpService) {}

    async fetchEmissionsForTravel(data: TripDetails): Promise<number> {
        const transportBody = this.transformTripPostData(data);
        const response = this.httpService
            .post<Co2eResponse>(TravelUrl, transportBody)
            .pipe(
                map((response) => {
                    const co2e = response.data.trips?.[0]?.co2e;
                    if (co2e === undefined) {
                        throw new Error("co2e value not found in response");
                    }
                    return co2e;
                })
            );

        return lastValueFrom(response);
    }

    transformTripPostData(data: TripDetails): TripBody {
        const transport = this.transformTransportPostData(data);
        const requestBody: TripBody = {
            trips: [
                {
                    steps: [
                        {
                            discovery: true,
                            location: {
                                placename: data.origin
                            },
                            transport
                        },
                        {
                            discovery: true,
                            location: {
                                placename: data.destination
                            }
                        }
                    ]
                }
            ],
            save: false,
            language: "en"
        };
        return requestBody;
    }

    transformTransportPostData(data: TripDetails): TripTransportBody {
        const vehicleType = data.vehicle;
        const fuelType = data.fuel;

        if (!VehicleFuelMap[vehicleType].includes(fuelType)) {
            throw new Error(
                `Invalid fuel type: ${vehicleType} does not support ${fuelType}`
            );
        }

        const transportBody: TripTransportBody = {
            type: data.transportType,
            ways: 1,
            vehicle: {
                type: vehicleType,
                fuel: {
                    type: fuelType
                }
            },
            people: data.people
        };
        return transportBody;
    }
}
