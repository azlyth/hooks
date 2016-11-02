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
  },

  title: {
    margin: 30,
    fontSize: 35,
    color: 'black',
  },

  actionCard: {
    margin: 15,
  },

  contentText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
  },

  wait: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;

