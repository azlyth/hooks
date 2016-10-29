import ADD_SERVER from '../actions/server';

const initialState = [];

export default function(servers = initialState, action) {
  switch (action.type) {
    case 'ADD_SERVER':
      return [...servers, action.server];
    default:
      return servers;
  }
}
