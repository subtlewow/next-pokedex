import Image from "next/image";
import { PokemonSpriteType } from "@/features/pokemon/types"

export default function PokemonSprite({ pokemon, size = 64 }: PokemonSpriteType) {
    const spriteUrl = pokemon?.pokemonsprites?.[0]?.sprites?.front_default

    return (
        <>
            {spriteUrl && (
                <Image
                    src={spriteUrl}
                    className="max-h-full object-contain text-center pr-6"
                    alt={pokemon.name}
                    width={size}
                    height={size}
                />
            )}
        </>
    );
}