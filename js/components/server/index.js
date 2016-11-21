import React, { Component, PropTypes } from 'react';
import {
  InteractionManager,
  ListView,
  NativeModules,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { Button, Card, CardItem, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { removeServer } from '../../actions/server';
import Frame from '../frame';
import cancelableCallbacks from '../cancelable-callbacks';
import styles from './styles.js';


const Wait = () => {
  return (
    <View style={styles.wait}>
      <Spinner style={styles.spinner} color="blue" />
      <Text style={styles.contentText}>Finding hooks...</Text>
    </View>
  );
}

const Help = () => {
  let message = [
    "There aren't any hooks on this server.",
    "Add executable files to the directory below to have them listed here:",
    "~/.hooks-app/hooks",
  ].join("\n\n");

  return (
    <View style={{marginTop: 25}}>
      <Text style={ styles.contentText }>{ message }</Text>
    </View>
  );
}

const Error = (props) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.error}>{props.message}</Text>
    </View>
  );
};

Error.propTypes = {
  message: PropTypes.string,
}


class Server extends Component {

  static propTypes = {
    server: PropTypes.object,
    removeServer: PropTypes.func,
    cancelOnBack: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {refreshing: false};
    this.renderHook = this.renderHook.bind(this);
    this.findHooks = this.findHooks.bind(this);
    this.createRefreshControl = this.createRefreshControl.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.findHooks());
  }

  findHooks() {
    this.setState({refreshing: true});

    // Get the hooks from the server
    command = "find .hooks-app/hooks/ -type f -perm -111 | sed 's/^.hooks-app\\\/hooks\\\///'";
    promise = NativeModules.SSH.execute(this.props.server, command);

    // Attach the callbacks to a promise that will cancel them on a back press
    this.props.cancelOnBack(promise, (result) => {
      validHook = (hook) => !(['.', '..'].includes(hook));
      this.setState({
        hooks: result.filter(validHook),
        refreshing: false,
      })
    }, (error) => {
      message = 'Error: ' + error.message;
      console.log(message);
      this.setState({
        error: message,
        refreshing: false,
      });
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
    noHooksOnServer = this.state.hooks && this.state.hooks.length == 0;

    if (errorExists) {
      return <Error message={this.state.error} />;
    } else if (stillConnecting) {
      return <Wait />;
    } else if (noHooksOnServer) {
      return <Help />;
    } else {
      const ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
      return (
        <ListView
          style={styles.hookList}
          refreshControl={this.createRefreshControl()}
          dataSource={ds.cloneWithRows(this.state.hooks)}
          renderRow={this.renderHook} />
      );
    }
  }

  createRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.findHooks} />
    );
  }

  renderHook(hook) {
    return (
      <Card style={styles.card}>
        <CardItem button onPress={() => Actions.executeHook({hook, server: this.props.server})}>
          <Text style={styles.contentText}>{hook}</Text>
        </CardItem>
      </Card>
    );
  }

  render() {
    return (
      <Frame>
        <View style={styles.body}>
          <Text style={styles.title}>{this.props.server.user}@{this.props.server.host}</Text>
          <View style={styles.buttonRow}>
            <Button style={styles.button} onPress={() => this.updateSelf()} large bordered>Update</Button>
            <Button style={styles.button} onPress={() => this.removeSelf()} danger large bordered>Remove</Button>
          </View>
        </View>
        {this.renderBody()}
      </Frame>
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
