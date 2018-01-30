import HttpClient from './../utils/HttpClient';
import * as types from './../constants/actionTypes';

export const fetchCurrentUser = () => dispatch => (
  HttpClient.get(dispatch, types.FETCH_CURRENT_USER, 'me/')
);

export const savePersonalInfo = data => dispatch => (
  HttpClient.put(data, dispatch, types.SAVE_PERSONAL_INFO, 'me/step_2/')
);

export const updateProfile = data => dispatch => (
  HttpClient.put(data, dispatch, types.UPDATE_PROFILE, 'me/update_profile/')
);

export const setCurrentUser = currentUser => ({
  type: types.SET_CURRENT_USER,
  currentUser,
});

export const updateAvatarProfile = data => dispatch => (
  HttpClient.put(data, dispatch, types.UPDATE_AVATAR_PROFILE, 'me/update_picture/')
);

export const setCurrentAvatarProfile = photoURI => ({
  type: types.SET_CURRENT_AVATAR_PROFILE,
  photoURI,
});


export const updateCoverProfile = data => dispatch => (
  HttpClient.put(data, dispatch, types.UPDATE_COVER_PROFILE, 'me/update_photo_front/')
);

export const setCurrentCoverProfile = coverURI => ({
  type: types.SET_CURRENT_COVER_PROFILE,
  coverURI,
});

export const cleanUser = () => ({
  type: types.CLEAN_USER,
});
