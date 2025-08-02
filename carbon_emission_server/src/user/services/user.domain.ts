import { UUID } from "crypto";

export type UserProps = {
    id: UUID;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    created: Date;
    updated: Date;
}

export type CreateUserProps = Omit<UserProps, "id"> & { password: string }