import React, { Component } from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { Button, Container, Content } from 'native-base';
import { connect } from 'react-redux';

import styles from './styles';
import { addServer } from '../../actions/server';


class Home extends Component {

  static propTypes = {
    addServer: React.PropTypes.func,
    getServers: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  logServers() {
    console.log(this.props.getServers());
  }

  addServer() {
    ToastAndroid.show("Adding server...", ToastAndroid.SHORT);
    this.props.addServer(this.state);
  }

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
            <Button large block style={styles.button} onPress={() => this.addServer()}>Add Server</Button>
            {/* <Button large block style={styles.button} onPress={() => this.logServers()}>Log Servers</Button> */}
          </View>
        </Content>
      </Container>
    );
  }
}


function bindState(state) {
  return {
    getServers: () => state
  };
}


function bindActions(dispatch) {
  return {
    addServer: server => dispatch(addServer(server))
  };
}


export default connect(bindState, bindActions)(Home);