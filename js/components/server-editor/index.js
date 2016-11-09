import React, { Component, PropTypes } from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { updateServer } from '../../actions/server';
import Form from '../form';
import Models from '../../models';


class ServerEditor extends Component {

  static propTypes = {
    server: PropTypes.object,
    updateServer: React.PropTypes.func,
  }

  updateServer() {
    this.props.updateServer(this.refs.serverForm.state);
    Actions.pop();
  }

  render() {
    return (
      <Container>
        <Content>
          <Form ref="serverForm"
            title="Update Server"
            fields={Models.server}
            initialState={this.props.server}
            submit={() => this.updateServer()}
          />
        </Content>
      </Container>
    );
  }
}

function mapDispatch(dispatch) {
  return {
    updateServer: server => dispatch(updateServer(server))
  };
}

export default connect(null, mapDispatch)(ServerEditor);
