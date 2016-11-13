import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  width: screenWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    margin: 25,
    marginTop: 15,
    fontSize: 35,
    color: 'black',
  },

  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 25,
  },

  button: {
    marginRight: 10,
    marginLeft: 10,
    width: (screenWidth / 2) - 35,
  },

  contentText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
  },

  wait: {
    marginTop: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    marginTop: 25,
    fontSize: 25,
    color: '#d9534f',
  },

  spinner: {
    marginRight: 15,
  },
});

export default styles;

