import { Dimensions, StyleSheet } from 'react-native';

const AVATAR_SIZE = 80;
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerMenu: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'flex-start',
   backgroundColor: '#673AB7',
   marginTop: height / 6
 },
 avatar: {
   marginBottom: 10,
   borderRadius: AVATAR_SIZE / 2
 },
 sectionSpeakerText: {
   color: 'white',
   fontSize: 24,
   paddingVertical: 5,
   textAlign: 'center',
 },
 sectionTitleText: {
   color: 'white',
   fontSize: 18,
   textAlign: 'center',
   marginBottom: 20
 },
 item: {
   fontSize: 16,
   fontWeight: '300',
   paddingTop: 15
 }
});

module.exports = styles;
