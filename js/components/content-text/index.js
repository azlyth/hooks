import React, { Component } from 'react';
import BaseText from '../base-text';
import merge from 'lodash/merge';


class ContentText extends Component {

  defaultProps() {
    return {
      style: {
        fontSize: 25,
        color: 'black',
      }
    };
  }

  render() {
    return <BaseText {...merge({}, this.defaultProps(), this.props)} />;
  }

}

export default ContentText;
