import axios, { type AxiosResponse } from "axios";
import { from, type Observable } from "rxjs";
import type { LoginResponse } from "../types/auth_types";

export type LoginDetails = {
    username: string;
    password: string;
}

class UserProvider {
  loginUser(loginData: LoginDetails): Observable<AxiosResponse<LoginResponse, any>> {
    return  from(
        axios.post<LoginResponse>('api/auth/login', loginData)
    )
  }

}

export const userProvider = new UserProvider();