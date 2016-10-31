import React, { Component, PropTypes } from 'react';
import {
  InteractionManager,
  NativeModules,
  Text,
  View,
} from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import { connect } from 'react-redux';

import styles from './styles.js';


function ActionList(props) {
  if (props.actions.length > 0) {
    return (
      <View>
        {props.actions.map((action, index) =>
          <Text key={index}>{action}</Text>
        )}
      </View>
    );
  } else {
    return (
      <View>
        <Text>Gathering actions...</Text>
        <Spinner color="blue" />
      </View>
    );
  }
}

ActionList.propTypes = {
  actions: PropTypes.array,
};


class ServerInspector extends Component {

  static propTypes = {
    server: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {actions: []};
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.gatherActions());
  }

  gatherActions() {
    command = "ls -a .hooks-app/hooks";

    NativeModules.SSH.execute(this.props.server, command, (result) => {
      this.state.actions = result;
    }, (errorMessage) => {
      console.log(errorMessage);
    });
  }

  render() {
    actions = this.state.actions;
    server = this.props.server;

    return (
      <Container>
        <Content>
          <View style={styles.body}>
            <Text style={styles.title}>{server.user}@{server.host}</Text>
            <View style={styles.content}>
              <ActionList actions={actions} />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(ServerInspector);
