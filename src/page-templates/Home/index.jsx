import P from 'prop-types';
import * as Styled from './styles';
import { Heading } from 'components/Heading';
import { Post } from 'components/Post';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';
import { GQL_POSTS } from '../../graphql/queries/post';
import { Loading } from '../../components/Loading';
import { DefaultError } from '../../components/DefaultError';

export const Home = () => {
  const { loading, error, data } = useQuery(GQL_POSTS);

  if (loading) return <Loading loading={loading} />;
  if (error) return <DefaultError error={error} />;
  if (!data) return null;

  return (
    <>
      <Helmet title="Home - GraphQL + Apollo-Client - Otávio Miranda" />

      <Styled.HeadingContainer>
        <Heading>Posts</Heading>
      </Styled.HeadingContainer>

      <Styled.PostsContainer>
        {data.posts.map((post) => {
          const uniqueKey = `home-post-${post.id}`;
          return (
            <Post
              key={uniqueKey}
              id={post.id}
              title={post.title}
              body={post.body}
              user={post.user}
              createdAt={post.createdAt}
            />
          );
        })}
      </Styled.PostsContainer>
    </>
  );
};

Home.propTypes = {
  children: P.node,
};
