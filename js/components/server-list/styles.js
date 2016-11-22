import {
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  title: {
    margin: 10,
    marginLeft: 25,
    marginRight: 25,
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
  },

  content: {
    flex: 1,
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
    padding: 15,
  },
});

export default styles;
