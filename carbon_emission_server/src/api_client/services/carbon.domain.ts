export enum TransportType {
    "digital",
    "driving",
    "flying",
    "public-transport",
    "transfer"
}

export enum VehicleType {
    "bus",
    "motorhome",
    "minivan",
    "car-large",
    "car-small",
    "car",
    "flight-charter-economy-premium",
    "flight-regular-business",
    "flight-regular-economy-premium",
    "flight-charter-economy",
    "flight-regular-economy",
    "tram",
    "subway",
    "train",
    "transfer"
}

export enum FuelType {
    "fame",
    "bio-diesel",
    "ferrydiesel",
    "diesel",
    "bio-gas",
    "natural-gas",
    "fossil-gas",
    "electricity",
    "gasoline",
    "ethanol",
    "bio-fuel",
    "jetfuel"
}

export const VehicleFuelMap: Record<VehicleType, Array<FuelType>> = {
    [VehicleType.bus]: [
        FuelType.fame,
        FuelType["bio-diesel"],
        FuelType.ferrydiesel,
        FuelType.diesel
    ],
    [VehicleType.car]: [
        FuelType["bio-gas"],
        FuelType["natural-gas"],
        FuelType["fossil-gas"],
        FuelType.electricity,
        FuelType.diesel,
        FuelType.gasoline,
        FuelType.ethanol,
        FuelType["bio-diesel"],
        FuelType.ferrydiesel
    ],
    [VehicleType["car-large"]]: [
        FuelType.electricity,
        FuelType["fossil-gas"],
        FuelType["natural-gas"],
        FuelType["bio-gas"],
        FuelType.ethanol,
        FuelType["bio-diesel"],
        FuelType.diesel,
        FuelType.gasoline,
        FuelType.ferrydiesel
    ],
    [VehicleType["car-small"]]: [
        FuelType.ferrydiesel,
        FuelType["natural-gas"],
        FuelType["bio-gas"],
        FuelType.ethanol,
        FuelType.diesel,
        FuelType.gasoline,
        FuelType.electricity,
        FuelType["fossil-gas"],
        FuelType["bio-diesel"]
    ],
    [VehicleType["flight-charter-economy"]]: [
        FuelType["bio-fuel"],
        FuelType.jetfuel
    ],
    [VehicleType["flight-charter-economy-premium"]]: [
        FuelType["bio-fuel"],
        FuelType.jetfuel
    ],
    [VehicleType["flight-regular-business"]]: [
        FuelType["bio-fuel"],
        FuelType.jetfuel
    ],
    [VehicleType["flight-regular-economy"]]: [
        FuelType["bio-fuel"],
        FuelType.jetfuel
    ],
    [VehicleType["flight-regular-economy-premium"]]: [
        FuelType["bio-fuel"],
        FuelType.jetfuel
    ],
    [VehicleType.minivan]: [
        FuelType.ethanol,
        FuelType["bio-gas"],
        FuelType["natural-gas"],
        FuelType["fossil-gas"],
        FuelType.electricity,
        FuelType.diesel,
        FuelType.gasoline,
        FuelType["bio-diesel"],
        FuelType.ferrydiesel
    ],
    [VehicleType.motorhome]: [
        FuelType.gasoline,
        FuelType.ferrydiesel,
        FuelType.electricity,
        FuelType["fossil-gas"],
        FuelType["natural-gas"],
        FuelType.diesel,
        FuelType["bio-gas"],
        FuelType.ethanol,
        FuelType["bio-diesel"]
    ],
    [VehicleType.tram]: [FuelType.electricity],
    [VehicleType.subway]: [FuelType.electricity],
    [VehicleType.train]: [
        FuelType["bio-diesel"],
        FuelType.electricity,
        FuelType.diesel
    ],
    [VehicleType.transfer]: [FuelType.diesel]
};

export type VehicleFuelProp = {
    type: VehicleType;
    fuel: { type: FuelType };
};

export type TripTransportBody = {
    type: TransportType;
    vehicle: VehicleFuelProp;
    people: number;
    ways: number;
};

export type TripBody = {
    trips: Array<{
        steps: Array<{
            discovery: boolean;
            location: {
                placename: string;
            };
            transport?: TripTransportBody;
        }>;
    }>;
    save: boolean;
    language: string;
};

export type TripDetails = {
    transportType: TransportType;
    vehicle: VehicleType;
    fuel: FuelType;
    people: number;
    origin: string;
    destination: string;
};

export type Co2eResponse = {
    trips: Array<{ co2e: number }>;
};
