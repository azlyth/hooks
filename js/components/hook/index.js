import React, { Component, PropTypes } from 'react';
import { InteractionManager, NativeModules, Text, View } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import { connect } from 'react-redux';
import cancelableCallbacks from '../cancelable-callbacks';
import styles from './styles.js';


function Result(props) {
  if (props.result == null) {
    return (
      <View style={styles.wait}>
        <Text style={styles.contentText}>Running "{props.hook}"...</Text>
        <Spinner color="blue" />
      </View>
    );
  } else {
    return (
      <View>
        {props.result.map((line, index) =>
          <Text key={index} style={styles.contentText}>{line}</Text>
        )}
      </View>
    );
  }
}

Result.propTypes = {
  hook: PropTypes.string,
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
    this.state = { result: null };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.executeHook());
  }

  executeHook() {
    command = 'bash .hooks-app/hooks/' + this.props.hook;

    promise = NativeModules.SSH.execute(this.props.server, command)
    this.props.cancelOnBack(promise, (result) => {
      this.setState({result})
    }, (error) => {
      console.log(error.message);
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.body}>
            <Result hook={this.props.hook} result={this.state.result} />
          </View>
        </Content>
      </Container>
    );
  }
}

function mapState(state) {
  return {};
}

export default connect(mapState)(cancelableCallbacks(Hook));
