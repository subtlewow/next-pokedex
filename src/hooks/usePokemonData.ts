'use client';

import { useQuery } from "@apollo/client/react";
import type { Pokemon, PokemonData } from '@/features/pokemon/types'
import { GET_POKEMON, GET_TYPES, GET_EVOLUTIONS } from '@/features/pokemon/graphql/queries';

const query_types = {
    'GET_POKEMON': GET_POKEMON,
    'GET_TYPES': GET_TYPES,
    'GET_EVOLUTIONS': GET_EVOLUTIONS
}

export function usePokemonData({ queryType }: { queryType: string }) {
    const { loading, error, data } = useQuery<PokemonData>(query_types[queryType]);

    return {
        loading,
        error,
        pokemon: data?.pokemon || [],
        pokemonData: data
    };
}
