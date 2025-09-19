import PokemonSprite from './PokemonSprite';
import Link from 'next/link';
import { PokemonSpriteType } from '../types';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface PokemonListItemProps extends PokemonSpriteType {
    isSelected?: boolean;
    onClick?: () => void;
}

export default function PokemonListItem(props: PokemonListItemProps) {
    const { pokemon, isSelected, onClick, ...spriteProps } = props;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                className={`h-24 px-4 ${isSelected ? 'bg-sidebar-accent' : ''}`}
                asChild
            >
                <Link href={`/`} onClick={onClick}>
                    <div className="flex items-center gap-2">
                        <PokemonSprite pokemon={pokemon} {...spriteProps} />
                        <span>{(pokemon.name).toUpperCase()}</span>
                    </div>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

