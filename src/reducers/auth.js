import * as types from './../constants/actionTypes';
import { setItem } from './../utils/Storage';

const initialState = {
  isFetching: false,
  loggedIn: false,
  token: null,
  errors: {},
  steps: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.INITIALIZED: {
      if (action.token) {
        return {
          ...state,
          loggedIn: true,
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
    case `${types.LOGIN}_REJECTED`:
      return {
        ...state,
        isFetching: false,
      };
    case `${types.LOGIN}_FULFILLED`: {
      const { token } = action.payload.data;
      setItem('token', token);
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
        token,
      };
    }
    case `${types.REGISTER}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${types.REGISTER}_REJECTED`: {
      const errors = action.payload.response ?
        action.payload.response.data : action.payload.message;
      return {
        ...state,
        isFetching: false,
        errors,
      };
    }
    case `${types.REGISTER}_FULFILLED`: {
      const { token } = action.payload.data;
      setItem('token', token);
      return {
        ...state,
        isFetching: false,
        loggedIn: true,
        token,
      };
    }
    case `${types.VERFY_TOKEN}_FULFILLED`:
      return {
        ...state,
        steps: action.payload.data,
      };
    case types.STEP_1_COMPLETED:
      return {
        ...state,
        steps: { ...state.steps, step_1: true },
      };
    case types.STEP_2_COMPLETED:
      return {
        ...state,
        steps: { ...state.steps, step_2: true },
      };
    case types.LOG_OUT: {
      return initialState;
    }
    default:
      return state;
  }
}
