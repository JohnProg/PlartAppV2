import HttpClient from './../utils/HttpClient';
import * as types from './../constants/actionTypes';

export const getLocations = () => dispatch => (
  HttpClient.get(dispatch, types.FETCH_LOCATIONS, 'locations/')
);
