import React, { Component } from 'react';
import {
  NativeModules,
  ToastAndroid,
} from 'react-native';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import store from './store';
import Home from './components/home';
import ServerList from './components/server-list';


function connect(user, host, password) {
  ToastAndroid.show("Connecting to " + host + " as " + user + "...", ToastAndroid.SHORT);

  NativeModules.SSH.connect(user, host, password, (result) => {
    ToastAndroid.show('Success!', ToastAndroid.SHORT);
    console.log(result);
  }, (errorMessage) => {
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router hideNavBar={true}>
          <Scene key="root">
            <Scene key="home" component={Home} title="Home" initial={true} />
            <Scene key="listServers" component={ServerList} title="Server List" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default App;
