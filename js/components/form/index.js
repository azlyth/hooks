import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'native-base';
import mapValues from 'lodash/mapValues';
import FormField from '../form-field';
import styles from './styles.js';


class Form extends Component {

  static propTypes = {
    title: PropTypes.string,
    initialValues: PropTypes.object,
    fields: PropTypes.object,
    submit: PropTypes.func,
    submitText: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = this.props.initialValues || {};
    this.submit = this.submit.bind(this)
  }

  async validates() {
    validationPromises = Object.values(this.refs).map(async field => await field.validate());
    validationResults = await Promise.all(validationPromises);
    return validationResults.every(x => x);
  }

  values() {
    return mapValues(this.refs, field => field.getValue())
  }

  async submit() {
    if (await this.validates()) {
      this.props.submit(this.values());
    }
  }

  createField(name, config) {
    return <FormField key={name} ref={name} name={name} {...config} />;
  }

  render() {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{this.props.title}</Text>
        <View>
          {Object.entries(this.props.fields).map(pair => this.createField(...pair))}
        </View>
        <Button style={styles.button}
          bordered large block
          onPress={this.submit}>{this.props.submitText || "Save"}</Button>
      </View>
    );
  }
}

export default Form;
