
import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  height: screenHeight,
  width: screenWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
  },

  contentText: {
    fontSize: 25,
    color: 'black',
  },
});

export default styles;

