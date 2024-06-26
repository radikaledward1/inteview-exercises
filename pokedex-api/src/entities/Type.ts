import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, Unique } from "typeorm";
import { Pokemon } from "./Pokemon";

@Entity({name: 'pokemon_types'})
@Unique(['type_id'])
export class Type extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    type_id: number
    @Column()
    name: string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Pokemon, pokemon => pokemon.type)
    pokemons: Pokemon[];
}