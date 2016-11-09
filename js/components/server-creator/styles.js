import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  height: screenHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  title: {
    fontSize: 35,
    color: 'black',
  },

  button: {
    margin: 25,
  },
});

export default styles;
