import React, { Component, PropTypes } from 'react';
import {
  InteractionManager,
  NativeModules,
  Text,
  View,
} from 'react-native';
import { Button, Card, CardItem, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { removeServer } from '../../actions/server';
import cancelableCallbacks from '../cancelable-callbacks';
import styles from './styles.js';


function HookList(props) {
  if (props.hooks.length === 0) {
    let message = "\nThere aren't any hooks on this server.\n\n\nAdd executable files to\n\n~/.hooks-app/hooks\n\nand they'll be listed here."
    return (
      <View>
        <Text style={styles.contentText}>{message}</Text>
      </View>
    );
  } else {
    return (
      <View>
        {props.hooks.map((hook, index) =>
          <Card key={index} style={{margin: 15}}>
            <CardItem button onPress={() => Actions.executeHook({hook, server: props.server})}>
              <Text style={styles.contentText}>{hook}</Text>
            </CardItem>
          </Card>
        )}
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
    cancelOnBack: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.findHooks());
  }

  findHooks() {
    // Get the hooks from the server
    command = "find .hooks-app/hooks/ -type f -perm -111 | sed 's/^.hooks-app\\\/hooks\\\///'";
    promise = NativeModules.SSH.execute(this.props.server, command);

    // Attach the callbacks to a promise that will cancel them on a back press
    this.props.cancelOnBack(promise, (result) => {
      validHook = (hook) => !(['.', '..'].includes(hook));
      this.setState({hooks: result.filter(validHook)})
    }, (error) => {
      message = 'Error: ' + error.message;
      console.log(message);
      this.setState({error: message});
    })
  }

  updateSelf() {
    Actions.updateServer({server: this.props.server});
  }

  removeSelf() {
    this.props.removeServer(this.props.server);
    Actions.pop();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if a server still exists. It may not if a remove just happened.
    return Boolean(nextProps.server);
  }

  renderBody() {
    errorExists = this.state.error !== undefined;
    stillConnecting = this.state.hooks === undefined;

    if (errorExists) {
      return (
        <View style={styles.wait}>
          <Text style={styles.error}>{this.state.error}</Text>
        </View>
      );
    } else if (stillConnecting) {
      return (
        <View style={styles.wait}>
          <Spinner style={styles.spinner} color="blue" />
          <Text style={styles.contentText}>Finding hooks...</Text>
        </View>
      );
    } else {
      return <HookList hooks={this.state.hooks} server={this.props.server}/>;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>{this.props.server.user}@{this.props.server.host}</Text>
          <View style={styles.buttonRow}>
            <Button style={styles.button} onPress={() => this.updateSelf()} large bordered>Update</Button>
            <Button style={styles.button} onPress={() => this.removeSelf()} danger large bordered>Remove</Button>
          </View>
        </View>
        {this.renderBody()}
      </View>
    );
  }
}

function mapState(state, ownProps) {
  return {
    server: state.server.list.find(server => server.id == ownProps.server.id)
  };
}

function mapDispatch(dispatch) {
  return {
    removeServer: server => dispatch(removeServer(server))
  };
}

export default connect(mapState, mapDispatch)(cancelableCallbacks(Server));
