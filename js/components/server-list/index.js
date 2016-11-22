import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Card, CardItem, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Frame from '../frame';
import ContentText from '../content-text';
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
      <Frame flex={0}>
        <Text style={styles.title}>Servers</Text>
        {this.props.servers.map((server, index) =>
          <Card key={index} style={styles.serverCard}>
            <CardItem button style={styles.serverCardItem} onPress={() => Actions.useServer({server})}>
              <ContentText centered style={styles.serverText}>{server.user}@{server.host}</ContentText>
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
      </Frame>
    );
  }
}

function mapState(state) {
  return {
    servers: state.server.list,
  };
}

export default connect(mapState)(ServerList);
