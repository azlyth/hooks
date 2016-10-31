import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  height: screenHeight,
  width:  screenWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    height: screenHeight,
  },

  title: {
    marginTop: 30,
    fontSize: 35,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

