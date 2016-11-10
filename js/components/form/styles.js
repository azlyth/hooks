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

  fieldContainer: {
    marginTop: 20,
  },

  inputGroup: {
    height: 70,
    width: screenWidth - 50,
  },

  input: {
    textAlign: 'center',
    fontSize: 25,
    height: 60,
  },

  errorText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#d9534f',
  },

  button: {
    margin: 25,
  },
});

export default styles;
