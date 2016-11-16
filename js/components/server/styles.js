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
    fontSize: 35,
    marginBottom: 25,
    color: 'black',
  },

  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - 50,
    marginBottom: 25,
  },

  button: {
    width: (screenWidth / 2) - 35,
  },

  card: {
    margin: 10,
    marginBottom: 15,
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

