import { gql } from '@apollo/client';
import { GQL_FRAGMENT_COMMENT } from '../fragments/comment';
import { GQL_FRAGMENT_USER } from '../fragments/user';

export const GQL_CREATE_COMMENT = gql`
  mutation CREATE_COMMENT($comment: String!, $postId: String!) {
    createComment(data: { comment: $comment, postId: $postId }) {
      ...comment
      user {
        ...user
      }
    }
  }

  ${GQL_FRAGMENT_COMMENT}
  ${GQL_FRAGMENT_USER}
`;
