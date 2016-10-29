export const ADD_SERVER = 'ADD_SERVER';

export function addServer(server) {
  return {
    type: ADD_SERVER,
    server: server
  };
}
