--changeset derryk:ddl:createTable:users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL
);

--changeset derryk:ddl:createTable:difficulty_levels
CREATE TABLE difficulty_levels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    suits INTEGER NOT NULL
);

--changeset derryk:ddl:createTable:game_results
CREATE TABLE game_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    score INTEGER NOT NULL,
    difficulty_level_id INTEGER NOT NULL REFERENCES difficulty_levels(id),
    game_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    game_duration INTERVAL NOT NULL
);
