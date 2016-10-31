import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

import store from './store';
import ServerCreator from './components/server-creator';
import ServerList from './components/server-list';
import ServerInspector from './components/server-inspector';


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
