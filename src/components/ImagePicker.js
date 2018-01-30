import { Alert, Platform, PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';

function imagePicker(callBack, options) {
  ImagePicker.showImagePicker(options, (response) => {
    if (callBack) {
      callBack(response);
    }
  });
}

function alertErrorMsg(errMessage) {
  Alert.alert(
    'Error occurs',
    errMessage,
    [
      { text: 'OK', onPress: () => { } },
    ],
    { cancelable: false },
  );
}

async function requestFileCameraPermission(callBack, options) {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ],
      {
        title: 'Camera and External Storage Permission',
        message: 'Cool Photo App needs access to your camera so you can take awesome pictures.',
      },
    );
    const result = Object.keys(granted).filter(permission => (
      granted[permission] !== PermissionsAndroid.RESULTS.GRANTED
    ));
    if (!granted || result.length > 0) {
      this.alertErrorMsg('You cannot upload image');
      return;
    }
    imagePicker(callBack, options);
  } catch (err) {
    alertErrorMsg(err);
  }
}

export default function showImagePicker(options, callBack) {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    requestFileCameraPermission(options, callBack);
  } else {
    imagePicker(options, callBack);
  }
}
