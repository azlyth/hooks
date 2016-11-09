import {
  ADD_SERVER,
  REMOVE_SERVER,
  UPDATE_SERVER,
} from '../actions/server';


const initialState = {
  list: [],
  lastAssignedId: 0,
};

export default function(currentState = initialState, action) {
  switch (action.type) {

    case ADD_SERVER:
      newId = currentState.lastAssignedId + 1;
      newServer = { ...action.server, id: newId };
      return {
        ...currentState,
        list: [...currentState.list, newServer],
        lastAssignedId: newId,
      };

    case REMOVE_SERVER:
      return {
        ...currentState,
        list: currentState.list.filter(server => server.id != action.server.id)
      };

    case UPDATE_SERVER:
      return {
        ...currentState,
        list: currentState.list.map(server => server.id == action.server.id ? action.server : server)
      };

    default:
      return currentState;
  }
}
