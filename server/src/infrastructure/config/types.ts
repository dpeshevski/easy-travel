const TYPES = {
  // Repositories
  OrderRepository: Symbol.for("OrderRepository"),
  ProductRepository: Symbol.for("ProductRepository"),

  // Services
  ProductService: Symbol.for("ProductService"),
  OrderService: Symbol.for("OrderService"),

  // Domain Services
  OrderDomainService: Symbol.for("OrderDomainService"),
  ProductDomainService: Symbol.for("ProductDomainService"),

  // Commands
  CreateProductCommand: Symbol.for('CreateProductCommand'),
  UpdateProductCommand: Symbol.for("UpdateProductCommand"),
  DeleteProductCommand: Symbol.for("DeleteProductCommand"),
  CreateOrderCommand: Symbol.for("CreateOrderCommand"),
  UpdateOrderCommand: Symbol.for("UpdateOrderCommand"),

  // Queries
  GetAllProductsQuery: Symbol.for("GetAllProductsQuery"),
  GetProductByIdQuery: Symbol.for("GetProductByIdQuery"),
  GetProductsByCategoryQuery: Symbol.for("GetProductsByCategoryQuery"),
  GetAllOrdersQuery: Symbol.for("GetAllOrdersQuery"),
  GetOrderByIdQuery: Symbol.for("GetOrderByIdQuery"),

  // Factories
  UpdateStrategyFactory: Symbol.for('UpdateStrategyFactory'),

  // Resolvers
  ProductResolver: Symbol.for("ProductResolver"),
  OrderResolver: Symbol.for("OrderResolver"),
};

export { TYPES };
