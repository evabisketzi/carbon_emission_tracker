import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./service/auth.service";
import { AuthGuard } from "./service/auth.guard";
import { RefreshTokenService } from "./service/token.service";
import { RefreshToken } from "./entities/token.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./controllers/auth.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([RefreshToken]),
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
    providers: [AuthService, AuthGuard, RefreshTokenService],
    controllers: [AuthController]
})
export class AuthModule {}
