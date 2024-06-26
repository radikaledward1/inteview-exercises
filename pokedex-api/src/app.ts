import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router/router';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/pokedex', router);

export default app;