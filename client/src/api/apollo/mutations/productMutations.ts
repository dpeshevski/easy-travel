import gql from 'graphql-tag';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($data: ProductDTO!) {
    createProduct(data: $data) {
      id
      name
      category
      description
      price
      location
      startDate
      endDate
      status
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;
