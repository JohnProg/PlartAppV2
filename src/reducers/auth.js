import * as types from './../constants/actionTypes';

const initialState = {
  isFetching: false,
  loginedIn: false,
  token: null,
  currentUser: null,
  errors: {},
  steps: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.INITIALIZED: {
      if (action.token) {
        return {
          ...state,
          loginedIn: true,
          token: action.token,
        };
      }
      return {
        ...state,
        errors: action.error,
      };
    }
    case `${types.LOGIN}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${types.LOGIN}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        loginedIn: true,
        token: action.payload.data.token,
      };
    case `${types.REGISTER}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${types.REGISTER}_REJECTED`: {
      const errors = !action.payload.response ?
        action.payload.message : action.payload.response.data;
      return {
        ...state,
        isFetching: false,
        errors,
      };
    }
    case `${types.REGISTER}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        loginedIn: true,
        token: action.payload.data.token,
      };

    case `${types.VERFY_TOKEN}_FULFILLED`:
      return {
        ...state,
        steps: action.payload.data,
      };

    case types.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}
