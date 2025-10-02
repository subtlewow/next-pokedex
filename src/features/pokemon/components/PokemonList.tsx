import type { Pokemon } from '@/features/pokemon/types'
import PokemonListItem from './PokemonListItem';

interface PokemonListProps {
    selectedPokemon: string | null;
    onPokemonSelect: (pokemonName: string) => void;
    onTypeSelect: (pokemonType: string) => void;
    pokemons: Pokemon[]
}

export default function PokemonList({ selectedPokemon, onPokemonSelect, onTypeSelect, pokemons }: PokemonListProps) {
    const handlePokemonClick = (pokemon: Pokemon) => {
        if (pokemon) {
            onPokemonSelect(pokemon.name)

            if (pokemon.pokemontypes && pokemon.pokemontypes.length > 0) {
                onTypeSelect(pokemon.pokemontypes[0].type.name);
            }
        }
    };

    return (
        <>
            <ul>
                {pokemons && pokemons.length > 0 && pokemons.map(pokemon => (
                    <PokemonListItem
                        key={pokemon.id}
                        pokemon={pokemon}
                        size={64}
                        isSelected={selectedPokemon === pokemon.name}
                        onClick={() => handlePokemonClick(pokemon)}
                    />
                ))}
            </ul>
        </>
    )
}