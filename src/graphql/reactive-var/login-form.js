const { makeVar, useReactiveVar } = require('@apollo/client');

const initialValue = {
  userName: '',
  password: '',
};

const loginFormVarFn = makeVar(initialValue);

const useLoginFomVar = () => {
  return useReactiveVar(loginFormVar);
};

export const loginFormVar = {
  set: (p) => loginFormVarFn(p),
  get: () => loginFormVarFn(),
  reset: () => loginFormVarFn(initialValue),
  use: useLoginFomVar,
};
