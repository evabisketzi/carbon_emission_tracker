import { UUID } from "crypto";
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: UUID;

    @Column({ name: "username", type: "varchar", nullable: false })
    username!: string;

    @Column({ name: "first_name", type: "varchar", nullable: false })
    firstName!: string;

    @Column({ name: "last_name", type: "varchar", nullable: false })
    lastName!: string;

    @Column({ name: "email", type: "varchar", nullable: false })
    email!: string;

    @Column({ name: "password", type: "varchar", nullable: false })
    password!: string;

    @Column({ name: "created_at", type: "timestamp", nullable: false })
    created!: Date;

    @Column({ name: "updated_at", type: "timestamp", nullable: true })
    updated!: Date;

    @BeforeInsert()
    generateId() {
        this.id = crypto.randomUUID();
        this.created = new Date();
    }
}
