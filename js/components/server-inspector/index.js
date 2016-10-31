import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import { connect } from 'react-redux';

import styles from './styles.js';


class ServerInspector extends Component {

  static propTypes = {
    server: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={styles.body}>
            <Text style={styles.title}>{this.props.server.user}@{this.props.server.host}</Text>
            <View style={styles.content}>
              <Text>Connecting...</Text>
              <Spinner color="blue" />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(ServerInspector);
