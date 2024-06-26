import { Router } from "express";
import pokemonRoutes from "./pokemons";

const router = Router();

router.use('/pokemons', pokemonRoutes);

router.get('/', (req, res) => {
    res.status(200).send('Welcome to the Pokedex API');
})

export default router;