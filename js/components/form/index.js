import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Button, Input, InputGroup } from 'native-base';
import styles from './styles.js';
import { capitalize } from '../../utils';


class Form extends Component {

  static propTypes = {
    title: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.object),
    submit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{this.props.title}</Text>
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
        <Button style={styles.button}
          bordered large block
          onPress={() => this.props.submit()}>Save</Button>
      </View>
    );
  }
}

export default Form;
