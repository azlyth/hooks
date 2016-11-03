
import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  height: screenHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
  },

  contentText: {
    fontSize: 25,
    color: 'black',
  },
});

export default styles;

