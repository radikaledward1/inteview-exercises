import React, { useState, useEffect } from 'react';
import { TopHeader, Container } from './styles';
import Grid from './grid';
import { Type, Pokemon, Evolution } from '../utils/types';

//TODO: Add --Select-- option to the select menu

interface TypesSelectProps {
    types: Type[];
    getPokemonsByType: (url: string) => void;   
}

export default function Pokedex(){
    const [types, setTypes] = useState<Type[]>([]);
    const [typeSelected, setTypeSelected] = useState<Type>({id: 0, name: '', url: ''});
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    //Options Menu Inline Component
    const Select = ({types, getPokemonsByType}: TypesSelectProps) => {

        const menu = {
            display: 'flex',
            marginTop: '10px',
            marginBottom: '10px',
            selector: {
                marginRight: '10px',
            },
        }

        const setPokemonType = (e: React.ChangeEvent<HTMLSelectElement>) => {
            let typeUrl = e.target.value;
            getPokemonsByType(typeUrl);
        }

        return (
            <div style={menu}>
                <select value={typeSelected.url} onChange={(e) => {setPokemonType(e)}} style={menu.selector}>
                    {
                        types.map((type, index) => {
                            return <option key={index} value={type.url}>{type.name}</option>
                        })
                    }
                </select>
            </div>
        )
    }

    const getPokemonsByType = async (url: string) => {
        try {
            const response = await fetch(url);
            const pokemonsByType = await response.json();

            const typeSelected: Type = {id: pokemonsByType.id, name: pokemonsByType.name, url: url};
            setTypeSelected(typeSelected);

            const pokemonsWithDetails: Pokemon[] = [];

            for (let i = 0; i < 12; i++) {

                const response = await fetch(pokemonsByType.pokemon[i].pokemon.url);
                const pokemonData = await response.json();

                const specie_response = await fetch(pokemonData.species.url);
                const specieData = await specie_response.json();

                const evo_chain_response = await fetch(specieData.evolution_chain.url);
                const evoChainData = await evo_chain_response.json();

                let evolutions: Evolution[] = [];

                const chain = evoChainData?.chain;
                if (chain) {
                    evolutions = getEvolutionsFromChain(chain);
                }

                const pokemonWithDetails: Pokemon = {
                    pokemon_id: pokemonData.id,
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                    type: typeSelected,
                    attack: pokemonData.moves[0].move.name,
                    evolutions: evolutions
                };

                pokemonsWithDetails.push(pokemonWithDetails);
            }

            setPokemons(pokemonsWithDetails);

        } catch (error) {
            console.log(error);
        }
    }

    const getEvolutionsFromChain = (chain: any) : Evolution[] => {

        const evolutions: Evolution[] = [];

        evolutions.push({id: getPokemonIdFromUrl(chain.species.url), name: chain.species.name})

        if (chain.evolves_to?.length > 0) {
            let evolves_to = chain.evolves_to[0];
            let name = evolves_to.species.name;
            let id = getPokemonIdFromUrl(evolves_to.species.url);
            evolutions.push({id: id, name: name});

            if (evolves_to.evolves_to?.length > 0) {
                let evolves_to_2 = evolves_to.evolves_to[0];
                let name_2 = evolves_to_2.species.name;
                let id_2 = getPokemonIdFromUrl(evolves_to_2.species.url);
                evolutions.push({id: id_2, name: name_2});
                
                if (evolves_to_2.evolves_to?.length > 0) {
                    let evolves_to_3 = evolves_to_2.evolves_to[0];
                    let name_3 = evolves_to_3.species.name;
                    let id_3 = getPokemonIdFromUrl(evolves_to_3.species.url);
                    evolutions.push({id: id_3, name: name_3});

                    if (evolves_to_3.evolves_to?.length > 0) {
                        let evolves_to_4 = evolves_to_3.evolves_to[0];
                        let name_4 = evolves_to_4.species.name;
                        let id_4 = getPokemonIdFromUrl(evolves_to_4.species.url);
                        evolutions.push({id: id_4, name: name_4});

                        if (evolves_to_4.evolves_to?.length > 0) {
                            let evolves_to_5 = evolves_to_4.evolves_to[0];
                            let name_5 = evolves_to_5.species.name;
                            let id_5 = getPokemonIdFromUrl(evolves_to_5.species.url);
                            evolutions.push({id: id_5, name: name_5});
                        }
                    }
                }
            }
        }

        return evolutions;
    }

    const getPokemonIdFromUrl = (url: string) : number => {
        const array = url.split("/");
        const id = array[6];
        return parseInt(id);
    }

    const savePokemon = async (pokemon_id: number) => {
        const pokemon = pokemons.find((pokemon) => pokemon.pokemon_id === pokemon_id);
        
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pokemon)
            };

            const response = await fetch("http://localhost:3001/pokedex/pokemons/save", requestOptions);
            const data = await response.json();

            if (data.status === 200)
            {
                console.log(data.message);
            } else {
                console.log(data.message);
            }

        } catch (error) {
            console.log(error);
        }
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
            <TopHeader>
                <Container>
                    <label>Select the Pokemon Type</label>
                    <Select types={types} getPokemonsByType={getPokemonsByType}/>
                    {/* <button onClick={() => {checkCurrentPokemons()}}>Console</button> */}
                </Container>
            </TopHeader>
            <Grid pokemons={pokemons} savePokemon={savePokemon} myPokedex={false}/>
        </>
    )
}