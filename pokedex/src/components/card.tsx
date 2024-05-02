import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const CardContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    margin: 15px 15px;
    background: lightyellow;
    border: solid 1px black;
    border-radius: 5px;
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
    margin-top: 10px;
    margin-bottom: 10px;
`;

interface CardProps {
    name: string;
    image: string;
}

export default function Card({name, image}: CardProps) {

    useEffect(() => {}, [])

    return (
        <CardContainer>
            <Title>{name}</Title>
            <Image src={image} />
            <Button>Save</Button>
        </CardContainer>
    );
}