import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query GetProducts($status: String) {
    products(status: $status) {
      id
      name
      description
      category
      status
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      description
      price
      category
      location
    }
  }
`;
