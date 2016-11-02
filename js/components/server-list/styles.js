import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const {
  height: screenHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    margin: 30,
    fontSize: 35,
    color: 'black',
  },

  content: {
    flex: 1,
    height: screenHeight,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  serverCard: {
    margin: 15,
  },

  serverCardItem: {
    flex: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  serverText: {
    textAlign: 'center',
    padding: 15,
    fontSize: 25,
    color: 'black',
  },
});

export default styles;
