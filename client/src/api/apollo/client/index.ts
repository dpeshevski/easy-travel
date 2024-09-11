import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: (process.env.VUE_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql').trim()
});

const authLink = setContext((_: unknown, { headers }: { headers?: Record<string, string> }) => {
  const adminEmail = process.env.VUE_ADMIN_EMAIL || 'admin@easytravel.com';
  const adminPassword = process.env.VUE_ADMIN_PASS || 'adminpassword123';

  return {
    headers: {
      ...headers,
      'x-admin-email': adminEmail,
      'x-admin-password': adminPassword
    }
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default apolloClient;
