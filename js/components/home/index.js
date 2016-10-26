import React, { Component } from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { Button, Container, Content } from 'native-base';
import styles from './styles';


function addServer(user, host, password) {
  ToastAndroid.show("Adding server...", ToastAndroid.SHORT);
}

class Home extends Component {
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
            <Button large block style={styles.button} onPress={() => addServer(this.state.user, this.state.host, this.state.password)}>Add Server</Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Home;
