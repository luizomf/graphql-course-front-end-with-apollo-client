import { Post } from 'components/Post';
import { Comment } from 'components/Comment';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CommentForm } from 'components/CommentForm';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';
import { GQL_POST } from '../../graphql/queries/post';
import { Loading } from '../../components/Loading';
import { DefaultError } from '../../components/DefaultError';
import { useAuthVar } from '../../graphql/reactive-var/auth';

export const PostDetails = () => {
  const authVar = useAuthVar();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GQL_POST, {
    variables: {
      id,
    },
  });

  if (loading) return <Loading loading={loading} />;
  if (error) return <DefaultError error={error} />;

  const post = data?.post;
  if (!post) return null;

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
        handleSubmit={(comment) => toast.success(`Your comment is: ${comment}`)}
      />
    </>
  );
};
