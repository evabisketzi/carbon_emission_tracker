import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarbonApiModule } from "src/api_client/carbon.module";
import { Trip } from "./entities/trip.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Trip]), CarbonApiModule, AuthModule]
})
export class TripModule {}
