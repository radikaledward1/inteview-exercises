import { Request, Response } from 'express';
import {Pokemon} from "../entities/Pokemon";
import { Evolution } from '../entities/Evolution';
import { Type } from '../entities/Type';
import { PokemonResponseDto } from '../Utils/PokemonDtos';
import { AppDataSource } from '../database';

export const getPokemons = async (req: Request, res: Response) => {
 
    try {
        
        const pokemons = await AppDataSource
        .getRepository(Pokemon)
        .createQueryBuilder('pokemon')
        .leftJoinAndSelect('pokemon.type', 'type')
        .leftJoinAndSelect('pokemon.evolutions', 'evolutions')
        .select(['pokemon.pokemon_id', 'pokemon.name', 'pokemon.image', 'type.type_id', 'type.name', 'pokemon.attack', 'evolutions'])
        .getMany()

        let response = pokemons.map((pokemon) => {
            let _pokemon: PokemonResponseDto = {
                pokemon_id: pokemon.pokemon_id,
                name: pokemon.name,
                image: pokemon.image,
                type: {id: pokemon.type.type_id, name: pokemon.type.name},
                attack: pokemon.attack,
                evolutions: pokemon.evolutions.map((evolution: Evolution) => ({
                    id: evolution.envolves_id,
                    name: evolution.name
                }))
            }

            return _pokemon;
        })

        return res.status(200).json(response);
        
    } catch (error: any) {
        
        return res.status(500).json({status: 500, message: 'Internal server error', description: error.message})
    }
}

export const savePokemon = async (req: Request, res: Response) => {
    const { pokemon_id, name, image, type, attack, evolutions } = req.body;

    try {

        const pokemonFound = await Pokemon.findOne({where: {pokemon_id: pokemon_id}})
        if (pokemonFound) {
            return res.status(302).json({status: 302, message: 'Pokemon already exists'})
        }

        let dbType = await Type.findOne({where: {type_id: type.id}})
        if (!dbType) {
            dbType = new Type()
            dbType.type_id = type.id
            dbType.name = type.name

            dbType.save()
        }

        const pokemon = new Pokemon()
        pokemon.pokemon_id = pokemon_id
        pokemon.name = name
        pokemon.image = image
        pokemon.type = dbType
        pokemon.attack = attack

        await pokemon.save()

        for (const evo of evolutions) {
            const evolution = new Evolution();
            evolution.pokemon = pokemon
            evolution.envolves_id = evo.id
            evolution.name = evo.name

            await evolution.save()
        }

        return res.status(200).json({status: 200, message: 'Pokemon saved'});

    } catch (error) {
        
        if (error instanceof Error) {
            return res.status(500).json({status: 500, message: 'Internal server error', description: error.message})
        }
    }
}

export const deletePokemon = async (req: Request, res: Response) => {
    const { pokemonid } = req.params;

    try {
        
        const pokemon = await Pokemon.findOne({where: {pokemon_id: parseInt(pokemonid)}})

        if (!pokemon) {
            return res.status(404).json({status: 404, message: 'Pokemon not found'})
        }

        //First deletes the evolutions taht contains the foreign key of the pokemon_id
        const evosDeleted = await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Evolution)
        .where('pokemon_id = :pokemon_id', {pokemon_id: pokemon.pokemon_id})
        .execute()

        //After deletes the pokemon evolutions, deletes the pokemon
        const pokemonsDeleted = await Pokemon.delete({pokemon_id: pokemon.pokemon_id})
        //const evosDelete = await Evolution.delete({pokemon_id: pokemon.pokemon_id})

        if (pokemonsDeleted.affected === 0 || evosDeleted.affected === 0) {
            return res.status(500).json({status: 500, message: 'Internal server error. Cannot remove pokemon'})
        }

        return res.status(204).json({status: 204, message: 'Pokemon removed'});

    } catch (error: any) {

        return res.status(500).json({status: 500, message: 'Internal server error', description: error.message})
    }
}

export const getPokemonTypes = async (req: Request, res: Response) => {
    try {
        const types = await Type.find();

        return res.status(200).json(types);

    } catch (error: any) {

        return res.status(500).json({status: 500, message: 'Internal server error', description: error.message})
    }
}