import Image from "next/image";
import { PokemonSpriteType } from "@/features/pokemon/types"

const SPRITE_SIZE = 64

export default function PokemonSprite({ pokemon }: PokemonSpriteType) {
    const spriteUrl = pokemon?.pokemonsprites?.[0]?.sprites?.front_default

    return (
        <>
            {spriteUrl && (
                <Image
                    src={spriteUrl}
                    className="object-contain pr-6"
                    alt={pokemon.name}
                    width={SPRITE_SIZE}
                    style={{ imageRendering: "pixelated" }}
                    height={SPRITE_SIZE}
                />
            )}
        </>
    );
}