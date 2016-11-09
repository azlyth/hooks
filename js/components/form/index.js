import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { Input, InputGroup } from 'native-base';
import styles from './styles.js';
import { capitalize } from '../../utils';


class Form extends Component {

  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        {this.props.fields.map((field) =>
          <InputGroup key={field.name} style={styles.inputGroup} borderType="regular">
            <Input style={styles.input}
              placeholder={capitalize(field.name)}
              onChangeText={value => this.setState({ [field.name]: value })}
              secureTextEntry={field.secure}/>
          </InputGroup>
        )}
      </View>
    );
  }
}

export default Form;
