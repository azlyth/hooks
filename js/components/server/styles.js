import {
  Dimensions,
  StyleSheet,
} from 'react-native';


const {
  width: screenWidth,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },

  title: {
    fontSize: 35,
    marginBottom: 25,
    color: 'black',
    textAlign: 'center',
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

  body: {
    flex: 1,
    margin: 10,
  },

  helpText: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  },

  card: {
    marginBottom: 25,
  },

  cardItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  cardText: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  },

  wait: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

  error: {
    fontSize: 25,
    color: '#d9534f',  // Same as NativeBase's default error color
  },

  spinner: {
    marginRight: 15,
  },
});

export default styles;

