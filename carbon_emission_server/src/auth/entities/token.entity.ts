import { UUID } from "crypto";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "refresh_tokens" })
export class RefreshToken {
    @PrimaryColumn({ name: "token", type: "text", nullable: false })
    token!: string;

    @Column({ name: "user_id", type: "uuid", nullable: false })
    userId!: UUID;

    @Column({ name: "created_at", type: "timestamp", nullable: false })
    created!: Date;

    @Column({ name: "updated_at", type: "timestamp", nullable: true })
    updated!: Date;

    @Column({ name: "expires_at", type: "timestamp", nullable: false })
    expires!: Date;

    @Column({ name: "revoked_at", type: "timestamp", nullable: true })
    revoked!: Date;

    @BeforeInsert()
    generateId() {
        this.created = new Date();
        this.updated = this.created;
    }
}
