import React, { useState, useEffect } from 'react';
import './pokedex.css';

interface Type {
    name: string;
    url: string;
}

interface Pokemon {
    name: string;
    image: string;
}

interface PokemonProps {
    types: Type[];
    getPokemonsByType: (url: string) => void;   
}

export default function Pokedex(){
    const [types, setTypes] = useState<Type[]>([]);
    const [typeSelected, setTypeSelected] = useState<string>('');
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    //Types Select Inline Component
    const TypesSelector = ({types, getPokemonsByType}: PokemonProps) => {

        const setPokemonType = (e: React.ChangeEvent<HTMLSelectElement>) => {
            let valueType = e.target.value;
            setTypeSelected(valueType);

            getPokemonsByType(valueType);
            //console.log(valueType);
        }

        return (
            <select value={typeSelected} onChange={(e) => {setPokemonType(e)}}>
                {
                    types.map((type, index) => {
                        return <option key={index} value={type.url}>{type.name}</option>
                    })
                }
            </select>
        )
    }

    const getPokemonsByType = async (url: string) => {
        try {
            const response = await fetch(url);
            const pokemonsByType = await response.json();

            const newPokemons: Pokemon[] = [];
            
            // for (const pokemon of pokemonsByType.pokemon) {
            //     const response = await fetch(pokemon.pokemon.url);
            //     const pokemonData = await response.json();

            //     const newpokemon = {
            //         name: pokemonData.name,
            //         image: pokemonData.sprites.front_default
            //     };

            //     newPokemons.push(newpokemon);
            // }

            for (let i = 0; i < 12; i++) {
                const response = await fetch(pokemonsByType.pokemon[i].pokemon.url);
                const pokemonData = await response.json();

                const newpokemon = {
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default
                };

                newPokemons.push(newpokemon);
            }

            //setPokemons(prevPokemons => [...prevPokemons, ...newPokemons]);
            setPokemons(newPokemons);

        } catch (error) {
            console.log(error);
        }
    }

    const checkCurrentPokemons = () => {
        console.log(pokemons);
        console.log(pokemons.length);
    }

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/type')
        .then(response => response.json())
        .then(data => {
            setTypes(data.results);
        })
    }, [])

    return (
        <>
            <div className='top-header'>
                <div className='container'>
                    <h1>Pokedex</h1>
                    <label>Select the Pokemon Type</label>
                    <TypesSelector types={types} getPokemonsByType={getPokemonsByType}/>
                    <button onClick={() => {checkCurrentPokemons()}}>Console</button>
                </div>
            </div>
            <div className='pokedex-grid'>
                <div className='container'>
                    <div>Prueba</div>
                    <div>Prueba</div>
                </div>
            </div>
        </>
    )
}