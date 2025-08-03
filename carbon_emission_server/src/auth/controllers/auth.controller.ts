import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post
} from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { LoginInputDTO, SignupInputDTO } from "../dtos/auth.dtos";
import { AuthToken } from "../service/auth.domain";
import { UserService } from "src/user/services/user.service";
import { UUID } from "node:crypto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post("login")
    async login(@Body() loginInput: LoginInputDTO): Promise<AuthToken> {
        return this.authService.signIn(
            loginInput.username,
            loginInput.password
        );
    }

    @Post("signup")
    async signup(@Body() signupInput: SignupInputDTO): Promise<UUID> {
        try {
            const user = await this.userService.saveUser(signupInput);
            return user;
        } catch (error) {
            throw new HttpException(
                `Error while creating the user ${error}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
