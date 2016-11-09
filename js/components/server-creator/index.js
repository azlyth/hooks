import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Button, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import { addServer } from '../../actions/server';
import Form from '../form';


class ServerCreator extends Component {

  static propTypes = {
    addServer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  addServer() {
    this.props.addServer(this.refs.serverForm.state);
    Actions.pop();
  }

  serverFields() {
    return [
      { name: 'user' },
      { name: 'host' },
      { name: 'password', secure: true },
    ];
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.content}>
            <Text style={styles.title}>New Server</Text>
            <Form ref="serverForm" fields={this.serverFields()} />
            <Button style={styles.button}
              bordered large block
              onPress={() => this.addServer()}>Save</Button>
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
