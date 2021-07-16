import { Post } from 'components/Post';
import { Comment } from 'components/Comment';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { CommentForm } from 'components/CommentForm';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from '@apollo/client';
import { GQL_POST } from '../../graphql/queries/post';
import { Loading } from '../../components/Loading';
import { DefaultError } from '../../components/DefaultError';
import { useAuthVar } from '../../graphql/reactive-var/auth';
import { GQL_CREATE_COMMENT } from '../../graphql/mutations/comment';
import { GQL_FRAGMENT_COMMENT } from '../../graphql/fragments/comment';

export const PostDetails = () => {
  const authVar = useAuthVar();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GQL_POST, {
    onError() {},
    variables: {
      id,
    },
  });
  const [createComment, { error: commentError, loading: commentLoading }] =
    useMutation(GQL_CREATE_COMMENT, {
      onError() {},
      update(cache, { data }) {
        const postId = cache.identify({ __typename: 'Post', id: post.id });
        cache.modify({
          id: postId,
          fields: {
            comments(existing) {
              const commentRef = cache.writeFragment({
                fragment: GQL_FRAGMENT_COMMENT,
                data: data.createComment,
              });
              return [...existing, commentRef];
            },
          },
        });
      },
    });

  if (loading) return <Loading loading={loading} />;
  if (error || commentError) {
    return <DefaultError error={error || commentError} />;
  }

  const post = data?.post;
  if (!post) return null;

  const handleCreateComment = async (comment, callback) => {
    await createComment({
      variables: {
        comment,
        postId: post.id,
      },
    });

    if (callback) {
      callback();
    }
  };

  return (
    <>
      <Helmet title="Post Details - GraphQL + Apollo-Client - Otávio Miranda" />

      <Post
        id={post.id}
        title={post.title}
        body={post.body}
        user={post.user}
        createdAt={post.createdAt}
        loggedUserId={authVar.userId}
        numberOfComments={post.numberOfComments}
      />

      {post.comments.map((comment) => {
        return (
          <Comment
            key={`post-details-comment-${comment.id}`}
            comment={comment.comment}
            createdAt={comment.createdAt}
            id={comment.id}
            user={comment.user}
          />
        );
      })}

      <CommentForm
        handleSubmit={handleCreateComment}
        buttonDisabled={loading || commentLoading}
      />
    </>
  );
};
