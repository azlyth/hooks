import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  NativeModules,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { Button, Container, Content } from 'native-base';

function connect(user, host, password) {
  ToastAndroid.show("Connecting to " + host + " as " + user + "...", ToastAndroid.SHORT);

  NativeModules.SSH.connect(user, host, password, (result) => {
    ToastAndroid.show('Success!', ToastAndroid.SHORT);
    console.log(result);
  }, (errorMessage) => {
    ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
  });
}

export default class hooks extends Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={styles.content}>
            <Text style={styles.title}>Hooks</Text>
            <View>
              <TextInput style={styles.input} placeholder="User" onChangeText={(user) => this.setState({user})}></TextInput>
              <TextInput style={styles.input} placeholder="Host" onChangeText={(host) => this.setState({host})}></TextInput>
              <TextInput style={styles.input} placeholder="Password" onChangeText={(password) => this.setState({password})}></TextInput>
            </View>
            <Button large block style={styles.button} onPress={() => connect(this.state.user, this.state.host, this.state.password)}>Add Server</Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const {
  height: screenHeight,
  width:  screenWidth,
} = Dimensions.get('window');
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
  input: {
    textAlign: "center",
    fontSize: 30,
    width: screenWidth - 50,
    marginLeft: 25,
    marginRight: 25,
  },
  button: {
    margin: 25,
  },
});

AppRegistry.registerComponent('hooks', () => hooks);
