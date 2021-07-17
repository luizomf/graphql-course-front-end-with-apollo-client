import { makeReactiveVar } from './make-reactive-var';

const authVarId = '__auth_data__';
const initialValue = {
  userName: '',
  userId: '',
  isLoggedIn: false,
};
export const authDataManager = makeReactiveVar(initialValue, authVarId);
export const useAuthVar = authDataManager.useHook;
