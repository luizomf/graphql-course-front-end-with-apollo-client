import { ApolloLink } from '@apollo/client';

export const forwardLink = new ApolloLink((operation, forward) => {
  operation.setContext((prevContext) => {
    return {
      ...prevContext,
      thisCame: 'From forward link',
      headers: {
        ...prevContext.headers,
        ___ABC___: '___ABC___',
      },
    };
  });

  return forward(operation).map((data) => {
    return data;
  });
});
