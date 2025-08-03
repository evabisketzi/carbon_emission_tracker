import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import {
    LoginInputDTO,
    LoginOutputDTO,
    SignupInputDTO
} from "../dtos/auth.dtos";
import { AuthToken } from "../service/auth.domain";
import { UserService } from "src/user/services/user.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post("login")
    async login(@Body() loginInput: LoginInputDTO) {
        const authToken: AuthToken = await this.authService.signIn(
            loginInput.username,
            loginInput.password
        );
        return { ...authToken };
    }

    @Post("signup")
    async signup(@Body() signupInput: SignupInputDTO) {
        this.userService.saveUser(signupInput);
    }
}
