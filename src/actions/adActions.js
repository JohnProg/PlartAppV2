import HttpClient from './../utils/HttpClient';
import * as types from './../constants/actionTypes';

export const getMyAdvertisements = () => dispatch => (
  HttpClient.get(dispatch, types.FETCH_ADS, 'advertisement/')
);

export const setCurrentAd = item => ({
  type: types.SET_CURRENT_AD,
  item,
});

export const removeAdById = id => ({
  type: types.REMOVE_AD_BY_ID,
  id,
});


export const applyAd = () => dispatch => (
  HttpClient.get(dispatch, types.FETCH_ADS, 'advertisement/')
);

export const declineAd = () => dispatch => (
  HttpClient.get(dispatch, types.FETCH_ADS, 'advertisement/')
);
