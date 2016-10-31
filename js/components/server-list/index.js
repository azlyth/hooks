import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Text,
  View,
} from 'react-native';
import { Card, CardItem, Container, Content, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import styles from './styles.js';


class ServerList extends Component {

  static propTypes = {
    servers: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
          <Text style={styles.title}>Servers</Text>
          {this.props.servers.map((server, index) =>
            <Card key={index} style={styles.serverCard}>
              <CardItem button style={styles.serverCardItem} onPress={() => Actions.inspectServer({server})}>
                <Text style={styles.serverText}>{server.user}@{server.host}</Text>
              </CardItem>
            </Card>
          )}
          <Card style={styles.serverCard}>
            <CardItem button style={styles.serverCardItem} onPress={Actions.createServer}>
              <View>
                <Icon name="md-add" />
              </View>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    servers: state.servers
  };
}

export default connect(mapStateToProps)(ServerList);
