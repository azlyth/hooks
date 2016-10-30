import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import { addServer } from '../../actions/server';


class ServerCreator extends Component {

  static propTypes = {
    addServer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  addServer() {
    this.props.addServer(this.state);
    Actions.pop();
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.content}>
            <Text style={styles.title}>New Server</Text>
            <View>
              <TextInput style={styles.input} placeholder="User" onChangeText={(user) => this.setState({user})}></TextInput>
              <TextInput style={styles.input} placeholder="Host" onChangeText={(host) => this.setState({host})}></TextInput>
              <TextInput style={styles.input} placeholder="Password" onChangeText={(password) => this.setState({password})}></TextInput>
            </View>
            <Button large block style={styles.button} onPress={() => this.addServer()}>Add Server</Button>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    addServer: server => dispatch(addServer(server))
  };
}

export default connect(null, bindActions)(ServerCreator);
