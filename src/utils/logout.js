import { GQL_LOGOUT } from '../graphql/mutations/auth';
import { authDataManager } from '../graphql/reactive-var/auth';

export const logout = async (client, userName, callback) => {
  authDataManager.resetVar();
  await client.mutate({
    mutation: GQL_LOGOUT,
    variables: {
      userName,
    },
  });

  if (callback) {
    callback();
  }
};
