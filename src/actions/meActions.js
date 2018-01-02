import HttpClient from './../utils/HttpClient';
import * as types from './../constants/actionTypes';

export const fetchCurrentUser = () => dispatch => (
  HttpClient.get(dispatch, types.FETCH_CURRENT_USER, 'me/')
);

export const updateCurrentUser = data => dispatch => (
  HttpClient.post(data, dispatch, types.UPDATE_CURRENT_USER, 'me/')
);

export const savePersonalInfo = data => dispatch => (
  HttpClient.put(data, dispatch, types.SAVE_PERSONAL_INFO, 'me/step_2/')
);