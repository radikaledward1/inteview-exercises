import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, Unique } from "typeorm";
import { Type } from "./Type";
import { Evolution } from "./Evolution";

@Entity({name: 'pokemons'})
@Unique(['pokemon_id'])
export class Pokemon extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    pokemon_id: number
    @Column()
    name: string
    @Column()
    image: string
    @Column()
    attack: string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => Type, type => type.pokemons) 
    @JoinColumn({ name: 'type_id', referencedColumnName: 'type_id' })
    type: Type;

    @OneToMany(() => Evolution, evolution => evolution.pokemon)
    evolutions: Evolution[];
}