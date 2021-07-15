import { PostForm } from '../../components/PostForm';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GQL_POST } from '../../graphql/queries/post';
import { useEffect } from 'react';
import { Loading } from '../../components/Loading';
import { GQL_UPDATE_POST } from '../../graphql/mutations/post';

export const PostEditor = () => {
  const { id } = useParams();
  const [getPost, { loading, error, data }] = useLazyQuery(GQL_POST);
  const [updatePost, { error: updateError }] = useMutation(GQL_UPDATE_POST);

  useEffect(() => {
    if (!id) return;

    getPost({
      variables: {
        id,
      },
    });
  }, [id, getPost]);

  const handleSubmit = (formValue) => {
    if (id) return handleUpdate(formValue);
    return handleCreate(formValue);
  };

  const handleUpdate = async (formValue) => {
    console.log('UPDATE', formValue);
  };

  const handleCreate = async (formValue) => {};

  if (loading) return <Loading loading={true} />;

  const formError = error
    ? error.message
    : updateError
    ? updateError.message
    : '';
  return (
    <>
      <Helmet title="Edit/Create Post - GraphQL + Apollo-Client - Otávio Miranda" />

      <PostForm
        handleSubmitCb={handleSubmit}
        post={data?.post}
        formError={formError}
      />
    </>
  );
};
