import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CarbonApiClient } from "./services/carbon.service";

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                timeout: 5000,
                maxRedirects: 5,
                headers: {
                    "x-rapidapi-key": configService.get<string>("API_KEY", ""),
                    "x-rapidapi-host": configService.get<string>("HOST", ""),
                    "Authorization": `Bearer ${configService.get<string>("API_KEY", "")}`,
                    "Content-Type": "application/json",
                    "Accept": 'application/json'
                },
            }),
            inject: [ConfigService]
        })
    ],
    providers: [CarbonApiClient],
    controllers: [],
    exports: [CarbonApiClient]
})
export class CarbonApiModule {}
