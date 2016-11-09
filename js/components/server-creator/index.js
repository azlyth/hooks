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
import Models from '../../models';


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

  render() {
    return (
      <Container>
        <Content>
          <Form ref="serverForm"
            title="New Server"
            fields={Models.server}
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
