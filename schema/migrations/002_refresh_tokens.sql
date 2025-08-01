-- +goose Up
CREATE TABLE refresh_tokens (
    token TEXT PRIMARY KEY,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    user_id  UUID NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
    expires_at timestamp NOT NULL,
    revoked_at timestamp NULL
);

-- +goose Down
DROP TABLE refresh_tokens;

