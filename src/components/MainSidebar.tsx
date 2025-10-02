import { useState, useMemo } from "react";
import { AArrowDown, AArrowUp, ArrowUp, ArrowDown, X } from 'lucide-react';

// UI Components
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// import { motion } from 'framer-motion';
import { usePokemonData } from "@/hooks/usePokemonData";
import SearchBar from "@/features/pokemon/components/SearchBar";
import PokemonList from "@/features/pokemon/components/PokemonList";
import FilterButton from '@/features/pokemon/components/FilterButton'
import ThemeToggle from "@/features/pokemon/components/ThemeToggle";
import SortComponent from "@/features/pokemon/components/SortByType_DropdownMenu"
import { useTheme } from "next-themes";

interface AppSidebarProps {
  selectedPokemon: string | null;
  onPokemonSelect: (pokemonName: string) => void;
  onTypeSelect: (pokemonType: string) => void;
}

export function MainSidebar({ selectedPokemon, onPokemonSelect, onTypeSelect }: AppSidebarProps) {
  const { loading, error, pokemon,  } = usePokemonData({ queryType: 'GET_POKEMON' });
  const [searchTerm, setSearchTerm] = useState("")
  const [nameSortActive, setNameSortActive] = useState(false);
  const [idSortActive, setIdSortActive] = useState(true);
  const [currActive, setCurrActive] = useState("ID");
  const [sortType, setSortType] = useState<'id' | 'name'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const theme = useTheme().theme;

  const filteredPokemon = useMemo(() => {
    if (!pokemon) return []

    let list = [...pokemon]

    // Filter by type first
    if (selectedType) {
      list = list.filter(p => p.pokemontypes.some(pokemonType => pokemonType.type.name === selectedType))
    }

    // Filter by search
    if (searchTerm.trim()) {
      list = list.filter(p => (
        p.name.toLowerCase().replace(/[^a-z0-9]/g, "").includes(searchTerm.toLowerCase()) ||
        String(p.id).padStart(4, '0').includes(searchTerm.toLowerCase())
      ))
    }

    // Sort by name / id
    list.sort((a,b) => {
      if (sortType === 'name') {
        const comparison = a.name.localeCompare(b.name)
        return sortDirection === 'asc' ? comparison : -comparison
      } else {
        const comparison = a.id - b.id
        return sortDirection === 'asc' ? comparison : -comparison
      }
    })

    return list

  }, [searchTerm, pokemon, sortType, sortDirection, selectedType])

  const handleSort = (type: 'name' | 'id') => {
    const isActive = currActive === (type === 'name' ? 'Name' : "ID")
    const direction = !isActive ? 'asc' : (type === 'name' ? (nameSortActive ? 'desc' : 'asc') : (idSortActive ? 'desc' : 'asc'))

    setCurrActive(type === 'name' ? "Name" : "ID")
    setSortType(type)
    setSortDirection(direction)

    if (type === 'name') {
      setNameSortActive(direction === 'asc')
      setIdSortActive(false)
    } else {
      setIdSortActive(direction === 'asc')
      setNameSortActive(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Sidebar className="h-full">
      <SidebarContent className="h-full flex flex-col">
        <SidebarGroup className="flex-shrink-0">
          <div className="sticky top-0 pt-2 z-10 bg-sidebar">
            <div className="flex items-center justify-between">
              <SidebarGroupLabel className="text-sm">
                Pokedex
              </SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <SidebarTrigger />
              </div>
            </div>

            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm} />

            <div className="flex flex-wrap py-4 px-1 items-center gap-2">
                Sort by:

                <FilterButton
                  onClick={() => {
                    handleSort('name')
                  }}
                  icon={nameSortActive ? AArrowUp : AArrowDown }
                  label="Name"
                  active={currActive === "Name"}
                />

                <FilterButton
                  onClick={() => {
                    handleSort('id')
                  }}
                  icon={idSortActive ? ArrowUp : ArrowDown }
                  label="ID"
                  active={currActive === 'ID'}
                />

                <SortComponent
                  sortButtonName="Type"
                  typeSelected={selectedType}
                  onTypeSelect={setSelectedType}
                />

                {/* Conditional rendering based on selected type */}
                <div className="flex pl-16">
                  {selectedType && (
                    <div className="flex flex-1 items-center gap-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800 ml-2">
                      <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                        Filtered by: {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                      </span>
                      <button
                        onClick={() => setSelectedType(null)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  {/* repeating code here; refactor later */}
                  {
                    ((!idSortActive || currActive !== 'ID') &&
                      <button
                        className={`flex items-center hover:underline hover:cursor-pointer text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} pl-4`}
                        onClick={() => {
                          handleSort('id')
                        }}>
                          <X className="w-4 h-4 pr-1"/> Reset
                      </button>
                    )
                  }
                </div>
            </div>

          </div>
        </SidebarGroup>
        <SidebarGroup className="flex-1 overflow-hidden">
          <SidebarGroupContent className="h-full overflow-y-auto">

            <SidebarMenu className='w-full'>
              <PokemonList
                selectedPokemon={selectedPokemon}
                onPokemonSelect={onPokemonSelect}
                onTypeSelect={onTypeSelect}
                pokemons={filteredPokemon}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}