import {
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { UserToken } from "src/types/types";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    handleRequest<UserToken>(err: any, user: any, info: any): UserToken {
        if (err || !user) {
            throw err || new UnauthorizedException(`${info}`);
        }
        return user;
    }
}
