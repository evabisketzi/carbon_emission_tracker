export type TransportType =
    | "digital"
    | "driving"
    | "flying"
    | "public-transport"
    | "transfer";

export type VehicleType =
    | "bus"
    | "motorhome"
    | "minivan"
    | "car-large"
    | "car-small"
    | "car"
    | "flight-charter-economy-premium"
    | "flight-regular-business"
    | "flight-regular-economy-premium"
    | "flight-charter-economy"
    | "flight-regular-economy"
    | "tram"
    | "subway"
    | "train"
    | "transfer";

export type FuelType =
    | "fame"
    | "bio-diesel"
    | "ferrydiesel"
    | "diesel"
    | "bio-gas"
    | "natural-gas"
    | "fossil-gas"
    | "electricity"
    | "gasoline"
    | "ethanol"
    | "bio-fuel"
    | "jetfuel";

export const VehicleFuelMap: Record<VehicleType, Array<FuelType>> = {
    bus: ["fame", "bio-diesel", "ferrydiesel", "diesel"],
    car: [
        "bio-gas",
        "natural-gas",
        "fossil-gas",
        "electricity",
        "diesel",
        "gasoline",
        "ethanol",
        "bio-diesel",
        "ferrydiesel"
    ],
    "car-large": [
        "electricity",
        "fossil-gas",
        "natural-gas",
        "bio-gas",
        "ethanol",
        "bio-diesel",
        "diesel",
        "gasoline",
        "ferrydiesel"
    ],
    "car-small": [
        "ferrydiesel",
        "natural-gas",
        "bio-gas",
        "ethanol",
        "diesel",
        "gasoline",
        "electricity",
        "fossil-gas",
        "bio-diesel"
    ],
    "flight-charter-economy": ["bio-fuel", "jetfuel"],
    "flight-charter-economy-premium": ["bio-fuel", "jetfuel"],
    "flight-regular-business": ["bio-fuel", "jetfuel"],
    "flight-regular-economy": ["bio-fuel", "jetfuel"],
    "flight-regular-economy-premium": ["bio-fuel", "jetfuel"],
    minivan: [
        "ethanol",
        "bio-gas",
        "natural-gas",
        "fossil-gas",
        "electricity",
        "diesel",
        "gasoline",
        "bio-diesel",
        "ferrydiesel"
    ],
    motorhome: [
        "gasoline",
        "ferrydiesel",
        "electricity",
        "fossil-gas",
        "natural-gas",
        "diesel",
        "bio-gas",
        "ethanol",
        "bio-diesel"
    ],
    tram: ["electricity"],
    subway: ["electricity"],
    train: ["bio-diesel", "electricity", "diesel"],
    transfer: ["diesel"]
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
    type: TransportType;
    vehicle: VehicleType;
    fuel: FuelType;
    people: number;
    origin: string;
    destination: string;
};

export type Co2eResponse = {
    trips: Array<{ co2e: number }>;
};
