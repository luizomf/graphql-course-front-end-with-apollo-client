import { WebSocketLink } from '@apollo/client/link/ws';

export const wsLink = new WebSocketLink({
  uri: 'wss://om-graphql.herokuapp.com/',
  options: {
    reconnect: true,
  },
});
