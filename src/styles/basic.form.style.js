import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    backgroundColor: '#673AB7',
  },
  container: {
    flex:1, 
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#673AB7',
  },
  textField: {
   height: 40,
   padding: 4,
   paddingLeft: 10,
   marginBottom: 10,
   borderWidth: 0.5,
   borderColor: '#fff',
   backgroundColor: '#fff',
   borderRadius: 4,
   fontSize: 13,
 }
});

module.exports = styles;
