import { HttpLink } from '@apollo/client';

export const httpLink = new HttpLink({
  uri: 'https://om-graphql.herokuapp.com/',
  credentials: 'include',
});
