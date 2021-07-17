import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { httpLink } from './http-link';
import { wsLink } from './websocket-link';

export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
