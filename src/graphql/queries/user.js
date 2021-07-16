import { gql } from '@apollo/client';
import { GQL_FRAGMENT_USER } from '../fragments/user';

export const GQL_USER = gql`
  query GET_USER($id: ID!) {
    user(id: $id) {
      ...user
    }
  }

  ${GQL_FRAGMENT_USER}
`;
