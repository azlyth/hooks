import React, { Component } from 'react';
import {
  NativeModules,
  ToastAndroid,
} from 'react-native';
import { Provider } from 'react-redux';
import Home from './components/home';
import store from './store';
import { Router, Scene } from 'react-native-router-flux';


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
            <Scene key="home" component={Home} title="Home Title" initial={true} />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default App;
