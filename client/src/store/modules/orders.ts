/* eslint-disable no-param-reassign */
import { ActionContext } from 'vuex';
import apolloClient from '../../api/apollo/client';
import { Order, OrderState, Status } from '../../modules/orders/types';
import { GET_ORDERS } from '../../api/apollo/queries/orderQueries';
import { CONFIRM_ORDER, PLACE_ORDER } from '../../api/apollo/mutations/orderMutations';

const state: OrderState = {
  orders: [],
  customerName: ''
};

const mutations = {
  SET_ORDERS(orderState: OrderState, orders: Order[]) {
    orderState.orders = orders;
  },

  SET_CUSTOMER_NAME(orderState: OrderState, customerName: string) {
    orderState.customerName = customerName;
  },

  UPDATE_ORDER_STATUS(
    orderState: OrderState,
    { orderId, status }: { orderId: string; status: Status }
  ) {
    const orderIndex = orderState.orders.findIndex((order: Order) => order.id === orderId);
    if (orderIndex !== -1) {
      orderState.orders = [
        ...orderState.orders.slice(0, orderIndex),
        {
          ...orderState.orders[orderIndex],
          status
        },
        ...orderState.orders.slice(orderIndex + 1)
      ];
    }
  }
};

const actions = {
  async fetchOrders(
    { commit }: ActionContext<OrderState, unknown>,
    status: Status
  ) {
    const response = await apolloClient.query({
      query: GET_ORDERS,
      variables: {
        status
      }
    });
    commit('SET_ORDERS', response.data.orders);
  },

  async confirmOrder({ commit }: ActionContext<OrderState, unknown>, orderId: string) {
    commit('UPDATE_ORDER_STATUS', { orderId, status: Status.COMPLETED });

    try {
      const response = await apolloClient.mutate({
        mutation: CONFIRM_ORDER,
        variables: {
          confirmOrderId: orderId
        },
        optimisticResponse: {
          confirmOrder: {
            id: orderId,
            status: Status.COMPLETED,
            __typename: 'Order'
          }
        },
        update: (cache) => {
          const existingOrders: { orders: Order[] } | null = cache.readQuery({
            query: GET_ORDERS,
            variables: { status: Status.PLACED }
          });

          if (existingOrders?.orders) {
            cache.writeQuery({
              query: GET_ORDERS,
              data: {
                orders: existingOrders.orders.map(
                  (order: Order) => (
                    order.id === orderId ? { ...order, status: Status.COMPLETED } : order
                  )
                )
              }
            });
          }
        }
      });

      commit('UPDATE_ORDER_STATUS', { orderId, status: response.data?.confirmOrder?.status });
    } catch (error) {
      commit('UPDATE_ORDER_STATUS', { orderId, status: Status.PLACED });
    }
  },

  // Place an order
  async placeOrder(
    { state: orderState }: ActionContext<OrderState, unknown>,
    orderData: { productId: string; quantity: number }
  ) {
    await apolloClient.mutate({
      mutation: PLACE_ORDER,
      variables: {
        orderData: {
          productId: orderData.productId,
          quantity: orderData.quantity,
          customerName: orderState.customerName
        }
      }
    });
  },

  updateCustomerName({ commit }: ActionContext<OrderState, unknown>, customerName: string) {
    commit('SET_CUSTOMER_NAME', customerName);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
