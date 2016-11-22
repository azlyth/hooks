import React, { Alert, Component } from 'react';
import { AsyncStorage, Text } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import Frame from '../frame';
import Form from '../form';
import { unlockStore, verifyStorePassword } from '../../store';
import styles from './styles.js';


class AppPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.startApp = this.startApp.bind(this);
  }

  componentWillMount() {
    this.checkIfFirstTime();
  }

  async checkIfFirstTime() {
    keys = await AsyncStorage.getAllKeys();
    firstTime = keys.length == 0;
    this.setState({firstTime});
  }

  startApp(form) {
    unlockStore(form.password);
    Actions.listServers({type: ActionConst.RESET});
  }

  passwordValidator() {
    return {
      func: async (password) => {
        let message = "Incorrect password."

        if (!Boolean(password))
          return message;

        let passwordCorrect = await verifyStorePassword(password);
        if (!passwordCorrect)
          return message;
      },
      animation: "shake"
    }
  }

  passwordField() {
    return {
      'password': {
        secure: true,
        validators: [this.passwordValidator()],
      }
    };
  }

  renderDescription() {
    passwordDescription = [
      "Enter a password of your choosing. Hooks will use it to encrypt it's data.",
      "Don't worry, Hooks only speaks with servers you tell it to.",
    ].join('\n\n');

    if (this.state.firstTime) {
      return (
        <Text style={styles.passwordDescription}>{passwordDescription}</Text>
      );
    }
  }

  render() {

    return (
      <Frame>
        <Form title="Hooks"
          fields={ this.passwordField() }
          submitText={ "Unlock" }
          submit={ this.startApp } >
          { this.renderDescription() }
        </Form>
      </Frame>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default AppPassword;
