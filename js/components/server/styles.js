import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  width: screenWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
  },

  title: {
    fontSize: 35,
    marginBottom: 25,
    color: 'black',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - 50,
    marginBottom: 25,
  },

  button: {
    width: (screenWidth / 3) - 35,
  },

  hookList: {
    flex: 1,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  error: {
    fontSize: 25,
    color: '#d9534f',
  },

  spinner: {
    marginRight: 15,
  },
});

export default styles;

