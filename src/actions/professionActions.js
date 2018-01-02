import HttpClient from './../utils/HttpClient';
import * as types from './../constants/actionTypes';

export const getProfessions = () => dispatch => (
  HttpClient.get(dispatch, types.FETCH_PROFESSIONS, 'professions/')
);

export const updateChosenProfession = id => ({
  type: types.UPDATE_CHOSEN_PROFESSION,
  id,
});

export const saveSelectedProfessions = data => dispatch => (
  HttpClient.put(data, dispatch, types.SAVE_SELECTED_PROFESSIONS, 'me/step_1/')
);
