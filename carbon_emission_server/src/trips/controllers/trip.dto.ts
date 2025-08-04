import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";
import {
    FuelType,
    TransportType,
    VehicleType
} from "src/api_client/services/carbon.domain";

export class CreateTripDto {
    @IsNotEmpty()
    transportType!: TransportType;

    @IsNotEmpty()
    vehicle!: VehicleType;

    @IsNotEmpty()
    fuel!: FuelType;

    @IsPositive()
    @IsInt()
    people!: number;

    @IsString()
    @IsNotEmpty()
    origin!: string;

    @IsString()
    @IsNotEmpty()
    destination!: string;
}
