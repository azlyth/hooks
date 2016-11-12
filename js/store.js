import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { getStoredState, persistStore, autoRehydrate } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import reducer from './reducers';


const store = createStore(reducer, undefined, autoRehydrate());

export function unlockStore(password) {
  return new Promise((resolve, reject) => {

    encryptor = createEncryptor({secretKey: password})
    config = {storage: AsyncStorage, transforms: [encryptor]}

    // Check if the password provided is correct
    getStoredState(config).then((state) => {
      if (Object.values(state).includes(null)) {
        reject();
      } else {
        persistStore(store, config);
        resolve();
      }
    })

  })
}

export default store;
