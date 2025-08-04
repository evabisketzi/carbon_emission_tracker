import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Request,
    UseGuards
} from "@nestjs/common";
import { TripService } from "../services/trip.service";
import { CreateTripDto } from "./trip.dto";
import { UUID } from "crypto";
import { JwtAuthGuard } from "src/auth/service/auth-jwt.guard";
import { TripLog } from "../services/trip.domain";
import { UserToken } from "src/types/types";

@Controller("trips")
export class TripController {
    constructor(private tripService: TripService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async registerTrip(
        @Request() req: Request,
        @Body() createBody: CreateTripDto
    ): Promise<TripLog> {
        // @ts-ignore
        const user: UserToken = req.user;
        const tripLog = await this.tripService.registerTrip({
            tripDetails: createBody,
            userId: user.userId
        });

        return tripLog;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllByUser(@Request() req: Request): Promise<TripLog[]> {
        // @ts-ignore
        const user: UserToken = req.user;
        const tripLogs = await this.tripService.findAllTripLogsForUser(
            user.userId
        );

        return tripLogs;
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getByUserAndTripId(
        @Request() req: Request,
        @Param("id") id: UUID
    ): Promise<TripLog> {
        // @ts-ignore
        const user: UserToken = req.user;
        const tripLog = await this.tripService.findTripLogForUser(
            user.userId,
            id
        );

        if (tripLog === null) {
            throw new NotFoundException(`Trip with id ${id} cannot be found`);
        }

        return tripLog;
    }
}
