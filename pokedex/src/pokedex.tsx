import React, { useState, useEffect } from 'react';
import './pokedex.css';

interface Type {
    name: string;
    url: string;
}

export default function Pokedex(){
    const [types, setTypes] = useState<Type[]>([]);

    //Tyoes Sekect Component
    const TypesSelector = ({types}: {types: Type[]}) => {
        return (
            <select>
                {
                    types.map((type, index) => {
                        return <option key={index} value={type.name}>{type.name}</option>
                    })
                }
            </select>
        )
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
                    <TypesSelector types={types} />
                </div>
            </div>
        </>
    )
}