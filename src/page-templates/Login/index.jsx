import { useMutation } from '@apollo/client';
import { AuthForm } from 'components/AuthForm';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Loading } from '../../components/Loading';
import { GQL_LOGIN } from '../../graphql/mutations/auth';

export const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [login, { loading, error }] = useMutation(GQL_LOGIN, {
    onError() {},
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userNameInput = form.username;
    const passwordInput = form.password;

    const variables = {
      userName: userNameInput.value,
      password: passwordInput.value,
    };

    setFormData(variables);

    await login({
      variables,
    });
  };

  if (loading) return <Loading loading={loading} />;
  // if (error) return <DefaultError error={error} />;

  return (
    <>
      <Helmet title="Login - GraphQL + Apollo-Client - Otávio Miranda" />
      <AuthForm
        handleLogin={handleLogin}
        formDisabled={false}
        formError={error?.message}
        formData={formData}
      />
    </>
  );
};
