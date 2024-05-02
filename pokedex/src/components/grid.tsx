import React, {useState, useEffect} from 'react';
import Card from './card';
import styled from 'styled-components';

const GridContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`;

interface Pokemon {
    name: string;
    image: string;
}

interface GridProps {
    pokemons: Pokemon[];
};

export default function Grid({pokemons}: GridProps) {

    return (
        <GridContainer>
            {
                pokemons.map((pokemon, index) => {
                    return <Card key={index} name={pokemon.name} image={pokemon.image}/>
                })
            }
        </GridContainer>
    );
}