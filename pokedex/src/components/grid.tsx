import React, {useState, useEffect, useCallback} from 'react';
import Card from './card';
import styled from 'styled-components';
import { Pokemon } from '../utils/types';

const GridContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`;

interface GridProps {
    myPokedex: Boolean;
    pokemons: Pokemon[];
    savePokemon?: (pokemon_id: number) => void;
    deletePokemon?: (pokemon_id: number) => void;
};

export default function Grid({myPokedex, pokemons, savePokemon, deletePokemon}: GridProps) {

    const getPokemonIdToSave = useCallback((pokemon_id: number) => {
        if (savePokemon) {
            savePokemon(pokemon_id)
        }
    }, [savePokemon])

    const getPokemonIdToDelete = useCallback((pokemon_id: number) => {
        if (deletePokemon) {
            deletePokemon(pokemon_id)
        }
    }, [deletePokemon])

    return (
        <GridContainer>
            {
                pokemons.map((pokemon, index) => {
                    return <Card 
                    key={index}
                    pokemon_id={pokemon.pokemon_id} 
                    name={pokemon.name} 
                    image={pokemon.image}
                    type={pokemon.type.name}
                    attack={pokemon.attack}
                    evolutions={pokemon.evolutions}
                    getPokemonIdToSave={getPokemonIdToSave}
                    getPokemonIdToDelete={getPokemonIdToDelete}
                    myPokedex={myPokedex}
                    />
                })
            }
        </GridContainer>
    );
}