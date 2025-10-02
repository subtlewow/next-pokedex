import { usePokemonData } from './usePokemonData';

export function usePokemonTypes() {
    const { pokemon } = usePokemonData({ queryType: 'GET_POKEMON' });

    // Get all unique Pokemon types
    const allTypes = Array.from(new Set(
        pokemon.flatMap(p => p.pokemontypes.map(t => t.type.name))
    )).sort();

    return allTypes;
}
