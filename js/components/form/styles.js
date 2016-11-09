import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  height: screenHeight,
  width:  screenWidth,
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

  inputGroup: {
    margin: 10,
    height: 70,
    width: screenWidth - 50,
  },

  input: {
    textAlign: 'center',
    fontSize: 25,
    height: 60,
  },

  button: {
    margin: 25,
  },
});

export default styles;
