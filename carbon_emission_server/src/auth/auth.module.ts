import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./service/auth.service";
import { AuthGuard } from "./service/auth.guard";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>("JWT_SECRET")
            }),
            inject: [ConfigService]
        })
    ],
    providers: [AuthService],
    controllers: [],
    exports: [AuthService, AuthGuard]
})
export class AuthModule {}
