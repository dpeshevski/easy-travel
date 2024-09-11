import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const GET_ORDERS = gql`
  query Orders($status: String) {
    orders(status: $status) {
      id
      product {
        name
      }
      customerName
      quantity
      totalPrice
      status
    }
  }
`;
