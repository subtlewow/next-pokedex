/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Pokemon type background colors
    'bg-bug', 'bg-dark', 'bg-dragon', 'bg-electric', 'bg-fairy', 'bg-fighting',
    'bg-fire', 'bg-flying', 'bg-ghost', 'bg-normal', 'bg-grass', 'bg-ground',
    'bg-ice', 'bg-poison', 'bg-psychic', 'bg-rock', 'bg-steel', 'bg-water',
    // Pokemon type text colors
    'text-bug', 'text-dark', 'text-dragon', 'text-electric', 'text-fairy', 'text-fighting',
    'text-fire', 'text-flying', 'text-ghost', 'text-normal', 'text-grass', 'text-ground',
    'text-ice', 'text-poison', 'text-psychic', 'text-rock', 'text-steel', 'text-water',
  ],
  theme: {
    extend: {
      colors: {
        // Pokémon Types
        bug: '#A7B723',
        dark: '#75574C',
        dragon: '#7037FF',
        electric: '#F9CF30',
        fairy: '#E69EAC',
        fighting: '#C12239',
        fire: '#F57D31',
        flying: '#A891EC',
        ghost: '#70559B',
        normal: '#AAA67F',
        grass: '#74CB48',
        ground: '#DEC16B',
        ice: '#9AD6DF',
        poison: '#A43E9E',
        psychic: '#FB5584',
        rock: '#B69E31',
        steel: '#B7B9D0',
        water: '#6493EB',
        // Grayscale
        'dark-gray': '#212121',
        'medium-gray': '#666666',
        'light-gray': '#E0E0E0',
        background: '#EFEFEF',
        white: '#FFFFFF',
        // Primary
        primary: '#DC0A2D',
      },
    },
  },
  plugins: [],
}
