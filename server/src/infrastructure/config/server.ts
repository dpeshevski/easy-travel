import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { OrderResolver } from '../graphql';
import { ProductResolver } from '../graphql/resolvers/ProductResolver';
import { prisma } from './db';
import { Context } from '../../types/Context';
import { errorHandlingMiddleware } from '../../interfaces/http/middlewares/errorHandlingMiddleware';
import { container } from './ioc_container';

export async function startServer() {
  const app: Application = express();

  const schema = await buildSchema({
    resolvers: [OrderResolver, ProductResolver],
    emitSchemaFile: true,
    container: { get: (cls) => container.get(cls) },
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }: Context): Context => ({ prisma, req }),
  });

  await server.start();
  // @ts-ignore
  server.applyMiddleware({ app });

  app.use(errorHandlingMiddleware);

  app.listen({ port: process.env.PORT ?? 4000 }, () => 
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}
