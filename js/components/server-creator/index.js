import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { addServer } from '../../actions/server';
import Form from '../form';
import Models from '../../models';


class ServerCreator extends Component {

  static propTypes = {
    addServer: PropTypes.func,
  }

  addServer() {
    this.props.addServer(this.refs.serverForm.state);
    Actions.pop();
  }

  render() {
    return (
      <Container style={{position: 'absolute', top: 0, left: 0}}>
        <Content>
          <Form ref="serverForm"
            title="New Server"
            fields={Models.server}
            submit={() => this.addServer()} />
        </Content>
      </Container>
    );
  }
}

function mapDispatch(dispatch) {
  return {
    addServer: server => dispatch(addServer(server))
  };
}

export default connect(null, mapDispatch)(ServerCreator);
