import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { UserProps } from 'src/user/services/user.domain';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokenServices: RefreshTokenService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUsernamePassword(username, pass);

    const payload = {
      username: user.username,
      sub: user.id,
    };

    const refreshToken = await this.tokenServices.createRefreshToken(username, user.id)

    const authToken = await {
      refreshToken: this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRY'),
      }),
      accessToken: this.jwtService.signAsync(payload),
    };


  }
}
