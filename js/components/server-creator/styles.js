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
    fontSize: 40,
    color: 'black',
  },
  input: {
    textAlign: "center",
    fontSize: 30,
    width: screenWidth - 50,
    marginLeft: 25,
    marginRight: 25,
  },
  button: {
    margin: 25,
  },
});

export default styles;
