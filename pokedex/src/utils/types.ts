export interface Type {
    id?: number;
    type_id?: number;
    name: string;
    url?: string;
}

export interface Evolution {
    id: number;
    name: string;
}

export interface Pokemon {
    pokemon_id: number;
    name: string;
    image: string;
    type: Type;
    attack: string;
    evolutions: Evolution[];
}