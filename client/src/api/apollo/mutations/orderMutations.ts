import gql from 'graphql-tag';

export const CONFIRM_ORDER = gql`
  mutation ConfirmOrder($confirmOrderId: String!) {
    confirmOrder(id: $confirmOrderId) {
      id
      status
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($updateOrderId: String!) {
    updateOrder(id: $updateOrderId) {
      customerName
      product {
        name
      }
      status
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation PlaceOrder($orderData: OrderDTO!) {
    createOrder(data: $orderData) {
      id
      productId
      status
      totalPrice
    }
  }
`;
