import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { RefreshTokenService } from './token.service';
import { createMock } from '@golevelup/ts-jest';
import { ModuleMocker, MockMetadata } from 'jest-mock';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RefreshToken } from '../entities/token.entity';

const moduleMocker = new ModuleMocker(global);

describe('RefreshTokenService Unit Test', () => {
    let refreshTokenService: RefreshTokenService;
    let jwtService: jest.Mocked<JwtService>;
    let configService: jest.Mocked<ConfigService>;

    const jwtServiceMock = {
        sign: jest.fn(),
    };

    const configServiceMock = {
        get: jest.fn((key: string) => {
            if (key === 'REFRESH_TOKEN_EXPIRY') {
                return '3600'; // or whatever value your service expects
            }
            return undefined;
        }),
    };

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [RefreshTokenService, {
                provide: getRepositoryToken(RefreshToken),
                useValue: {
                    save: jest.fn(),
                    update: jest.fn().mockResolvedValue(true),
                    delete: jest.fn().mockResolvedValue(true),
                    create: jest.fn().mockResolvedValue(true),
            }},{
                provide: JwtService,
                useValue: jwtServiceMock,
            },
            {
                provide: ConfigService,
                useValue: configServiceMock,
            }],
        }).compile();


        jwtService = moduleRef.get(JwtService);
        configService = moduleRef.get(ConfigService);
        refreshTokenService = moduleRef.get(RefreshTokenService); 
    });

    describe('signIn', () => {
        it('should throw exception if sign fails', async () => {
            const userUUID = crypto.randomUUID();
            jwtServiceMock.sign.mockImplementation(() => {
                throw new Error('This function always throws an error.');
            });

            await expect(refreshTokenService.createRefreshToken('testUser', userUUID))
                .rejects
                .toThrow(Error);
        });    

        it('should return correct token value', async () => {
            const userUUID = crypto.randomUUID();
            jwtServiceMock.sign.mockResolvedValue('token-value');

            const token = await refreshTokenService.createRefreshToken('testUser', userUUID);
            expect(token).toBe('token-value');
        });    
    });
})

