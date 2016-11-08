import React, { Component, PropTypes } from 'react';
import {
  InteractionManager,
  NativeModules,
  Text,
  View,
} from 'react-native';
import { Button, Card, CardItem, Container, Content, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { removeServer } from '../../actions/server';
import styles from './styles.js';


function HookList(props) {
  server = props.server;
  if (props.hooks.length > 0) {
    return (
      <View>
        {props.hooks.map((hook, index) =>
          <Card key={index} style={{margin: 15}}>
            <CardItem button onPress={() => Actions.executeHook({hook, server})}>
              <Text style={styles.contentText}>{hook}</Text>
            </CardItem>
          </Card>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.wait}>
        <Spinner style={styles.spinner} color="blue" />
        <Text style={styles.contentText}>Finding hooks...</Text>
      </View>
    );
  }
}

HookList.propTypes = {
  hooks: PropTypes.array,
  server: PropTypes.object,
};


class Server extends Component {

  static propTypes = {
    server: PropTypes.object,
    removeServer: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {hooks: []};
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.findHooks());
  }

  findHooks() {
    command = "ls -a .hooks-app/hooks";

    NativeModules.SSH.execute(this.props.server, command, (result) => {
      validHook = (hook) => !(['.', '..'].includes(hook));
      this.setState({hooks: result.filter(validHook)})
    }, (errorMessage) => {
      console.log(errorMessage);
    });
  }

  removeSelf() {
    this.props.removeServer(this.props.server);
    Actions.pop();
  }

  render() {
    hooks = this.state.hooks;
    server = this.props.server;

    return (
      <Container>
        <Content>
          <View style={styles.body}>
            <Text style={styles.title}>{server.user}@{server.host}</Text>
            <View style={styles.buttonRow}>
              <Button style={styles.button} large bordered>Update</Button>
              <Button style={styles.button} onPress={() => this.removeSelf()}danger large bordered>Remove</Button>
            </View>
          </View>
          <HookList hooks={hooks} server={server}/>
        </Content>
      </Container>
    );
  }
}

function mapStore(state) {
  return {
  };
}

function mapDispatch(dispatch) {
  return {
    removeServer: server => dispatch(removeServer(server))
  };
}

export default connect(mapStore, mapDispatch)(Server);
