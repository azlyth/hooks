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
          <Form ref="serverForm"
            title="New Server"
            fields={this.serverFields()}
            submit={() => this.addServer()}
          />
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
