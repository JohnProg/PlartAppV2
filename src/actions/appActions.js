import { NetInfo } from 'react-native';
import axios from 'axios';
import * as types from './../constants/actionTypes';
import rootNavigator from './../app';
import { fetchCurrentUser } from './meActions';
import { verifyToken } from './authActions';
import { getItem } from './../utils/Storage';

function setupNetStatusListener() {
  return dispatch => (
    NetInfo.isConnected.addEventListener('connectionChange', async (status) => {
      dispatch({ type: types.CHANGE_NET_STATUS, payload: status });

      // Call actions queues to sync with server
      if (status) {
        // dispatch(verifyToken({ token }));
      }
    })
  );
}

const setupAxiosByToken = () => {
  axios.interceptors.request.use(
    async (request) => {
      const token = await getItem('token');
      request.headers.Authorization = `JWT ${token}`;
      return request;
    },
    error => error,
  );
};

export const updateTutorialStatus = () => ({
  type: types.CHANGE_TUTORIAL_STATE,
});

export default function storeLoaded() {
  return async (dispatch, getState) => {
    try {
      dispatch(setupNetStatusListener());
      setupAxiosByToken();
      const { hasInternet, tutorialCompleted } = getState().app;
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

      if (hasInternet) {
        await dispatch(verifyToken({ token }));
      }

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
      rootNavigator.startPrivateApp();
    } catch (error) {
      dispatch({ type: types.INITIALIZED, error: error.message });
      rootNavigator.startAppWithScreen({ screen: 'plartApp.Login' });
    }
  };
}
