import { gql } from '@apollo/client';

export const GQL_FRAGMENT_USER = gql`
  fragment user on User {
    id
    firstName
    lastName
    userName
    createdAt
  }
`;
