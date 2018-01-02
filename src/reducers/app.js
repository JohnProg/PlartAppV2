import * as types from './../constants/actionTypes';

const initialState = {
  online: false,
  appState: null,
  tutorialCompleted: false,
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_NET_STATUS:
      return { ...state, online: action.payload };
    case types.CHANGE_APP_STATE:
      return { ...state, appState: action.payload };
    case types.CHANGE_TUTORIAL_STATE:
      return { ...state, tutorialCompleted: true };
    default:
      return state;
  }
}
