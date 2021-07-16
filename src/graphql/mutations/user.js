import { gql } from '@apollo/client';
import { GQL_FRAGMENT_USER } from '../fragments/user';

export const GQL_CREATE_USER = gql`
  mutation CREATE_USER(
    $firstName: String!
    $lastName: String!
    $userName: String!
    $password: String!
  ) {
    createUser(
      data: {
        firstName: $firstName
        lastName: $lastName
        userName: $userName
        password: $password
      }
    ) {
      ...user
    }
  }

  ${GQL_FRAGMENT_USER}
`;

export const GQL_DELETE_USER = gql`
  mutation DELETE_USER($userId: ID!) {
    deleteUser(userId: $userId)
  }
`;

export const GQL_UPDATE_USER = gql`
  mutation UPDATE_USER(
    $userId: ID!
    $firstName: String
    $lastName: String
    $userName: String
    $password: String
  ) {
    updateUser(
      userId: $userId
      data: {
        firstName: $firstName
        lastName: $lastName
        userName: $userName
        password: $password
      }
    ) {
      ...user
    }
  }

  ${GQL_FRAGMENT_USER}
`;
