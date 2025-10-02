"use client"

import { useQuery } from "@apollo/client/react";
import { GET_POKEMON } from "../graphql/queries";
import { PokemonData } from "../types";
import { motion } from 'framer-motion'
import Image from "next/image";
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"
import ThemeToggle from "@/features/pokemon/components/ThemeToggle";
import {SidebarTrigger} from "@/components/ui/sidebar"

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
        <div className="flex flex-col h-full min-h-0 overflow-hidden">
            <div className="p-6 flex-shrink-0 flex-none">
                <div className="flex-1 min-h-0 p-3 sm:p-4 overflow-y-auto items-baseline justify-between sm:justify-start sm:gap-6">
                    <h2 className="text-2xl font-bold text-white">
                        {selectedPokemonData.name.toUpperCase()}
                    </h2>
                    <span className="text-white flex items-center">#{pokedexID}</span>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <SidebarTrigger />
                    </div>
                </div>
                <div className="flex justify-center">
                    <Image
                        src={selectedPokemonSprite}
                        width={150}
                        height={120}
                        alt={`${selectedPokemonData.name.toUpperCase()}-sprite`}
                        unoptimized
                        className="drop-shadow-lg block"
                    />
                </div>
            </div>


            <div className="flex-1 min-h-0 p-3 sm:p-4 text-black overflow-y-auto">
                <div className={`bg-zinc-800 h-full p-4 sm:p-6 lg:p-8 rounded-2xl`}>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className={`text-${selectedType} text-2xl font-lora`}>About</h1>

                        <div className="flex flex-wrap gap-3">
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
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed py-4">{selectedInfo}</p>
                    )}

                    <div className="space-y-3 sm:space-y-4">
                        {selectedStat.map(stat => {
                             const normalizedValue = Math.min((stat.base_stat / 255) * 100, 100);

                             return (
                                <div key={stat.stat.name} className="flex text-right sm:flex-row sm:items-center">
                                    <h1 key={stat.stat.name} className="text-white text-2xl w-24 mx-4">{mapping[stat.stat.name.toUpperCase()] || stat.stat.name.toUpperCase()}</h1>
                                    <span className="text-white pr-4">{stat.base_stat}</span>
                                    <Progress
                                        value={normalizedValue}
                                        indicatorClassName={`bg-${selectedType}` || 'bg-gray-500'}
                                        className="mt-1 sm:mt-0 bg-gray-200/30 w-full max-w-full sm:max-w-[28rem]"
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