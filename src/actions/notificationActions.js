import HttpClient from './../utils/HttpClient';
import * as types from './../constants/actionTypes';

export const getNotifications = () => dispatch => (
  HttpClient.get(dispatch, types.FETCH_NOTIFICATIONS, 'notifications/')
);
