import { gql } from '@apollo/client';
import { GQL_FRAGMENT_COMMENT } from 'graphql/fragments/comment';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_CREATED_COMMENT = gql`
  subscription CREATED_COMMENT {
    createdComment {
      ...comment
      user {
        ...user
      }
    }
  }

  ${GQL_FRAGMENT_USER}
  ${GQL_FRAGMENT_COMMENT}
`;
