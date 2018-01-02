import * as types from './../constants/actionTypes';

const initialState = {
  isFetching: false,
  isUpdating: false,
  items: [],
  errors: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case `${types.FETCH_PROFESSIONS}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };

    case `${types.FETCH_PROFESSIONS}_REJECTED`: {
      const errors = !action.payload.response ?
        action.payload.message : action.payload.response.data;
      return {
        ...state,
        isFetching: false,
        errors,
      };
    }

    case `${types.FETCH_PROFESSIONS}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        items: action.payload.data,
      };

    case types.UPDATE_CHOSEN_PROFESSION: {
      const items = state.items.slice(0);
      const currentProfession = items.find(profession => profession.id === action.id);
      currentProfession.is_selected = !currentProfession.is_selected;
      return {
        ...state,
        items,
      };
    }
    case `${types.SAVE_SELECTED_PROFESSIONS}_PENDING`:
      return {
        ...state,
        isUpdating: true,
      };
    case `${types.SAVE_SELECTED_PROFESSIONS}_REJECTED`: {
      const errors = !action.payload.response ?
        action.payload.message : action.payload.response.data;
      return {
        ...state,
        isUpdating: false,
        errors,
      };
    }
    case `${types.SAVE_SELECTED_PROFESSIONS}_FULFILLED`:
      return {
        ...state,
        isUpdating: false,
      };
    default:
      return state;
  }
}
