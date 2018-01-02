import { NetInfo } from 'react-native';
import * as types from './../constants/actionTypes';
import rootNavigator from './../app';
import { fetchCurrentUser } from './meActions';
import { verifyToken } from './authActions';

function setupNetStatusListener() {
  return dispatch => {
    NetInfo.isConnected.addEventListener('connectionChange',
      async status => {
        dispatch({ type: types.CHANGE_NET_STATUS, payload: status });
      }
    );
  }
}

export const updateTutorialStatus = () => ({
  type: types.CHANGE_TUTORIAL_STATE,
});

export default function init() {
  return async (dispatch, getState) => {
    try {
      const { tutorialCompleted } = getState().app;
      if (!tutorialCompleted) {
        rootNavigator.startAppWithScreen({ screen: 'plartApp.Tutorial', showDrawer: false });
        return;
      }
      const { token } = getState().auth;
      if (!token) {
        rootNavigator.startAppWithScreen({ screen: 'plartApp.Intro', showDrawer: false });
        return;
      }
      dispatch({ type: types.INITIALIZED, token });

      await dispatch(verifyToken({ token }));
      const { steps } = getState().auth;
      if (!steps.step_1) {
        rootNavigator.startAppWithScreen({ screen: 'plartApp.Professions', showDrawer: false });
        return;
      }

      if (!steps.step_2) {
        rootNavigator.startAppWithScreen({ screen: 'plartApp.PersonalInfo', showDrawer: false });
        return;
      }

      // getting base current user's information
      await dispatch(fetchCurrentUser());
      // go to home
      rootNavigator.startAppWithScreen({ screen: 'plartApp.Login', showDrawer: false });
      dispatch(setupNetStatusListener());
    } catch (error) {
      dispatch({ type: types.INITIALIZED, error: error.message });
      rootNavigator.startAppWithScreen({ screen: 'plartApp.Tutorial' });
    }
  };
}
