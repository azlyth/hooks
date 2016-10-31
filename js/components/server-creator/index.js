import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Button, Container, Content, Input, InputGroup } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import { addServer } from '../../actions/server';


class ServerCreator extends Component {

  static propTypes = {
    addServer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  addServer() {
    this.props.addServer(this.state);
    Actions.pop();
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.content}>
            <Text style={styles.title}>New Server</Text>
            <View>
              <InputGroup style={styles.inputGroup} borderType="regular">
                <Input style={styles.input}
                  placeholder="User"
                  onChangeText={(user) => this.setState({user})} />
              </InputGroup>
              <InputGroup style={styles.inputGroup} borderType="regular">
                <Input
                  style={styles.input}
                  placeholder="Host"
                  onChangeText={(host) => this.setState({host})} />
              </InputGroup>
              <InputGroup style={styles.inputGroup} borderType="regular">
                <Input style={styles.input}
                  placeholder="Password"
                  onChangeText={(password) => this.setState({password})}
                  secureTextEntry />
              </InputGroup>
            </View>
            <Button style={styles.button}
              bordered large block
              onPress={() => this.addServer()}>Save</Button>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    addServer: server => dispatch(addServer(server))
  };
}

export default connect(null, bindActions)(ServerCreator);
