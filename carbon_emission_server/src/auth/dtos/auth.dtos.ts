import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginInputDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class LoginOutputDTO {
  @IsNotEmpty()
  @IsString()
  refreshToken!: string;

  @IsNotEmpty()
  @IsString()
  accessToken!: string;
}

export class SignupInputDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  lastName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  password!: string;
}
