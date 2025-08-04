-- +goose Up
CREATE TYPE transport_type_enum AS ENUM ( "digital",
    "driving",
    "flying",
    "public-transport",
    "transfer"
);
CREATE TYPE vehicle_type_enum AS ENUM ( "bus",
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
);
CREATE TYPE fuel_type_enum AS ENUM (
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
    "jetfuel",
);

CREATE TABLE trips (
    id UUID PRIMARY KEY,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    transport_type transport_type_enum NOT NULL,
    vehicle vehicle_type_enum NOT NULL,
    fuel fuel_type_enum NOT NULL,
    origin varchar(40) NOT NULL,
    destination TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    emissions real NOT NULL
);

-- +goose Down
DROP TABLE trips;

