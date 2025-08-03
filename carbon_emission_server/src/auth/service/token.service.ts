import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { RefreshToken } from "../entities/token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UUID } from "crypto";

@Injectable()
export class RefreshTokenService {
    constructor(
        @InjectRepository(RefreshToken)
        private tokenRepository: Repository<RefreshToken>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async createRefreshToken(userName: string, userId: UUID): Promise<string> {
        const duration = this.configService.get<number>("REFRESH_TOKEN_EXPIRY");

        if (duration === undefined) {
            throw new Error("Missing REFRESH_TOKEN_EXPIRY config value");
        }

        const refreshToken = this.jwtService.sign(
            {
                sub: userId,
                userName
            },
            {
                expiresIn: duration
            }
        );

        const expiresAt = new Date(Date.now() + duration * 100);

        const tokenRow = this.tokenRepository.create({
            token: refreshToken,
            created: new Date(),
            userId: userId,
            expires: expiresAt
        });

        try {
            await this.tokenRepository.save(tokenRow);
        } catch {
            throw new Error("Error while creating the refresh token");
        }

        return refreshToken;
    }
}
