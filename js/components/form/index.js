import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'native-base';
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

  componentWillReceiveProps(nextProps) {
    // Force an update when the props change
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only update when props change
    return false;
  }

  fields() {
    return Object.keys(this.props.fields);
  }

  validates() {
    fieldValidates = field => this.refs[field].validate();
    return this.fields().every(fieldValidates);
  }

  values() {
    return this.fields().reduce(
      (memo, field) => { return {...memo, [field]: this.refs[field].getValue()} },
      {}
    )
  }

  submit() {
    if (this.validates()) {
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
