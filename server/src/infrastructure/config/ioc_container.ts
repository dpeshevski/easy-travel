import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';

// Repositories
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { PrismaOrderRepository } from '../repositories/PrismaOrderRepository';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { PrismaProductRepository } from '../repositories/PrismaProductRepository';

// Services
import { OrderService } from '../../application/services/OrderService';
import { ProductService } from '../../application/services/ProductService';

// Domain Services
import { OrderDomainService } from '../../domain/services/OrderDomainService';

// Commands
import { CreateOrderCommand } from '../../application/commands/CreateOrderCommand';
import { UpdateOrderCommand } from '../../application/commands/UpdateOrderCommand';
import { CreateProductCommand } from '../../application/commands/CreateProductCommand';
import { UpdateProductCommand } from '../../application/commands/UpdateProductCommand';
import { DeleteProductCommand } from '../../application/commands/DeleteProductCommand';

// Queries
import { GetAllOrdersQuery } from '../../application/queries/GetAllOrdersQuery';
import { GetOrderByIdQuery } from '../../application/queries/GetOrderByIdQuery';
import { GetAllProductsQuery } from '../../application/queries/GetAllProductsQuery';
import { GetProductByIdQuery } from '../../application/queries/GetProductByIdQuery';
import { GetProductsByCategoryQuery } from '../../application/queries/GetProductsByCategoryQuery';

// Controllers or Resolvers
import { OrderResolver } from '../../infrastructure/graphql/resolvers/OrderResolver';
import { ProductResolver } from '../../infrastructure/graphql/resolvers/ProductResolver';

// Strategy factories
import { UpdateStrategyFactory } from '../../domain/factories/UpdateStrategyFactory';

const container = new Container();

// Bind Repositories
container.bind<ProductRepository>(TYPES.ProductRepository).to(PrismaProductRepository);
container.bind<OrderRepository>(TYPES.OrderRepository).to(PrismaOrderRepository);

// Bind Domain Services
container.bind<OrderDomainService>(TYPES.OrderDomainService).to(OrderDomainService);

// Bind Application Services
container.bind<ProductService>(TYPES.ProductService).to(ProductService);
container.bind<OrderService>(TYPES.OrderService).to(OrderService);

// Bind Commands
container.bind<CreateOrderCommand>(TYPES.CreateOrderCommand).to(CreateOrderCommand);
container.bind<UpdateOrderCommand>(TYPES.UpdateOrderCommand).to(UpdateOrderCommand);
container.bind<CreateProductCommand>(TYPES.CreateProductCommand).to(CreateProductCommand);
container.bind<UpdateProductCommand>(TYPES.UpdateProductCommand).to(UpdateProductCommand);
container.bind<DeleteProductCommand>(TYPES.DeleteProductCommand).to(DeleteProductCommand);

// Bind the strategy factory
container.bind<UpdateStrategyFactory>(TYPES.UpdateStrategyFactory).to(UpdateStrategyFactory);

// Bind Queries
container.bind<GetAllOrdersQuery>(TYPES.GetAllOrdersQuery).to(GetAllOrdersQuery);
container.bind<GetOrderByIdQuery>(TYPES.GetOrderByIdQuery).to(GetOrderByIdQuery);
container.bind<GetAllProductsQuery>(TYPES.GetAllProductsQuery).to(GetAllProductsQuery);
container.bind<GetProductByIdQuery>(TYPES.GetProductByIdQuery).to(GetProductByIdQuery);
container.bind<GetProductsByCategoryQuery>(TYPES.GetProductsByCategoryQuery).to(GetProductsByCategoryQuery);

// Bind Resolvers
container.bind<OrderResolver>(OrderResolver).toSelf();
container.bind<ProductResolver>(ProductResolver).toSelf();

export { container };
