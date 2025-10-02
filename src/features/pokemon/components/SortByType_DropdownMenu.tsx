"use client"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePokemonTypes } from "@/hooks/usePokemonTypes"
import Image from "next/image"
import {motion} from 'framer-motion'
import { useTheme } from "next-themes"

interface DropdownMenuCheckboxesProps {
  sortButtonName: string;
  typeSelected: string | null;
  onTypeSelect: (type: string) => void;
}

export default function DropdownMenuCheckboxes({ sortButtonName, typeSelected, onTypeSelect }: DropdownMenuCheckboxesProps) {
  const allTypesList = usePokemonTypes()
  const theme = useTheme().theme;

  return (
    <DropdownMenu>
      <motion.div className="flex pl-2 gap-3"
        whileHover={{
          transition: {
              duration: 0
          },
          scale: 1.1
      }}
      whileTap={{ scale: 1, transition: { duration: 0} }}
      >
        <DropdownMenuTrigger asChild className={`px-3 py-1 flex items-center justify-around rounded-md text-xs bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors ${theme == 'dark' ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}
        >
          <Button variant="outline" className="flex h-6">{sortButtonName}</Button>
        </DropdownMenuTrigger>
      </motion.div>
      <DropdownMenuContent className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} `}>
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className={`grid grid-cols-3 gap-2.5`}>
          {allTypesList.map(type => (
            <DropdownMenuItem
              key={type}
              className={`flex text-right items-center justify-around rounded-md text-xs cursor-pointer transition-all duration-200 ${typeSelected === type
                    ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                    : theme == 'dark'
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}
              onClick={() => {
                onTypeSelect(type);
              }}
            >
              <Image
                alt={`${type} type`}
                src={`/pokemon_icons/${type}.svg`}
                width={20}
                height={20}
                className="mr-1"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
