import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  width:  screenWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
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
});

export default styles;
