import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import path from "node:path";
import { TripModule } from "./trips/trips.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                path.resolve(
                    "/home/eva/Workspace/Carbon_Emission_Tracker/carbon_emission_server/.env"
                )
            ],
            isGlobal: true
        }),
        DatabaseModule,
        UserModule,
        TripModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
