import { gql } from '@apollo/client';

export const GQL_LOGIN = gql`
  mutation LOGIN($userName: String!, $password: String!) {
    login(data: { userName: $userName, password: $password }) {
      userId
      token
    }
  }
`;

export const GQL_LOGOUT = gql`
  mutation LOGOUT($userName: String!) {
    logout(userName: $userName)
  }
`;
