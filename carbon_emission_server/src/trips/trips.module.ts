import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarbonApiModule } from "src/api_client/carbon.module";
import { Trip } from "./entities/trip.entity";
import { AuthModule } from "src/auth/auth.module";
import { TripController } from "./controllers/trip.controller";
import { TripService } from "./services/trip.service";
import { JwtStrategy } from "src/auth/service/jwt-strategy.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([Trip]),
        CarbonApiModule,
        AuthModule,
    ],
    providers: [TripService, JwtStrategy],
    controllers: [TripController]
})
export class TripModule {}
