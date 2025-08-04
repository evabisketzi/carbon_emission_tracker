import { UUID } from "crypto";

export interface UserToken {
    userId: UUID;
    username: string;
}

declare namespace Express {
  interface Request {
    user?: UserToken;
  }
}