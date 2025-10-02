"use client"

import { useQuery } from "@apollo/client/react";
import { GET_POKEMON } from "../graphql/queries";
import { PokemonData } from "../types";
import { motion } from 'framer-motion'
import Image from "next/image";
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"

interface PokemonContentProps {
    selectedPokemon: string | null;
    selectedType: string | null;
}

export default function PokemonContent({ selectedPokemon, selectedType }: PokemonContentProps) {
    const {loading, error, data} = useQuery<PokemonData>(GET_POKEMON)
    const { theme } = useTheme()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const selectedPokemonData = data?.pokemon.find(p => p.name === selectedPokemon);

    if (!selectedPokemonData) {
        return <div className="p-4 text-gray-500">Select a Pokemon to see its types</div>
    }

    const selectedPokemonSprite = selectedPokemonData.pokemonsprites[0].sprites.other.home.front_default
    const selectedStat = selectedPokemonData?.pokemonstats || []
    const pokedexID = selectedPokemonData ? selectedPokemonData.id.toString().padStart(4, '0') : '0001'
    const selectedInfo = selectedPokemonData?.specs?.about?.[0]?.info || ""

    const mapping: Record<string, string> = {
        "HP": "HP",
        "ATTACK": "ATK",
        "DEFENSE": "DEF",
        "SPECIAL-ATTACK": "SATK",
        "SPECIAL-DEFENSE": "SDEF",
        "SPEED": "SPD"
    }

    return (
        <div className="flex flex-col gap-5 w-full h-screen max-h-screen">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:gap-16 p-6 mr-5">
                <div className="flex justify-between p-6 gap-6">
                    <h2 className="text-2xl font-bold text-white">
                        {selectedPokemonData.name.toUpperCase()}
                    </h2>
                    <span className="text-white flex items-center">#{pokedexID}</span>
                </div>
                <div className="flex items-center my-6 justify-center">
                    <Image
                        src={selectedPokemonSprite}
                        width={150}
                        height={120}
                        alt={`${selectedPokemonData.name.toUpperCase()}-sprite`}
                        unoptimized
                        className="drop-shadow-lg"
                        onLoadingComplete={(img) => {
                            console.log('natural size:', img.width, '×', img.height);

                        }}
                    />
                </div>
            </div>


            <div className="flex-1 p-2 text-black">
                <div className={`bg-zinc-800 h-full p-7.5 pl-10 rounded-2xl`}>
                    <div className="flex justify-between">
                        <h1 className={`text-${selectedType} text-2xl font-lora`}>About</h1>

                        <div className="flex gap-3">
                            {selectedPokemonData.pokemontypes.map((type, index) => (
                                <motion.div
                                    className={`px-4 py-2 rounded-full font-medium bg-${type.type.name} text-white cursor-pointer shadow-md hover:shadow-lg transition-shadow`}
                                    key={`${selectedPokemonData.id}-${index}`}
                                    whileHover={{
                                        transition: {
                                            duration: 0.1
                                        },
                                        scale: 1.1
                                    }}
                                    whileTap={{ scale: 1 }}
                                >
                                    {type.type.name.toUpperCase()}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    {selectedInfo && (
                        <p className="text-gray-300 text-sm leading-relaxed py-4">{selectedInfo}</p>
                    )}

                    <div className="space-y-4 ml-auto">
                         {selectedStat.map(stat => {
                             const normalizedValue = Math.min((stat.base_stat / 255) * 100, 100);

                             return (
                                <div key={stat.stat.name} className="flex text-right">
                                    <h1 key={stat.stat.name} className="text-white text-2xl w-24 mx-4">{mapping[stat.stat.name.toUpperCase()] || stat.stat.name.toUpperCase()}</h1>
                                    <span className="text-white pr-4">{stat.base_stat}</span>
                                    <Progress
                                        value={normalizedValue}
                                        indicatorClassName={`bg-${selectedType}` || 'bg-gray-500'}
                                        className="mt-2 bg-gray-200 mr-12 w-96"
                                    />
                                </div>
                             )
                         })}

                     </div>
                </div>
            </div>
        </div>
    )
}