import { gql } from '@apollo/client';
import { GQL_FRAGMENT_POST } from '../fragments/post';
import { GQL_FRAGMENT_USER } from '../fragments/user';

export const GQL_DELETE_POST = gql`
  mutation DELETE_POST($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const GQL_UPDATE_POST = gql`
  mutation UPDATE_POST($postId: ID!, $title: String, $body: String) {
    updatePost(postId: $postId, data: { title: $title, body: $body }) {
      ...post
      user {
        ...user
      }
    }
  }

  ${GQL_FRAGMENT_POST}
  ${GQL_FRAGMENT_USER}
`;

export const GQL_CREATE_POST = gql`
  mutation CREATE_POST($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      ...post
      user {
        ...user
      }
    }
  }

  ${GQL_FRAGMENT_POST}
  ${GQL_FRAGMENT_USER}
`;
