import { UUID } from "crypto";

export type AuthToken = {
    accessToken: string;
    refreshToken: string;
}

export type TokenPayload = {
    username: string;
    // The subject of the jwt needs to be the user id
    // which in our case it is a UUID
    sub: UUID;
}