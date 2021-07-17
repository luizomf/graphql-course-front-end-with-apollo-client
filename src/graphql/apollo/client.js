import { ApolloClient, from } from '@apollo/client';
import { httpLink } from './links/http-link';
import { cache } from './cache/in-memory-cache';
import { forwardLink } from './links/forward-link';

export const apolloClient = new ApolloClient({
  link: from([forwardLink, httpLink]),
  cache,
});
