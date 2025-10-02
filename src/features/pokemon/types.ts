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

export type PokemonStat = {
    base_stat: number
    stat: {
        name: string
    }
}

export type Pokemon = {
    id: number
    name: string
    pokemonsprites: PokemonSprites[]
    pokemontypes: PokemonType[]
    pokemonstats: PokemonStat[]
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