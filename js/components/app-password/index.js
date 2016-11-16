import React, { Alert, Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import merge from 'lodash/merge';
import Frame from '../frame';
import Form from '../form';
import { unlockStore, verifyStorePassword } from '../../store';


class AppPassword extends Component {

  constructor(props) {
    super(props);
    this.startApp = this.startApp.bind(this);
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

  render() {
    return (
      <Frame>
        <Form title="Hooks"
          fields={this.passwordField()}
          submitText={"Unlock"}
          submit={this.startApp} />
      </Frame>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default AppPassword;
