import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/services/user.service";
import { UserProps } from "src/user/services/user.domain";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RefreshTokenService } from "./token.service";
import { AuthToken } from "./auth.domain";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokenServices: RefreshTokenService,
  ) {}

  async signIn(username: string, pass: string): Promise<AuthToken> {
    const user = await this.usersService.validateUsernamePassword(
      username,
      pass,
    );

    const payload = {
      username: user.username,
      sub: user.id,
    };

    const refreshToken = this.tokenServices.createRefreshToken(
      username,
      user.id,
    );

    const authToken = {
      refreshToken: refreshToken,
      accessToken: this.jwtService.signAsync(payload),
    };

    return authToken;
  }
}
