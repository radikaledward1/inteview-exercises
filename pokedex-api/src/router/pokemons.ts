import { Router } from "express";
import { getPokemons, savePokemon, getPokemonTypes, deletePokemon } from "../services/pokemons"

const router = Router();

router.get('/', getPokemons)
router.post('/save',savePokemon)

router.get('/types',getPokemonTypes)
router.delete('/delete/:pokemonid', deletePokemon)

export default router;