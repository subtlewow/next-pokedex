export type SpriteJSON = {
    front_default?: string;
}

export type PokemonType = {
    id: number;
    type: {
        name: string;
    };
}

export type PokemonSprites = {
    sprites: SpriteJSON;
}

export type Pokemon = {
    id: number
    name: string
    pokemonsprites: PokemonSprites[]
    pokemontypes: PokemonType[]
}

export type PokemonData = {
    pokemon: Pokemon[];
}


interface PokemonSpriteType {
    pokemon: Pokemon
    size?: number
    query?: keyof SpriteJSON
}

export type { PokemonSpriteType }