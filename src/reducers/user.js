import * as types from '../constants/actionTypes';

const initialState = {
  currentUser: undefined,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    default: return state;
  }
}

export default userReducer;
