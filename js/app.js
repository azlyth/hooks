import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import store from './store';
import AppPassword from './components/app-password';
import ServerCreator from './components/server-creator';
import ServerEditor from './components/server-editor';
import ServerList from './components/server-list';
import Server from './components/server';
import Hook from './components/hook';


class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <Router hideNavBar={true}>
          <Scene key="root">
            <Scene key="password" component={AppPassword} title="App Password" initial={true} />
            <Scene key="listServers" component={ServerList} title="Server List" />
            <Scene key="createServer" component={ServerCreator} title="Create Server" />
            <Scene key="updateServer" component={ServerEditor} title="Update Server" />
            <Scene key="useServer" component={Server} title="Use Server" />
            <Scene key="executeHook" component={Hook} title="Execute Hook" />
          </Scene>
        </Router>

      </Provider>
    );
  }
}

export default App;
