import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                timeout: 5000,
                maxRedirects: 5,
                headers: {
                    "x-rapidapi-key": configService.get<string>("API_KEY"),
                    "x-rapidapi-host": configService.get<string>("HOST"),
                    "Content-Type": "application/json"
                }
            })
        })
    ],
    providers: [CarbonApiClient],
    controllers: [],
    exports: []
})
export class CarbonApiClient {}
