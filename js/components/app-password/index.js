import React, { Alert, Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import Form from '../form';
import { unlockStore } from '../../store';
import merge from 'lodash/merge';

import { AsyncStorage } from 'react-native';


class AppPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {fields: this.passwordField()};
    this.startApp = this.startApp.bind(this);
    this.incorrectPassword = this.incorrectPassword.bind(this);
  }

  attemptToUnlock() {
    unlockStore(
      this.refs.passwordForm.state.password
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
      <Form ref="passwordForm"
        title="Hooks"
        fields={this.state.fields}
        submitText={"Unlock"}
        submit={() => this.attemptToUnlock()} />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default AppPassword;
