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
    margin: 30,
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
    width: (screenWidth / 2) - 25,
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
    marginTop: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  spinner: {
    marginRight: 15,
  },
});

export default styles;

