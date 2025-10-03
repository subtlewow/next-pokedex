"use client"

import { MainSidebar } from "@/components/MainSidebar";
import PokemonContent from "@/features/pokemon/components/PokemonContent";
import { useState } from "react";

export default function Main() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [pokemonType, setPokemonType] = useState<string | null>(null);

  return (
    <main className="h-dvh min-w-screen md:h-screen  min-h-0 flex overflow-hidden">

      <div className="flex h-full w-full min-h-0">
        <MainSidebar
          selectedPokemon={selectedPokemon}
          onPokemonSelect={setSelectedPokemon}
          onTypeSelect={setPokemonType}
        />

        <div className={`bg-${pokemonType || 'gray-100'} w-full h-full flex-1 min-h-0`}>
          <PokemonContent
            selectedPokemon={selectedPokemon}
            selectedType={pokemonType}
          />
        </div>
      </div>
    </main>
  );
}
