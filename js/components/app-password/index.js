import React, { Alert, Component } from 'react';
import { Container, Content } from 'native-base';
import { Actions, ActionConst } from 'react-native-router-flux';
import Form from '../form';
import { unlockStore } from '../../store';

import { AsyncStorage } from 'react-native';


class AppPassword extends Component {

  attemptToUnlock() {
    unlockStore(
      this.refs.passwordForm.state.password
    ).then(
      this.startApp,
      this.incorrectPassword
    );
  }

  startApp() {
    Actions.listServers({type: ActionConst.RESET});
  }

  incorrectPassword() {
  }

  render() {
    return (
      <Container>
        <Content>
          <Form ref="passwordForm"
            title="Hooks"
            fields={[{name: 'password', secure: true}]}
            submitText={"Unlock"}
            submit={() => this.attemptToUnlock()} />
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default AppPassword;
