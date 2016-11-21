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
import { removeServer, updateServer } from '../../actions/server';
import Frame from '../frame';
import cancelableCallbacks from '../cancelable-callbacks';
import styles from './styles.js';


const Help = () => {
  let message = [
    "There aren't any hooks on this server.",
    "Add executable files to the directory below to have them listed here:",
    "~/.hooks-app/hooks",
  ].join("\n\n");

  return (
    <View style={{marginTop: 25}}>
      <Text style={ styles.helpText }>{ message }</Text>
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
    updateServer: PropTypes.func,
    cancelOnBack: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {refreshing: true, error: null};
    this.renderHook = this.renderHook.bind(this);
    this.findHooks = this.findHooks.bind(this);
    this.updateSelf = this.updateSelf.bind(this);
    this.removeSelf = this.removeSelf.bind(this);
    this.createRefreshControl = this.createRefreshControl.bind(this);
  }

  componentDidMount() {
    if (this.props.server.hooks.length === 0) {
      InteractionManager.runAfterInteractions(() => this.findHooks());
    } else {
      this.setState({refreshing: false});
    }
  }

  findHooks() {
    this.setState({refreshing: true, error: null});

    // Get the hooks from the server
    command = "find .hooks-app/hooks/ -type f -perm -111 | sed 's/^.hooks-app\\\/hooks\\\///'";
    promise = NativeModules.SSH.execute(this.props.server, command);

    // Attach the callbacks to a promise that will cancel them on a back press
    this.props.cancelOnBack(promise, (result) => {
      // Filter out the valid hooks and save them to the server
      validHook = (hook) => !(['.', '..'].includes(hook));
      validHooks = result.filter(validHook);
      this.props.updateServer({...this.props.server, hooks: validHooks});
      this.setState({refreshing: false});
    }, (error) => {
      this.setState({
        error: 'Error: ' + error.message,
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
    errorExists = this.state.error !== null;
    refreshing = this.state.refreshing;
    hooksExist = this.props.server.hooks.length > 0;

    if (errorExists) {
      return <Error message={this.state.error} />;
    } else if (refreshing || hooksExist) {
      const ds = new ListView.DataSource({rowHasChanged: (x, y) => x !== y});
      return (
        <ListView
          style={styles.hookList}
          refreshControl={this.createRefreshControl()}
          dataSource={ds.cloneWithRows(this.props.server.hooks)}
          renderRow={this.renderHook} />
      );
    } else {
      return <Help />;
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
        <CardItem cardBody style={styles.cardItem} button onPress={() => Actions.executeHook({hook, server: this.props.server})}>
          <Text style={styles.cardText}>{hook}</Text>
        </CardItem>
      </Card>
    );
  }

  render() {
    return (
      <Frame>
        <View style={styles.header}>
          <Text style={styles.title}>{this.props.server.user}@{this.props.server.host}</Text>
          <View style={styles.buttonRow}>
            <Button style={styles.button} onPress={this.updateSelf} large bordered>Edit</Button>
            <Button style={styles.button} onPress={this.findHooks} info large bordered>Refresh</Button>
            <Button style={styles.button} onPress={this.removeSelf} danger large bordered>Remove</Button>
          </View>
        </View>
        <View style={styles.body}>
          {this.renderBody()}
        </View>
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
    removeServer: server => dispatch(removeServer(server)),
    updateServer: server => dispatch(updateServer(server)),
  };
}

export default connect(mapState, mapDispatch)(cancelableCallbacks(Server));
