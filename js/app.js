import React, { Component } from 'react';
import { NativeModules } from 'react-native';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import store from './store';
import ServerCreator from './components/server-creator';
import ServerList from './components/server-list';
import ServerInspector from './components/server-inspector';


function connect(user, host, password) {
  NativeModules.SSH.connect(user, host, password, (result) => {
    console.log('Success!');
    console.log(result);
  }, (errorMessage) => {
    console.log('Error!');
    console.log(errorMessage);
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>

        <Router hideNavBar={true}>
          <Scene key="root">
            <Scene key="listServers" component={ServerList} title="Server List" initial={true} />
            <Scene key="createServer" component={ServerCreator} title="Create Server" />
            <Scene key="inspectServer" component={ServerInspector} title="InspectServer" />
          </Scene>
        </Router>

      </Provider>
    );
  }
}

export default App;
