import { UUID } from "crypto";
import { TripDetails } from "src/api_client/services/carbon.domain";

export type TripLog = TripDetails & {
    id: UUID;
    total_emissions: number;
    emissions_pp: number;
}