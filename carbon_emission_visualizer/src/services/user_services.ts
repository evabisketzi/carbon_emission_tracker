import axios, { type AxiosResponse } from "axios";
import type { LoginResponse } from "../types/auth_types";

export type LoginDetails = {
    username: string;
    password: string;
}

class UserProvider {
  loginUser(loginData: LoginDetails): Promise<AxiosResponse<LoginResponse, any>> {
    return  axios.post<LoginResponse>('api/auth/login', loginData);
  }

}

export const userProvider = new UserProvider();