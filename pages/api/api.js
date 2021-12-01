import { gql } from "@apollo/client";
export const GET_KEY = gql`
  query GetId($name_tail: String!) {
  set_of_keys_by_pk(name_tail: $name_tail) {
    id_tail
  }
} 
`;

