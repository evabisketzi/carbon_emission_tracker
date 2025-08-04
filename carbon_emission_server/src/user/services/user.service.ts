import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserProps, UserProps } from "./user.domain";
import { UUID } from "crypto";
import { compare, hash } from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<UserProps[]> {
        return this.usersRepository.find();
    }

    findById(id: UUID): Promise<UserProps | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async validateUsernamePassword(
        username: string,
        password: string
    ): Promise<UserProps | null> {
        const user = await this.usersRepository.findOneBy({ username });

        if (user == null) {
            return null;
        }

        compare(user.password, password, (err) => {
            if (err) {
                throw err;
            }
        });

        return user;
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async saveUser(userData: CreateUserProps): Promise<UUID> {
        const hashedPass = await hash(userData.password, 10);
        const user = this.usersRepository.create({
            ...userData,
            password: hashedPass
        });

        const savedUser = await this.usersRepository.save(user);
        return savedUser.id;
    }
}
