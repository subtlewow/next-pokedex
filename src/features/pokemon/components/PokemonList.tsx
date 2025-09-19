'use client';

import { useQuery } from "@apollo/client/react";
import type { Pokemon, PokemonData } from '@/features/pokemon/types'
import PokemonListItem from './PokemonListItem';
import { GET_POKEMON } from '../graphql/queries';
import { useState } from "react";

interface PokemonListProps {
    selectedPokemon: string | null;
    onPokemonSelect: (pokemonName: string) => void;
    onTypeSelect: (pokemonType: string) => void;
}

export default function PokemonList({ selectedPokemon, onPokemonSelect, onTypeSelect }: PokemonListProps) {
    const {loading, error, data} = useQuery<PokemonData>(GET_POKEMON)
    const [searchPokemon, setSearchPokemon] = useState("")

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const handlePokemonClick = (pokemon: Pokemon) => {
        if (pokemon.name) onPokemonSelect(pokemon.name);
        if (pokemon.pokemontypes && pokemon.pokemontypes.length > 0) {
            onTypeSelect(pokemon.pokemontypes[0].type.name);
        }
    };

    const filteredPokemon = data?.pokemon.filter(p => p.name.toLowerCase().includes(searchPokemon.toLowerCase())) || [];

    return (
        <>
            <input
                type="text"
                placeholder="Search"
                value={searchPokemon}
                onChange={(e) => setSearchPokemon(e.target.value)}
                className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            <ul>
                {filteredPokemon.map(pokemon => (
                    <PokemonListItem
                        key={pokemon.id}
                        pokemon={pokemon}
                        size={64}
                        isSelected={selectedPokemon === pokemon.name}
                        onClick={() => handlePokemonClick(pokemon)}
                    />
                ))}
            </ul>
        </>
    )
}