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