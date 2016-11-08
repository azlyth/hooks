export const ADD_SERVER = 'ADD_SERVER';
export const REMOVE_SERVER = 'REMOVE_SERVER';
export const UPDATE_SERVER = 'UPDATE_SERVER';

export function addServer(server) {
  return {
    type: ADD_SERVER,
    server: server
  };
}

export function removeServer(server) {
  return {
    type: REMOVE_SERVER,
    server: server,
  };
}

export function updateServer(server) {
  return {
    type: UPDATE_SERVER,
    server: server,
  };
}
