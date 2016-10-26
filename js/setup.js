import React, { Component } from 'react';
import {
  NativeModules,
  ToastAndroid,
} from 'react-native';
import Home from './components/home';


function connect(user, host, password) {
  ToastAndroid.show("Connecting to " + host + " as " + user + "...", ToastAndroid.SHORT);

  NativeModules.SSH.connect(user, host, password, (result) => {
    ToastAndroid.show('Success!', ToastAndroid.SHORT);
    console.log(result);
  }, (errorMessage) => {
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
  });
}

class hooks extends Component {
  render() {
    return (<Home />);
  }
}

export default hooks;

