import HttpClient from './../utils/HttpClient';
import * as types from './../constants/actionTypes';

export const logIn = data => dispatch => (
  HttpClient.post(data, dispatch, types.LOGIN, 'login/')
);

export const register = data => dispatch => (
  HttpClient.post(data, dispatch, types.REGISTER, 'user/')
);

export const verifyToken = data => dispatch => (
  HttpClient.post(data, dispatch, types.VERFY_TOKEN, 'api-token-verify/')
);

export const logOut = () => dispatch => (
  HttpClient.get(dispatch, types.LOGOUT, 'logout/')
);
