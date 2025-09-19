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
      }
    }
  }
`;


