import React, { Component } from 'react';
import { BackAndroid } from 'react-native';
import { cancelable } from '../../utils';

cancelableCallbacks = (WrappedComponent) => {
  return class CancelableCallbackComponent extends Component {

    constructor(props) {
      super(props);
      this.cancelOnBack = this.cancelOnBack.bind(this);
      this.backHandlers = [];
    }

    componentWillUnmount() {
      // Cancel all the callbacks and remove Back handlers
      this.backHandlers.map(handler => {
        handler();
        BackAndroid.removeEventListener('hardwareBackPress', handler);
      });
    }

    cancelOnBack(promise, success, error) {
      // Make the cancelable callbacks and the Back button handler
      [{ success, error }, cancelAll ] = cancelable({ success, error });
      backHandler = () => {
        cancelAll();
        return false;
      };
      this.backHandlers.push(backHandler);

      // Attach the handler to the event listener
      BackAndroid.addEventListener('hardwareBackPress', backHandler);

      // Attach the callbacks to the promise
      promise.then(success.func, error.func);
      console.log("Attached to promise!");
    }

    render() {
      const newProps = { cancelOnBack: this.cancelOnBack };
      return <WrappedComponent {...this.props} {...newProps} />;
    }

  }
};

export default cancelableCallbacks;
