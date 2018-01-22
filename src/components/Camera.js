import { Alert, Platform, PermissionsAndroid, NativeModules } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const StytemInfo = NativeModules.systemInfo

export const CameraConstant = {
  CAMERA: 1, // 相机
  VIDEO: 2, // 视频
}

export function showImagePicker(callBack, type = 1, customButtons) {
  const mediaType = type === 1 ? 'photo' : 'video'
  if (Platform.OS === 'android') {
    requestCameraPermission(callBack, mediaType, customButtons)
  } else {
    imagePicker(callBack, mediaType, customButtons)
  }
}

function show(errMessage) {
  Alert.alert(
    'Error occurs',
    errMessage,
    [
      { text: 'OK', onPress: () => { } },
    ],
    { cancelable: false },
  );
}

async function requestCameraPermission(callBack, mediaType, customButtons) {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      requestFilePermission(callBack, mediaType, customButtons)
    } else {
      StytemInfo.getAndroidVersion((version) => {
        const v = version.substring(0, 1)
        if (v >= 6) show('请打开相机权限')
        else imagePicker(callBack, mediaType, customButtons)
      })
    }
  } catch (err) {
    show('请打开相机权限')
  }
}

async function requestFilePermission(callBack, mediaType, customButtons) {
  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    imagePicker(callBack, mediaType, customButtons)
  } else {
    StytemInfo.getAndroidVersion((version) => {
      const v = version.substring(0, 1)
      if (v >= 6) show('请打开文件读写权限')
      else imagePicker(callBack, mediaType, customButtons)
    })
  }
}

function imagePicker(callBack, mediaType, customButtons) {
  const options = {
    title: `${mediaType === 'photo' ? '图片' : '视频'}选择`,
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍摄',
    chooseFromLibraryButtonTitle: '相册',
    customButtons,
    mediaType,
    quality: 1,
    maxWidth: 1200,
    maxHeight: 1200,
    videoQuality: 'high',
    durationLimit: 10,
    allowsEditing: true,
    storageOptions: {
      skipBackup: true,
    },
  }
  ImagePicker.showImagePicker(options, (response) => {
    if (callBack) {
      callBack(response)
    }
  })
}