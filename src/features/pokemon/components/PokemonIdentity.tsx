"use client"

import { useQuery } from "@apollo/client/react";
import { GET_POKEMON } from "../graphql/queries";
import { PokemonData } from "../types";
import Image from "next/image";

interface PokemonIdentityProps {
    selectedPokemon: string | null;
    selectedType: string | null;
}

export default function PokemonIdentity({ selectedPokemon }: PokemonIdentityProps) {
    const {loading, error, data} = useQuery<PokemonData>(GET_POKEMON)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const selectedPokemonData = data?.pokemon.find(p => p.name === selectedPokemon);
    const selectedPokemonSprite = selectedPokemonData ? selectedPokemonData.pokemonsprites[0].sprites.other.showdown.front_default : ''

    if (!selectedPokemon) {
        return <div className="p-4 text-gray-500">Select a Pokemon to see its types</div>
    }

    if (!selectedPokemonData) {
        return <div className="p-4 text-red-500">Pokemon not found</div>
    }

    console.log(selectedPokemonSprite)


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{selectedPokemonData.name.toUpperCase()}</h2>
            <div className="flex gap-2 flex-wrap">
                {selectedPokemonData.pokemontypes.map((type, index) => (
                    <div
                        className={`px-3 py-1 rounded font-medium bg-${type.type.name} text-white`}
                        key={`${selectedPokemonData.id}-${index}`}
                    >
                        {type.type.name}
                    </div>
                ))}
            </div>
            <Image
                src={selectedPokemonSprite}
                width={150}
                height={150}
                alt={`${selectedPokemonData.name.toUpperCase()}-animate`}
            />
        </div>
    )
}