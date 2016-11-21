import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { addServer } from '../../actions/server';
import Frame from '../frame';
import Form from '../form';
import Models from '../../models';


class ServerCreator extends Component {

  static propTypes = {
    addServer: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.addServer = this.addServer.bind(this);
  }

  addServer(form) {
    this.props.addServer({...form, hooks: []});
    Actions.pop();
  }

  render() {
    return (
      <Frame>
        <Form title="New Server"
          fields={Models.server}
          submit={this.addServer} />
      </Frame>
    );
  }
}

function mapDispatch(dispatch) {
  return {
    addServer: server => dispatch(addServer(server))
  };
}

export default connect(null, mapDispatch)(ServerCreator);
