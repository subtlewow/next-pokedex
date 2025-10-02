"use client";

import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  {
    pokemon {
      id
      name
      pokemonsprites {
        sprites
      },
      pokemontypes {
        id,
        type {
          name
        }
      },
      pokemonstats {
        base_stat,
        stat {
          name
        }
      },
      specs: pokemonspecy {
        about: pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 } } # 9 = English
          limit: 1
        ) {
          info: flavor_text
        }
      }
    }
  }
`;

export const GET_SPRITES = gql`
  {
    pokemon {
      id,
      name,
      pokemonsprites {
        sprites
      }
    }
  }
`

export const GET_TYPES = gql`
  {
    pokemon {
      id,
      name,
      pokemontypes {
        id,
        type {
          name
        }
      }
    }
  }
`

export const GET_EVOLUTIONS = gql`
  {
    evolutionchain {
      id,
      pokemonspecies(order_by: [ {
        id: asc
      }]) {
        id
        name
      }
    }
  }
`

export const GET_STATS = gql`
  {
    pokemon {
      pokemonstats {
        base_stat,
        stat {
          name
        }
      }
    }
  }

`
