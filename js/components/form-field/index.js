import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Input, InputGroup } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { capitalize } from '../../utils';
import styles from './styles.js';


Validators = {
  hasValue: {
    func: async (value) => {
      let filledOut = !([undefined, null, ''].includes(value));
      let error = filledOut ? null : 'Fill this out.';
      return error;
    },
  }
};

class FormField extends Component {

  static propTypes = {
    name: PropTypes.string,
    initialValue: PropTypes.string,
    secure: PropTypes.bool,
    validators: PropTypes.arrayOf(PropTypes.shape({
      func: PropTypes.func,
      animation: PropTypes.string,
    })),
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
    if (config.required) config.validators.unshift(Validators.hasValue);

    return config;
  }

  onChange(value) {
    this.setState({value});
  }

  async validate() {
    // Start all the validators
    validatorPromises = await this.config.validators.map(async validator => {
      let error = await validator.func(this.state.value);
      return {...validator, error};
    });

    // Wait for all the results to come back
    validatorResults = await Promise.all(validatorPromises);

    // Show the error of the first validator with an error
    allPassed = validatorResults.every(validator => {
      // Note that the lack of an error will result in resetting the error field
      let errorExists = Boolean(validator.error);
      this.setState({error: validator.error});

      if (errorExists && validator.animation) {
        this.refs.animator[validator.animation](700);
      }

      return !errorExists;
    });

    return allPassed;
  }

  getValue() {
    return this.state.value;
  }

  render() {
    return (
      <View style={styles.fieldContainer}>
        <Animatable.View ref="animator">
          <InputGroup style={styles.inputGroup} borderType="regular">
            <Input style={styles.input}
              placeholder={capitalize(this.config.name)}
              defaultValue={this.config.initialValue}
              onChangeText={this.onChange}
              secureTextEntry={this.config.secure} />
          </InputGroup>
        </Animatable.View>
        <Text style={styles.errorText}>{this.state.error || ' '}</Text>
      </View>
    );
  }
}

export default FormField;
