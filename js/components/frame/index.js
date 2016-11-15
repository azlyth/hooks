import React, { Component, PropTypes } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Container } from 'native-base';
import dismissKeyboard from 'react-native-dismiss-keyboard';

class Frame extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props)
  }

  containerStyle() {
    value = (prop, defaultValue) => this.props[prop] === undefined ? defaultValue : this.props[prop];
    return {
      flex: value('flex', 1),
      margin: 15,
    };
  }

  render() {
    return (
      <Container>
        <View style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={this.containerStyle()}>
              {this.props.children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Container>
    );
  }
}

export default Frame;
