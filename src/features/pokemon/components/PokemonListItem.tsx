import PokemonSprite from './PokemonSprite';
import Link from 'next/link';
import { PokemonSpriteType } from '../types';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface PokemonListItemProps extends PokemonSpriteType {
    isSelected?: boolean;
    onClick?: () => void;
}

export default function PokemonListItem(props: PokemonListItemProps) {
    const { pokemon, isSelected, onClick } = props;

    return (
        <SidebarMenuItem className='hover:bg-gray-100 w-full rounded-xl'>
            <SidebarMenuButton
                className={`h-24 px-4 ${isSelected ? 'bg-sidebar-accent' : ''}`}
                asChild
            >
                <Link href={`/`} onClick={onClick}>
                    <div className="flex items-center gap-2">
                        <PokemonSprite pokemon={pokemon} />
                        <div className="flex-col">
                            <span>
                                {pokemon.name.toUpperCase()}
                            </span>
                            <span className="text-gray-500 text-xs opacity-75 pl-3 font-mono">
                                #{pokemon.id.toString().padStart(4, '0')}
                            </span>

                            <div className="flex my-2">
                                {pokemon.pokemontypes.map(typeObj => (
                                    <div key={typeObj.type.name} className={`px-3 py-1 mr-1.5 rounded-full text-xs bg-${typeObj.type.name} text-white cursor-pointer shadow-md hover:shadow-lg transition-shadow `}>
                                        {typeObj.type.name.toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

