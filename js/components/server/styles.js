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

  card: {
    marginBottom: 25,
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
    marginTop: 10,
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

