import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Button, Container, Content, Input, InputGroup } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import styles from './styles';
import { capitalize } from '../../utils';
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

  serverFields() {
    return [
      { name: 'user' },
      { name: 'host' },
      { name: 'password', secure: true },
    ];
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.content}>
            <Text style={styles.title}>New Server</Text>
            <View>
              {this.serverFields().map((field) =>
              <InputGroup key={field.name} style={styles.inputGroup} borderType="regular">
                <Input style={styles.input}
                  placeholder={capitalize(field.name)}
                  onChangeText={value => this.setState({ [field.name]: value })}
                  secureTextEntry={field.secure}/>
              </InputGroup>
              )}
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
