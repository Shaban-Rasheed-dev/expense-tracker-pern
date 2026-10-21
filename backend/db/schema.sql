CREATE TABLE IF NOT EXISTS users (
    id             INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name     VARCHAR(50)  NOT NULL,
    last_name      VARCHAR(50)  NOT NULL,
    email          VARCHAR(255) NOT NULL UNIQUE,
    password       VARCHAR(255) NOT NULL,
    phone_no       VARCHAR(50),
    otp            VARCHAR(255),
    otp_expire_at  TIMESTAMPTZ,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ
);


-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id             INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id        INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name           VARCHAR(50) NOT NULL,
    type           VARCHAR(10) NOT NULL CHECK (type IN ('income','expense')),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ

);

-- One user cannot have the same name twice for the same type (Bike and bike count as the same)
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_category_name_type
    ON categories (user_id, LOWER(name), type);

