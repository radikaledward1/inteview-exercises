-- Crear la base de datos
CREATE DATABASE MyPokemons;

CREATE TABLE pokemons (
    id SERIAL,
    pokemon_id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    type INTEGER NOT NULL,
    attack INTEGER NOT NULL
);

CREATE TABLE types (
    id SERIAL,
    type_id INTEGER PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE evolutions (
    id SERIAL,
    evolution_id INTEGER PRIMARY KEY NOT NULL,
    pokemon_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Crear el usuario root
-- CREATE USER root WITH PASSWORD 'root';

-- Otorgar privilegios al usuario root
-- GRANT ALL PRIVILEGES ON DATABASE MyPokemons TO root;