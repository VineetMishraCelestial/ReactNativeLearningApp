import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($limit: Int, $offset: Int) {
    products(limit: $limit, offset: $offset) {
      id
      title
      price
      description
      images
      slug
      creationAt
    }
  }
`;