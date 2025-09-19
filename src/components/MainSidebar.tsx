import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import PokemonList from "@/features/pokemon/components/PokemonList"

interface AppSidebarProps {
  selectedPokemon: string | null;
  onPokemonSelect: (pokemonName: string) => void;
  onTypeSelect: (pokemonType: string) => void;
}

export function MainSidebar({ selectedPokemon, onPokemonSelect, onTypeSelect }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-between">
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarTrigger />
          </div>
            <SidebarGroupContent>
              <SidebarMenu>
                  <PokemonList
                    selectedPokemon={selectedPokemon}
                    onPokemonSelect={onPokemonSelect}
                    onTypeSelect={onTypeSelect}
                  />
              </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}