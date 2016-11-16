import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Input, InputGroup } from 'native-base';
import { capitalize } from '../../utils';
import styles from './styles.js';


class FormField extends Component {

  static propTypes = {
    name: PropTypes.string,
    initialValue: PropTypes.string,
    secure: PropTypes.bool,
    validators: PropTypes.arrayOf(PropTypes.func),
    required: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  config() {
    let defaultValues = {
      required: true,
      secure: false,
      validators: [],
    };
    return {...defaultValues, ...this.props};
  }

  onChange(value) {
    this.setState({value});
  }

  validate() {
    return this.config().validators.every(validator => {
      result = validator(this.state.value);
      return result;
    });
  }

  getValue() {
    return this.state.value;
  }

  render() {
    let config = this.config();

    return (
      <View style={styles.fieldContainer}>
        <InputGroup style={styles.inputGroup} borderType="regular">
          <Input style={styles.input}
            placeholder={capitalize(config.name)}
            defaultValue={config.initialValue}
            onChangeText={this.onChange}
            secureTextEntry={config.secure} />
        </InputGroup>
        <Text style={styles.errorText}>{this.state.error || ' '}</Text>
      </View>
    );
  }
}

export default FormField;
