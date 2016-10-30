import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const {
  height: screenHeight,
} = Dimensions.get('window');

const styles = StyleSheet.create({
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
    borderColor: 'white',
  },
  serverText: {
    textAlign: 'center',
    padding: 15,
    fontSize: 25,
    color: 'black',
  },
});

export default styles;
