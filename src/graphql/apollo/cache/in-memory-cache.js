import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = [], incoming = []) {
            // console.log('EXISTING', existing);
            // console.log('INCOMING', incoming);
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});
