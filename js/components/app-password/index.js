import React, { Alert, Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import merge from 'lodash/merge';
import Frame from '../frame';
import Form from '../form';
import { unlockStore } from '../../store';


class AppPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {fields: this.passwordField()};
    this.startApp = this.startApp.bind(this);
    this.incorrectPassword = this.incorrectPassword.bind(this);
    this.attemptToUnlock = this.attemptToUnlock.bind(this);
  }

  attemptToUnlock(form) {
    unlockStore(
      form.password
    ).then(
      this.startApp,
      this.incorrectPassword,
    );
  }

  startApp() {
    Actions.listServers({type: ActionConst.RESET});
  }

  incorrectPassword() {
    this.setState(merge(this.state, {
      fields: {
        password: {
          error: 'Incorrect password.'
        }
      }
    }));
  }

  passwordField() {
    return {
      'password': { secure: true }
    };
  }

  render() {
    return (
      <Frame>
        <Form title="Hooks"
          fields={this.state.fields}
          submitText={"Unlock"}
          submit={this.attemptToUnlock} />
      </Frame>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default AppPassword;
