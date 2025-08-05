export enum TransportType {
    driving = "driving",
    flying = "flying",
    "public-transport" = "public-transport",
    transfer = "transfer",
    default = "default" // Adding a default value for when we initialize the react state
}

export enum VehicleType {
    bus = "bus",
    motorhome = "motorhome",
    minivan = "minivan",
    "car-large" = "car-large",
    "car-small" = "car-small",
    car = "car",
    "flight-charter-economy-premium" = "flight-charter-economy-premium",
    "flight-regular-business" = "flight-regular-business",
    "flight-regular-economy-premium" = "flight-regular-economy-premium",
    "flight-charter-economy" = "flight-charter-economy",
    "flight-regular-economy" = "flight-regular-economy",
    tram = "tram",
    subway = "subway",
    train = "train",
    transfer = "transfer",
    default = "default"  // Adding a default value for when we initialize the react state
}

export enum FuelType {
    fame = "fame",
    "bio-diesel" = "bio-diesel",
    "ferrydiesel" = "ferrydiesel",
    "diesel" = "diesel",
    "bio-gas" = "bio-gas",
    "natural-gas" = "natural-gas",
    "fossil-gas" = "fossil-gas",
    "electricity" = "electricity",
    "gasoline" = "gasoline",
    "ethanol" = "ethanol",
    "bio-fuel" = "bio-fuel",
    "jetfuel" = "jetfuel",
    default = "default"  // Adding a default value for when we initialize the react state
}

export const VehicleFuelMap: Map<VehicleType, Array<FuelType>> = new Map([
    [VehicleType.bus, [
        FuelType.fame,
        FuelType["bio-diesel"],
        FuelType.ferrydiesel,
        FuelType.diesel
    ]],
    [VehicleType.car, [
        FuelType["bio-gas"],
        FuelType["natural-gas"],
        FuelType["fossil-gas"],
        FuelType.electricity,
        FuelType.diesel,
        FuelType.gasoline,
        FuelType.ethanol,
        FuelType["bio-diesel"],
        FuelType.ferrydiesel
    ]],
    [VehicleType["car-large"], [
        FuelType.electricity,
        FuelType["fossil-gas"],
        FuelType["natural-gas"],
        FuelType["bio-gas"],
        FuelType.ethanol,
        FuelType["bio-diesel"],
        FuelType.diesel,
        FuelType.gasoline,
        FuelType.ferrydiesel
    ]],
    [VehicleType["car-small"], [
        FuelType.ferrydiesel,
        FuelType["natural-gas"],
        FuelType["bio-gas"],
        FuelType.ethanol,
        FuelType.diesel,
        FuelType.gasoline,
        FuelType.electricity,
        FuelType["fossil-gas"],
        FuelType["bio-diesel"]
    ]],
    [VehicleType["flight-charter-economy"], [
        FuelType["bio-fuel"],
        FuelType.jetfuel
    ]],
    [VehicleType["flight-charter-economy-premium"], [
        FuelType["bio-fuel"],
        FuelType.jetfuel
    ]],
    [VehicleType["flight-regular-business"], [
        FuelType["bio-fuel"],
        FuelType.jetfuel
    ]],
    [VehicleType["flight-regular-economy"], [
        FuelType["bio-fuel"],
        FuelType.jetfuel
    ]],
    [VehicleType["flight-regular-economy-premium"], [
        FuelType["bio-fuel"],
        FuelType.jetfuel
    ]],
    [VehicleType.minivan, [
        FuelType.ethanol,
        FuelType["bio-gas"],
        FuelType["natural-gas"],
        FuelType["fossil-gas"],
        FuelType.electricity,
        FuelType.diesel,
        FuelType.gasoline,
        FuelType["bio-diesel"],
        FuelType.ferrydiesel
    ]],
    [VehicleType.motorhome, [
        FuelType.gasoline,
        FuelType.ferrydiesel,
        FuelType.electricity,
        FuelType["fossil-gas"],
        FuelType["natural-gas"],
        FuelType.diesel,
        FuelType["bio-gas"],
        FuelType.ethanol,
        FuelType["bio-diesel"]
    ]],
    [VehicleType.tram, [FuelType.electricity]],
    [VehicleType.subway, [FuelType.electricity]],
    [VehicleType.train, [
        FuelType["bio-diesel"],
        FuelType.electricity,
        FuelType.diesel
    ]],
    [VehicleType.transfer, [FuelType.diesel]]
]);

export type TripDetails = {
    transportType: TransportType;
    vehicle: VehicleType;
    fuel: FuelType;
    people: number;
    origin: string;
    destination: string;
    tripDate: Date;
};

export type TripLog = TripDetails & {
    id: string;
    total_emissions: number;
    emissions_pp: number;
};

export type Co2eResponse = {
    trips: Array<{ co2e: number }>;
};
