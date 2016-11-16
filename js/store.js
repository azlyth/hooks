import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { getStoredState, persistStore, autoRehydrate } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import reducer from './reducers';


const store = createStore(reducer, undefined, autoRehydrate());

createConfiguration = (password) => {
  encryptor = createEncryptor({secretKey: password});
  return {storage: AsyncStorage, transforms: [encryptor]}
};

export async function verifyStorePassword(password) {
  let state = await getStoredState(createConfiguration(password));
  let incorrect = Object.values(state).includes(null);
  return !incorrect;
};

export function unlockStore(password) {
  persistStore(store, createConfiguration(password));
};

export default store;
