import { combineReducers } from 'redux';
import server from './server';


export default combineReducers({
  servers: server
});
