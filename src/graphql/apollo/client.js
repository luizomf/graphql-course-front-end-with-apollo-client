import { ApolloClient } from '@apollo/client';
import { httpLink } from './links/http-link';
import { cache } from './cache/in-memory-cache';

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
