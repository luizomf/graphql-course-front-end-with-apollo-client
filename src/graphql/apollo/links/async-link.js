import { setContext } from '@apollo/client/link/context';

export const asyncLink = setContext((_request) => {
  const callback = (prevContext) => {
    return {
      ...prevContext,
      anotherOneFromAsync: 'link',
      headers: {
        ...prevContext.headers,
        fromAsync: 'link',
      },
    };
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(callback);
    }, 0);
  });
});
