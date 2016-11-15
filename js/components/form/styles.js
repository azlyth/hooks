import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  width:  screenWidth,
  height:  screenHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
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
    marginLeft: 25,
    marginRight: 25,
  },
});

export default styles;
