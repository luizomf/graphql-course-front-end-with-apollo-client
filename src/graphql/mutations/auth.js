import { gql } from '@apollo/client';

export const GQL_LOGIN = gql`
  mutation LOGIN($userName: String!, $password: String!) {
    login(data: { userName: $userName, password: $password }) {
      userId
      token
    }
  }
`;
