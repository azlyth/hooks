/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  NativeModules,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { Button, Container, Content } from 'native-base';

function connect() {
  NativeModules.SSH.connect('some-host.com', 'some-password', function(result) {
    ToastAndroid.show(result, ToastAndroid.LONG);
  });
}

export default class hooks extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={styles.content}>
            <Text style={styles.title}>Hooks</Text>
            <Button large block style={styles.button} onPress={connect}>Add Server</Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const {height: screenHeight} = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 40,
    color: '#5067FF',
  },
  button: {
    margin: 25,
  },
});

AppRegistry.registerComponent('hooks', () => hooks);
