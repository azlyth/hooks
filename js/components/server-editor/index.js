import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateServer } from '../../actions/server';
import Frame from '../frame';
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
      <Frame>
        <Form ref="serverForm"
          title="Update Server"
          fields={Models.server}
          initialValues={this.props.server}
          submit={() => this.updateServer()} />
      </Frame>
    );
  }
}

function mapDispatch(dispatch) {
  return {
    updateServer: server => dispatch(updateServer(server))
  };
}

export default connect(null, mapDispatch)(ServerEditor);
