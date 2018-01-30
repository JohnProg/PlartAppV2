import * as types from './../constants/actionTypes';

const initialState = {
  isFetching: false,
  isFetchingMyAds: false,
  isRefreshing: false,
  isLoadingMore: false,
  isCreating: false,
  items: [],
  myItems: [],
  item: {},
  errors: {},
  count: 0,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case `${types.FETCH_ADS}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };

    case `${types.FETCH_ADS}_REJECTED`: {
      const errors = action.payload.response ?
        action.payload.response.data : action.payload.message;
      return {
        ...state,
        isFetching: false,
        errors,
      };
    }

    case `${types.FETCH_ADS}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        items: action.payload.data.results,
        count: action.payload.data.count,
      };

    case `${types.FETCH_MY_ADS}_PENDING`:
      return {
        ...state,
        isFetchingMyAds: true,
        isRefreshing: true,
      };

    case `${types.FETCH_MY_ADS}_REJECTED`: {
      const errors = action.payload.response ?
        action.payload.response.data : action.payload.message;
      return {
        ...state,
        isFetchingMyAds: false,
        isRefreshing: false,
        errors,
      };
    }
    case `${types.FETCH_MY_ADS}_FULFILLED`:
      return {
        ...state,
        isFetchingMyAds: false,
        isRefreshing: false,
        myItems: action.payload.data,
        count: action.payload.data.count,
      };
    case types.SET_CURRENT_AD:
      return {
        ...state,
        item: action.item,
      };

    case `${types.CREATE_AD}_PENDING`:
      return {
        ...state,
        isCreating: true,
      };

    case `${types.CREATE_AD}_REJECTED`: {
      const errors = action.payload.response ?
        action.payload.response.data : action.payload.message;
      return {
        ...state,
        isCreating: false,
        errors,
      };
    }
    case `${types.CREATE_AD}_FULFILLED`:
      return {
        ...state,
        isCreating: false,
      };

    case types.REMOVE_AD_BY_ID:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };
    default:
      return state;
  }
}
