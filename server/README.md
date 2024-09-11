# EasyTravel Backend (GraphQL API)

This is the backend of the **EasyTravel** project, a GraphQL API that serves a travel and vacation product management system. It handles both user-facing and admin-facing operations for managing travel products, placing orders, and more.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [GraphQL Endpoints](#graphql-endpoints)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [License](#license)

## Getting Started

The GraphQL API handles the backend operations for EasyTravel, where users can browse travel products and place orders, while admins can manage these products and view placed orders.

### Key Features

- **Product Management**: Admins can create, update, delete, and mark products as unavailable.
- **Order Management**: Users can place orders, while admins can view, process, and confirm them.
- **Filtering & Queries**: View products based on availability and filter orders by status.

## Project Structure

```bash
src/
│
├── application/
│   ├── commands/         # Business logic commands (create/update operations)
│   ├── queries/          # Query logic (retrieve data)
│   └── dto/              # Data Transfer Objects (DTOs)
│
├── domain/
│   ├── entities/         # Core domain models like Product and Order
│   └── repositories/     # Interfaces for repositories
│
├── infrastructure/
│   ├── config/           # Configuration files (e.g., types, environment)
│   ├── repositories/     # Implementations of repositories (e.g., Prisma)
│   ├── graphql/          # GraphQL schema and resolvers
│   └── db/               # Prisma database configuration
│
├── tests/                # Unit and integration tests
└── server.ts             # Main entry point to run the server
```

## Technologies

- Node.js: Backend runtime environment.
- TypeScript: For type-safe development.
- GraphQL: Query language for the API.
- TypeGraphQL: GraphQL schema and resolvers in TypeScript.
- Prisma: ORM for database interactions with PostgreSQL.
- Inversify: Dependency injection for scalable architecture.
- Jest: Testing framework for unit and integration tests.

## GraphQL Endpoints

### Queries

- orders(status: OrderStatus): Fetch all orders, optionally filtered by status.
- order(id: String!): Fetch a specific order by ID.
- products(status: ProductStatus): Fetch all available products, optionally filtered by status.
- product(id: String!): Fetch a specific product by ID.

## Mutations

- createOrder(data: OrderDTO!): Create a new order.
- updateOrder(id: String!, data: OrderDTO!): Update an existing order.
- processOrder(id: String!): Mark an order as PROCESSING.
- confirmOrder(id: String!): Confirm an order and mark it as COMPLETED.
- createProduct(data: ProductDTO!): Admin-only mutation to create a product.
- deleteProduct(id: String!): Admin-only mutation to delete a product.
- markProductAsUnavailable(id: String!): Mark a product as unavailable.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dpeshevski/easy-travel.git
cd easy-travel
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables by creating a `.env` file in the root directory with the following content:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/easytravel_db
PORT=4000
ADMIN_EMAIL=admin@easytravel.com
ADMIN_PASSWORD=adminpassword123
```

4. Run Prisma migrations to set up the database:

```bash
npx prisma migrate dev
```

## Running the Project

### Start the development server

```bash
npm run dev
```

This will start the GraphQL API on <http://localhost:4000>.
Access the GraphQL Playground at <http://localhost:4000/graphql> to interact with the API.

## Testing

### The project includes unit and integration tests using Jest. You can run the tests as follows

Run all tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```
