"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState } from "react"

export default function ThemeToggle() {
  const { setTheme } = useTheme()
  const [themeColour, setThemeColour] = useState("white");

  const handleThemeToggle = (theme: string) => {
    setTheme(theme);
    setThemeColour(theme === 'light' ? "white" : "black");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`text-${themeColour === 'white' ? 'black' : 'white'} ${themeColour === 'white' ? 'bg-white border-gray-200' : 'bg-black border-gray-700'} border`}
          align="center"
        >
        <DropdownMenuItem onClick={() => handleThemeToggle("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeToggle("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeToggle("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
