import { onError } from '@apollo/client/link/error';
import { authDataManager } from '../../reactive-var/auth';

export const errorLink = onError(({ graphQLErrors }) => {
  if (!graphQLErrors) return;

  graphQLErrors.forEach((error) => {
    const errorCode = error && error.extensions && error.extensions.code;

    if (errorCode === 'UNAUTHENTICATED') {
      console.log('ESSE USUÁRIO NÃO ESTÁ LOGADO, DESLOGANDO...');
      authDataManager.reset();
    }
  });
});
