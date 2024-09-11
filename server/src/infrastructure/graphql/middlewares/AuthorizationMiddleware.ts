import { MiddlewareFn } from 'type-graphql';
import dotenv from 'dotenv';
import { Context } from '../../../types/Context';

dotenv.config();

export const AuthorizationMiddleware: MiddlewareFn<Context> = async ({ context }, next) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  const email = context.req.headers['x-admin-email'];
  const password = context.req.headers['x-admin-password'];

  if (email === adminEmail && password === adminPassword) {
    return next();
  }

  throw new Error('Not authorized');
};
