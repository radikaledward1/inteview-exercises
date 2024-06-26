import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './database';

async function startApp() {

    try {
     
        await AppDataSource.initialize();
        console.log('Pokedex Postgres Database connected ...');

        app.listen(3001);
        console.log('Express Server running the Pokedex Api on port 3001');

    } catch (error) {
        console.log('Error starting the PokeApi: ', error)
    }
}

startApp();
