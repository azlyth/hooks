import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from './reducers';


const store = createStore(reducer, undefined, autoRehydrate());
persistStore(store, {storage: AsyncStorage});

export default store;
