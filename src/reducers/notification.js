import * as types from './../constants/actionTypes';

const initialState = {
  isFetching: false,
  isRefreshing: false,
  isLoadingMore: false,
  items: [],
  errors: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case `${types.FETCH_NOTIFICATIONS}_PENDING`:
      return {
        ...state,
        isFetching: true,
        isRefreshing: true,
      };

    case `${types.FETCH_NOTIFICATIONS}_REJECTED`: {
      const errors = !action.payload.response ?
        action.payload.message : action.payload.response.data;
      return {
        ...state,
        isFetching: false,
        isRefreshing: false,
        errors,
      };
    }

    case `${types.FETCH_NOTIFICATIONS}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        isRefreshing: false,
        items: action.payload.data,
      };
    default:
      return state;
  }
}
