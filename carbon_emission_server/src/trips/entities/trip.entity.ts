import { UUID } from "crypto";
import {
    FuelType,
    TransportType,
    VehicleType
} from "src/api_client/services/carbon.domain";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "trips" })
export class Trip {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: UUID;

    @Column({
        name: "transport_type",
        type: "enum",
        enum: TransportType,
        nullable: false
    })
    transportType!: TransportType;

    @Column({
        name: "vehicle",
        type: "enum",
        enum: VehicleType,
        nullable: false
    })
    vehicle!: VehicleType;

    @Column({ name: "fuel", type: "enum", enum: FuelType, nullable: false })
    fuel!: FuelType;

    @Column({ name: "origin", nullable: false })
    origin!: string;

    @Column({ name: "destination", nullable: false })
    destination!: string;

    @Column({ name: "emissions", nullable: false })
    emissions!: number;

    @Column({ name: "created_at", type: "timestamp", nullable: false })
    created!: Date;

    @Column({ name: "updated_at", type: "timestamp", nullable: false })
    updated!: Date;

    @Column({ name: "people", type: "int", nullable: false })
    people!: number;

    @Column({ name: "user_id", type: "uuid", nullable: false })
    userId!: UUID;

    @BeforeInsert()
    generateId() {
        this.id = crypto.randomUUID();
        this.created = new Date();
        this.updated = this.created;
    }
}
