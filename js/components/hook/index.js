import React, { Component, PropTypes } from 'react';
import { InteractionManager, NativeModules, Text, View } from 'react-native';
import { Spinner } from 'native-base';
import cancelableCallbacks from '../cancelable-callbacks';
import Frame from '../frame';
import ContentText from '../content-text';
import styles from './styles.js';


function Result(props) {
  return (
    <View>
      {props.result.map((line, index) =>
        <ContentText key={index}>{line}</ContentText>
      )}
    </View>
  );
}

Result.propTypes = {
  result: PropTypes.array,
};


class Hook extends Component {

  static propTypes = {
    hook: PropTypes.string,
    server: PropTypes.object,
    cancelOnBack: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.executeHook());
  }

  executeHook() {
    command = '.hooks-app/hooks/' + this.props.hook;

    promise = NativeModules.SSH.execute(this.props.server, command)
    this.props.cancelOnBack(promise, (result) => {
      this.setState({result})
    }, (error) => {
      let message = 'Error: ' + error.message;
      this.setState({error: message})
    });
  }

  renderBody() {
    errorExists = this.state.error !== undefined;
    stillRunning = this.state.result === undefined;

    if (errorExists) {
      return (
        <View>
          <ContentText style={styles.error}>{this.state.error}</ContentText>
        </View>
      );
    } else if (stillRunning) {
      return (
        <View>
          <ContentText centered>Running "{this.props.hook}"...</ContentText>
          <Spinner color="blue" />
        </View>
      );
    } else {
      return (
        <Result hook={this.props.hook} result={this.state.result} />
      );
    }
  }

  render() {
    return (
      <Frame>
        <View style={styles.body}>
          {this.renderBody()}
        </View>
      </Frame>
    );
  }
}

export default cancelableCallbacks(Hook);
