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

  constructor(props) {
    super(props);
    this.updateServer = this.updateServer.bind(this);
  }

  updateServer(form) {
    // Merge with props.server because we need the ID
    this.props.updateServer({...this.props.server, ...form});
    Actions.pop();
  }

  render() {
    return (
      <Frame>
        <Form title="Edit Server"
          fields={Models.server}
          initialValues={this.props.server}
          submit={this.updateServer} />
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
