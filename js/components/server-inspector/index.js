import React, { Component, PropTypes } from 'react';
import {
  InteractionManager,
  NativeModules,
  Text,
  View,
} from 'react-native';
import { Card, CardItem, Container, Content, Spinner } from 'native-base';
import { connect } from 'react-redux';

import styles from './styles.js';


function ActionList(props) {
  if (props.actions.length > 0) {
    return (
      <View>
        {props.actions.map((action, index) =>
          <Card key={index} style={{margin: 15}}>
            <CardItem>
              <Text style={styles.contentText}>{action}</Text>
            </CardItem>
          </Card>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.wait}>
        <Spinner color="blue" />
        <Text style={styles.contentText}>Gathering actions...</Text>
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
      validAction = (action) => !(['.', '..'].includes(action));
      this.setState({actions: result.filter(validAction)})
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
          </View>
          <ActionList actions={actions} />
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
