import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { Pokemon } from "./Pokemon";

@Entity({name: 'pokemon_evolutions'})
export class Evolution extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    envolves_id: number
    @Column()
    name: string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    
    @ManyToOne(() => Pokemon, pokemon => pokemon.evolutions)
    @JoinColumn({name: 'pokemon_id', referencedColumnName: 'pokemon_id'})
    pokemon: Pokemon;
}