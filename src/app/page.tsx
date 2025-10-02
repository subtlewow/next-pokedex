"use client"

import { MainSidebar } from "@/components/MainSidebar";
import PokemonContent from "@/features/pokemon/components/PokemonContent";
import { useState } from "react";

export default function Main() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [pokemonType, setPokemonType] = useState<string | null>(null);

  console.log('Selected Pokemon:', selectedPokemon)
  console.log('Selected Type:', pokemonType)

  return (
    <div className="flex min-h-screen w-full">
      <MainSidebar
        selectedPokemon={selectedPokemon}
        onPokemonSelect={setSelectedPokemon}
        onTypeSelect={setPokemonType}
      />

      <div className={`bg-${pokemonType || 'gray-100'} flex-1 min-h-screen w-full`}>
        <PokemonContent
          selectedPokemon={selectedPokemon}
          selectedType={pokemonType}
        />
      </div>
    </div>
  );
}
