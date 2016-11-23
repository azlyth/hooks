import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';
import merge from 'lodash/merge';


class BaseText extends Component {

  static propTypes = {
    centered: PropTypes.bool,
  }

  defaultStyle() {
    return {};
  }

  propStyles() {
    propToStyle = {
      centered: {textAlign: 'center'},
    };

    return Object.keys(propToStyle).reduce((memo, key) => {
      if (this.props[key]) {
        memo = {...memo, ...propToStyle[key]};
      }
      return memo;
    }, {});
  }

  defaultProps() {
    return {
      style: {
        ...this.defaultStyle(),
        ...this.propStyles(),
      }
    };
  }

  render() {
    return <Text {...merge({}, this.defaultProps(), this.props)} />;
  }
}

export default BaseText;
