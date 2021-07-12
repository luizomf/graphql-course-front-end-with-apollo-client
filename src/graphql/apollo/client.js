import { ApolloClient, InMemoryCache } from '@apollo/client';
import { httpLink } from './links/http-link';

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
