import HttpClient from './../utils/HttpClient';
import * as types from './../constants/actionTypes';

export const logIn = data => dispatch => (
  HttpClient.post(data, dispatch, types.LOGIN, 'api-token-auth/')
);

export const register = data => dispatch => (
  HttpClient.post(data, dispatch, types.REGISTER, 'user/')
);

export const verifyToken = data => dispatch => (
  HttpClient.post(data, dispatch, types.VERFY_TOKEN, 'api-token-verify/')
);

export const completeStep1 = () => ({
  type: types.STEP_1_COMPLETED,
});

export const completeStep2 = () => ({
  type: types.STEP_2_COMPLETED,
});

export const logOut = () => ({
  type: types.LOG_OUT,
});
