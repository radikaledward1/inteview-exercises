import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { Evolution } from '../utils/types';
import { get } from 'http';

const CardContainer = styled.div `
    width: 150px;
    margin: 15px 15px;
    background: lightyellow;
    border: solid 1px black;
    border-radius: 5px;
`;

const Header = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Body = styled.div `
    margin-top: 10px;
    font-size: 10px;
    height: 85px;
`;

const Footer = styled.div `
    display: flex;
    justify-content: center;
    margin-top: 5px;
`;

const Row = styled.div `
    display: flex;
    margin-bottom: 5px;
    margin-left: 10px;
    width: 100%;
`;

const RowColumn = styled.div `
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    margin-left: 10px;
    width: 100%;
`;

const Title = styled.label `
    font-size: 15px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Image = styled.img `
    width: 100px;
    height: 100px;
`;

const Button = styled.button `
    margin-bottom: 10px;
`;

const Label = styled.span `
    font-weight: bold;
`;

const Span = styled.span `
    margin-left: 5px;
`;

interface CardProps {
    pokemon_id: number;
    name: string;
    image: string;
    type: string;
    attack: string;
    evolutions: Evolution[];
    getPokemonIdToSave?: (pokemon_id: number) => void;
    getPokemonIdToDelete?: (pokemon_id: number) => void;
    myPokedex: Boolean;
}

export default function Card(
    {pokemon_id,
    name,
    image, 
    type, 
    attack, 
    evolutions, 
    getPokemonIdToSave,
    getPokemonIdToDelete,
    myPokedex}: CardProps) {

    const pokemonIdToSave = useCallback(() => {
        if (getPokemonIdToSave) {
            getPokemonIdToSave(pokemon_id)
        }
    }, [pokemon_id, getPokemonIdToSave])

    const pokemonIdToDelete = useCallback(() => {
        if (getPokemonIdToDelete) {
            getPokemonIdToDelete(pokemon_id)
        }
    }, [pokemon_id, getPokemonIdToDelete])

    return (
        <CardContainer>
            <Header>
                <Title>{name}</Title>
                <Image src={image} />
            </Header>
            <Body>
                <Row>
                    <Label>Type:</Label>
                    <Span>{type}</Span>
                </Row>
                <Row>
                    <Label>Attack:</Label>
                    <Span>{attack}</Span>
                </Row>
                <RowColumn>
                    <Label>Evolutions:</Label>
                    {
                        evolutions.map((evolution, index) => {
                            return <Span key={index}>{evolution.name}</Span>
                        })
                    }
                </RowColumn>
            </Body>
            <Footer>
                {
                    (myPokedex) ? <Button onClick={pokemonIdToDelete}>Remove</Button> 
                    : <Button onClick={pokemonIdToSave}>Catch</Button>
                }
            </Footer>
        </CardContainer>
    );
}