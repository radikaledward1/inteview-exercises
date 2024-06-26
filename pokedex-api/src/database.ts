import { DataSource } from "typeorm";
import {Pokemon} from "./entities/Pokemon";
import {Evolution} from "./entities/Evolution";
import {Type} from "./entities/Type";
import { truncateSync } from "fs";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "secretpassword",
    database: "MyPokemons",
    synchronize: false,
    logging: true,
    entities: [Pokemon, Evolution, Type],
    subscribers: [],
    migrations: [],
})