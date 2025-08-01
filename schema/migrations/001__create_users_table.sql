-- +goose Up
CREATE TABLE users (
    id UUID PRIMARY KEY,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    email varchar(40) NOT NULL,
    hashed_password TEXT NOT NULL,
    CONSTRAINT un_user_name UNIQUE(email)
);

-- +goose Down
DROP TABLE users;

