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
    this.state = {};
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
      this.setState({error: errorMessage});
    });
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
      <Container>
        <Content>
          <View style={styles.body}>
            <Text style={styles.title}>{this.props.server.user}@{this.props.server.host}</Text>
            <View style={styles.buttonRow}>
              <Button style={styles.button} onPress={() => this.updateSelf()} large bordered>Update</Button>
              <Button style={styles.button} onPress={() => this.removeSelf()} danger large bordered>Remove</Button>
            </View>
          </View>
          {this.renderBody()}
        </Content>
      </Container>
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

export default connect(mapState, mapDispatch)(Server);
