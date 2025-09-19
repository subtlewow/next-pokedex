"use client"

import { MainSidebar } from "@/components/MainSidebar";
import PokemonIdentity from "@/features/pokemon/components/PokemonIdentity";
import { useState } from "react";

export default function Main() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [pokemonType, setPokemonType] = useState<string | null>(null);

  console.log('Selected Pokemon:', selectedPokemon)
  console.log('Selected Type:', pokemonType)

  return (
    <div className="flex">
      <MainSidebar
        selectedPokemon={selectedPokemon}
        onPokemonSelect={setSelectedPokemon}
        onTypeSelect={setPokemonType}
      />

      <div className={`bg-${pokemonType} min-h-screen min-w-screen`}>
        <PokemonIdentity
          selectedPokemon={selectedPokemon}
          selectedType={pokemonType}
        />
      </div>
    </div>

  );
}
