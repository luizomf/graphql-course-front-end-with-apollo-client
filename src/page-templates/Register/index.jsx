import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { RegisterForm } from 'components/RegisterForm';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DefaultContainer } from '../../components/DefaultContainer';
import { FormButton } from '../../components/FormButton';
import {
  GQL_CREATE_USER,
  GQL_DELETE_USER,
  GQL_UPDATE_USER,
} from '../../graphql/mutations/user';
import { GQL_USER } from '../../graphql/queries/user';
import { useAuthVar } from '../../graphql/reactive-var/auth';
import { logout } from '../../utils/logout';

export const Register = () => {
  const authVar = useAuthVar();
  const history = useHistory();
  const client = useApolloClient();

  const [getUser, userData] = useLazyQuery(GQL_USER, {
    onError() {},
  });
  const [createUser, createUserData] = useMutation(GQL_CREATE_USER, {
    onError() {},
    onCompleted() {
      toast.success('Account created. You can login now.');
      history.push('/login');
    },
  });
  const [deleteUser, deleteUserData] = useMutation(GQL_DELETE_USER, {
    onError() {},
    onCompleted() {
      logout(client, authVar.userName, () => {
        window.location.href = '/login';
      });
    },
  });
  const [updateUser, updateUserData] = useMutation(GQL_UPDATE_USER, {
    onError() {},
    onCompleted() {
      logout(client, authVar.userName, () => {
        window.location.href = '/login';
      });
    },
  });

  useEffect(() => {
    if (authVar.isLoggedIn && !userData?.data?.user) {
      getUser({
        variables: {
          id: authVar.userId,
        },
      });
    }
  }, [authVar, userData.data, getUser]);

  const handleSubmit = (formData) => {
    if (!authVar.isLoggedIn) return handleCreateUser(formData);
    return handleUpdateUser(formData);
  };

  const handleCreateUser = async (formData) => {
    await createUser({
      variables: {
        ...formData,
      },
    });
  };

  const handleUpdateUser = async (formData) => {
    const cleanedFormData = {};

    for (const key in formData) {
      if (formData[key]) {
        cleanedFormData[key] = formData[key];
      }
    }

    await updateUser({
      variables: {
        userId: authVar.userId,
        ...cleanedFormData,
      },
    });
  };

  const handleDelete = async () => {
    const shouldDelete = confirm('Are you sure?');

    if (!shouldDelete) return;

    await deleteUser({
      variables: {
        userId: authVar.userId,
      },
    });
  };

  return (
    <>
      <Helmet title="Register - GraphQL + Apollo-Client - Otávio Miranda" />

      <RegisterForm
        handleSubmitCb={handleSubmit}
        authData={userData?.data?.user}
        formError={
          updateUserData?.error?.message ||
          createUserData?.error?.message ||
          deleteUserData?.error?.message ||
          userData?.error?.message
        }
        somethingLoading={
          updateUserData.loading ||
          createUserData.loading ||
          deleteUserData.loading ||
          userData.loading
        }
      />

      {authVar.isLoggedIn && (
        <DefaultContainer>
          <FormButton bgColor="secondary" onClick={handleDelete}>
            Delete account
          </FormButton>
        </DefaultContainer>
      )}
    </>
  );
};
