import { UUID } from "crypto";
import { Column, Entity } from "typeorm";

@Entity({name: "refresh_tokens"})
export class RefreshToken {

    @Column({name: "token", type: 'text', nullable: false})
    token!: string;

    @Column({name: "user_id", type: 'uuid', nullable: false})
    userId!: UUID

    @Column({name: 'created_at', type: 'timestamp', nullable: false})
    created!: Date;

    @Column({name: 'updated_at', type: 'timestamp', nullable: true})
    updated!: Date;

    @Column({name: 'expires_at', type: 'timestamp', nullable: false})
    expires!: Date;

    @Column({name: 'revoked_at', type: 'timestamp', nullable: true})
    revoked!: Date;
}
