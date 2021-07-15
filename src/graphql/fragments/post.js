import { gql } from '@apollo/client';

export const GQL_FRAGMENT_POST = gql`
  fragment post on Post {
    id
    title
    body
    createdAt
    numberOfComments @client
  }
`;
