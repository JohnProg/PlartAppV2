import * as types from '../constants/actionTypes';

const initialState = {
  currentUser: {},
  isFetching: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${types.FETCH_CURRENT_USER}_FULFILLED`:
      return {
        ...state,
        currentUser: action.payload.data,
      };
    case `${types.SAVE_PERSONAL_INFO}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${types.SAVE_PERSONAL_INFO}_REJECTED`: {
      const errors = !action.payload.response ?
        action.payload.message : action.payload.response.data;
      return {
        ...state,
        isFetching: false,
        errors,
      };
    }
    case `${types.SAVE_PERSONAL_INFO}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
      };
    default: return state;
  }
}

export default userReducer;
