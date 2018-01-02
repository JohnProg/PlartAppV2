import defaultImage from './../img/background.jpg';

export default {
  getListOfPropertyByProperty(list, propertyToReturn, propertyToFind) {
    const listToReturn = [];
    const listSize = list.length;
    let index = 0;

    for (index; index < listSize; index += 1) {
      const item = list[index];

      if (item[propertyToFind]) {
        listToReturn.push(item[propertyToReturn]);
      }
    }

    return listToReturn;
  },
  formatError(errorObj) {
    let keys = '';
    if (errorObj.message === 'Unexpected token < in JSON at position 0') {
      return 'Ocurrió un error en el servidor, inténtalo de nuevo.';
    }
    for (let key in errorObj) {
      const errors = errorObj[key];
      for (let error in errors) {
        keys += (`${key} : ${errors[error]} \n`);
      }
    }
    return keys;
  },
  getDefaultImagePicker: {
    title: 'Cambiar foto de portada',
    sizeTitle: 16,
    mediaType: 'photo',
    takePhotoButtonTitle: 'Hacer foto...',
    chooseFromLibraryButtonTitle: 'Seleccionar foto...',
    cancelButtonTitle: 'Cancelar',
    storageOptions: {
      skipBackup: true,
      path: 'avatar',
    },
    allowsEditing: true,
    customButtons: [
      { name: 'fb', title: 'Eliminar foto', color: 'red' },
    ],
  },
  getFormats: {
    date: 'YYYY-MM-DD',
    datetime: 'YYYY-MM-DD HH:mm',
    time: 'HH:mm',
  },
  setImageByDefault(data, attribute = '') {
    return data[attribute] ? { uri: data[attribute] } : defaultImage;
  },
};
