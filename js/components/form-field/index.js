import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Input, InputGroup } from 'native-base';
import { capitalize } from '../../utils';
import styles from './styles.js';


Validators = {
  hasValue: (value) => [undefined, null, ''].includes(value) ? 'Fill this out.' : null,
};

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
    this.config = this.generateConfiguration();
  }

  generateConfiguration() {
    let defaultValues = {
      required: true,
      secure: false,
      validators: [],
    };
    config = {...defaultValues, ...this.props};

    // Add a validator if the field is required
    if (config.required) config.validators.push(Validators.hasValue);

    return config;
  }

  onChange(value) {
    this.setState({value});
  }

  validate() {
    allValidate = this.config.validators.every(validator => {
      let errorMessage = validator(this.state.value);
      this.setState({error: errorMessage});
      return !Boolean(errorMessage);
    });

    return allValidate;
  }

  getValue() {
    return this.state.value;
  }

  render() {
    return (
      <View style={styles.fieldContainer}>
        <InputGroup style={styles.inputGroup} borderType="regular">
          <Input style={styles.input}
            placeholder={capitalize(this.config.name)}
            defaultValue={this.config.initialValue}
            onChangeText={this.onChange}
            secureTextEntry={this.config.secure} />
        </InputGroup>
        <Text style={styles.errorText}>{this.state.error || ' '}</Text>
      </View>
    );
  }
}

export default FormField;
