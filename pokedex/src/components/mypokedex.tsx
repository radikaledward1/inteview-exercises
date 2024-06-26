import React, { useEffect, useState } from 'react';
import {TopHeader, Container} from './styles';
import Grid from './grid';
import { Pokemon, Type } from '../utils/types';

//TODO: Add --Select-- option to the select menu

interface SelectorProps {
    types: Type[];
    getPokemonsByType: (type_id: number) => void;
}

export default function MyPokedex() {
    const [types, setTypes] = useState<Type[]>([])
    const [typeSelected, setTypeSelected] = useState<number>(0)
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [pokemonsByType, setPokemonsByType] = useState<Pokemon[]>([])

    const Select = ({types, getPokemonsByType}: SelectorProps) => {

        const select = {
            margin: '10px 0px 10px 0px',
        }

        const setPokemonType = (e: React.ChangeEvent<HTMLSelectElement>) => {
            let type_id = parseInt(e.target.value)
            getPokemonsByType(type_id)
        }

        return (
            <div style={select}>
                <select value={typeSelected} onChange={(e) => {setPokemonType(e)}}>
                    <option value={0}>--All--</option>
                    {
                        types.map((type) => {
                            return <option key={type.type_id} value={type.type_id}>{type.name}</option>
                        })
                    }
                </select>
            </div>
        )
    }

    async function deletePokemon(pokemon_id: number) {
        try {
            const response = await fetch(`http://localhost:3001/pokedex/pokemons/delete/${pokemon_id}`, {method: 'DELETE'});
            if (response.status === 204) {
                const _pokemons = pokemons.filter(pokemon => pokemon.pokemon_id !== pokemon_id);
                setPokemons(_pokemons);
                setPokemonsByType(_pokemons);
            } else {
                console.log("Error deleting pokemon");
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    async function getPokemons() {
        try {
            const response = await fetch("http://localhost:3001/pokedex/pokemons")
            const pokemons = await response.json()

            setPokemons(pokemons)
            setPokemonsByType(pokemons)

        } catch (error: any) {
            console.log(error);
        }
    }

    async function getPokemonTypes() {
        try {
            const response = await fetch("http://localhost:3001/pokedex/pokemons/types")
            const types = await response.json()
            if (types) {
                setTypes(types)
                getPokemons()
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    const getPokemonsByType = (type_id: number) => {

        if (type_id !== 0) {
            const pokemonsByType: Pokemon[] = pokemons.filter((pokemon: Pokemon) => {
                return pokemon.type.id === type_id
            })
            setPokemonsByType(pokemonsByType)
        } else {
            setPokemonsByType(pokemons)
        }

        setTypeSelected(type_id)
    }

    useEffect(() => {
        getPokemonTypes()
    }, [])

    return (
        <>
            <TopHeader>
                <Container>
                    <label>Filter your Pokemons by Type</label>
                    <Select types={types} getPokemonsByType={getPokemonsByType}/>
                </Container>
            </TopHeader>
            <Grid pokemons={pokemonsByType} deletePokemon={deletePokemon} myPokedex={true}/>
        </>
    )
}