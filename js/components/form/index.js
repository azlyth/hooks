import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Button, Input, InputGroup } from 'native-base';
import styles from './styles.js';
import { capitalize } from '../../utils';
import isEqual from 'lodash/isEqual';


class Form extends Component {

  static propTypes = {
    title: PropTypes.string,
    initialState: PropTypes.object,
    fields: PropTypes.object,
    submit: PropTypes.func,
    submitText: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = this.props.initialState || {};
  }

  componentWillReceiveProps(nextProps) {
    // Force an update when the props change
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only update when props change
    return false;
  }

  createField(name, config) {
    return (
      <View key={name} style={styles.fieldContainer}>
        <InputGroup style={styles.inputGroup} borderType="regular">
          <Input style={styles.input}
            placeholder={capitalize(name)}
            defaultValue={this.state[name]}
            onChangeText={value => this.setState({ [name]: value })}
            secureTextEntry={config.secure}/>
        </InputGroup>
        <Text style={styles.errorText}>{config.error || ' '}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{this.props.title}</Text>
        <View>
          {Object.entries(this.props.fields).map(field => this.createField.apply(this, field))}
        </View>
        <Button style={styles.button}
          bordered large block
          onPress={() => this.props.submit()}>{this.props.submitText || "Save"}</Button>
      </View>
    );
  }
}

export default Form;
