"use client"

import { useQuery } from "@apollo/client/react";
import { GET_POKEMON } from "../graphql/queries";
import { PokemonData } from "../types";
import Image from "next/image";

interface PokemonIdentityProps {
    selectedPokemon: string | null;
    selectedType: string | null;
}

export default function PokemonIdentity({ selectedPokemon, selectedType }: PokemonIdentityProps) {
    const {loading, error, data} = useQuery<PokemonData>(GET_POKEMON)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const selectedPokemonData = data?.pokemon.find(p => p.name === selectedPokemon);
    const selectedPokemonSprite = selectedPokemonData ? selectedPokemonData.pokemonsprites[0].sprites.other.showdown.front_default : ''
    const pokedexID = selectedPokemonData ? selectedPokemonData.id.toString().padStart(4, '0') : '0001'

    console.log(selectedType)

    if (!selectedPokemon) {
        return <div className="p-4 text-gray-500">Select a Pokemon to see its types</div>
    }

    if (!selectedPokemonData) {
        return <div className="p-4 text-red-500">Pokemon not found</div>
    }


    return (
        <div className="flex flex-col gap-5 w-full h-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:gap-16 p-6">
                <div className="flex justify-between p-6 gap-6">
                    <h2 className="text-2xl font-bold">
                        {selectedPokemonData.name.toUpperCase()}
                    </h2>
                    <span className="text-black flex items-center">#{pokedexID}</span>
                </div>
                <div className="flex items-center justify-center py-6">
                    <Image
                        src={selectedPokemonSprite}
                        width={120}
                        height={120}
                        alt={`${selectedPokemonData.name.toUpperCase()}-sprite`}
                        unoptimized
                        className="drop-shadow-lg"
                    />
                </div>
            </div>

            <div className="h-full p-2">
                <div className="bg-white h-full p-5 rounded-2xl">
                    <div className="flex gap-3 m-2.5 justify-end">
                        {selectedPokemonData.pokemontypes.map((type, index) => (
                            <div
                                className={`px-4 py-2 rounded-full font-medium bg-${type.type.name} text-white shadow-lg`}
                                key={`${selectedPokemonData.id}-${index}`}
                            >
                                {type.type.name.toUpperCase()}
                            </div>
                        ))}
                    </div>
                    {/* <h1 className={}>About</h1> */}
                </div>
            </div>
        </div>
    )
}