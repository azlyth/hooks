import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Card, CardItem, Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import styles from './styles.js';


class ServerList extends Component {

  static propTypes = {
    servers: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    console.log(this.props.servers);
  }

  render() {
    return (
      <Container>
        <Content>
          <Text style={styles.serverText}>Servers</Text>
          {this.props.servers.map((server, index) =>
            <Card key={index} style={styles.serverCard}>
              <CardItem style={styles.serverCardItem}>
                <Text style={styles.serverText}>{server.user}@{server.host}</Text>
              </CardItem>
            </Card>
          )}
          <Card style={styles.serverCard}>
            <CardItem button style={styles.serverCardItem} onPress={Actions.createServer}>
              <Text style={styles.serverText}>+</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    servers: state.servers
  };
}

export default connect(mapStateToProps)(ServerList);
