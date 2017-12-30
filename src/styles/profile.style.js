import {
  Dimensions,
  PixelRatio,
  StyleSheet
} from 'react-native';

const screen = Dimensions.get('window');
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'white'
   },
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  headerContent2: {
    flex: 1,
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    left: (screen.width / 2) - 60,
  },
  textTitleDescription: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600",
  },
  userFirstNameLastName: {
    fontSize: 16,
    fontWeight: "400",
    color: "#673AB7",
  },
  userName: {
    fontWeight: "700",
  },
  userAvatar: {
    borderRadius: 60,
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: "#fff"
  },
  shotDetailsRow: {
    flex: 1,
    flexDirection: "row"
  },
  shotCounter: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-between"
  },
  shotCounterText: {
    color: "#333"
  },
  mainSection: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 5,
    paddingBottom: 40
  },
  separator: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: 1 / PixelRatio.get(),
    marginVertical: 10
  },
  iconInput: {
    marginLeft: 10,
    alignSelf: 'center'
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 35
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

module.exports = styles;
