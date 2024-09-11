import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum Category {
    FLIGHT
    HOTEL
    CAR_RENTAL
    BUNDLE
  }

  enum OrderStatus {
    PENDING
    PLACED
    PROCESSING    # Order is being processed manually
    MANUAL_CONFIRMATION # Requires human confirmation before moving forward
    COMPLETED
    CANCELLED
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: Category!
    startDate: String!
    endDate: String!
    location: String!
    createdAt: String!
    updatedAt: String!
  }

  type BundleProduct {
    id: ID!
    name: String!
    description: String!
    price: Float!
    flight: Product!  # Flight information
    hotel: Product    # Optional hotel info
    carRental: Product # Optional car rental info
    startDate: String!
    endDate: String!
    createdAt: String!
    updatedAt: String!
  }

  type Order {
    id: ID!
    product: Product!
    bundle: BundleProduct
    customerName: String!
    quantity: Int!
    totalPrice: Float!
    status: OrderStatus!
    createdAt: String!
    updatedAt: String!
  }

  input OrderInput {
    productId: ID!
    bundleId: ID
    customerName: String!
    quantity: Int!
  }

  input ProductInput {
    name: String!
    description: String!
    price: Float!
    category: Category!
    startDate: String!
    endDate: String!
    location: String!
  }

  type Query {
    products: [Product!]!
    bundles: [BundleProduct!]!
    orders: [Order!]!
    order(id: ID!): Order
  }

  type Mutation {
    createProduct(data: ProductInput!): Product!
    createOrder(data: OrderInput!): Order!
    updateOrder(id: ID!, data: OrderInput!): Order!
    confirmOrder(id: ID!): Order!
    updateOrderStatus(id: ID!, status: OrderStatus!): Order!
  }
`;
