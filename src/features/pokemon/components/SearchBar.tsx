"use client"

import { Dispatch, SetStateAction } from "react";

interface SearchProps {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchProps) {
  return (
    <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}
