import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  width:  screenWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
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
});

export default styles;
