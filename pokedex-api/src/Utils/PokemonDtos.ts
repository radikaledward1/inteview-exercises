
export interface EvolutionDto {
    id: number;
    name: string;
}

export interface TypeDto {
    id: number;
    name: string;
}

export interface PokemonResponseDto {
    pokemon_id: number;
    name: string;
    image: string;
    type: TypeDto;
    attack: string;
    evolutions: EvolutionDto[];
}