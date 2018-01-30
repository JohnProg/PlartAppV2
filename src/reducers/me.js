import * as types from './../constants/actionTypes';
import { genderOptions } from './../constants';

const initialState = {
  currentUser: {},
  isFetching: false,
  isUploadingCover: false,
  isUploadingAvatar: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    // Personal data
    case `${types.FETCH_CURRENT_USER}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${types.FETCH_CURRENT_USER}_REJECTED`: {
      const errors = action.payload.response ?
        action.payload.response.data : action.payload.message;
      return {
        ...state,
        isFetching: false,
        errors,
      };
    }
    case `${types.FETCH_CURRENT_USER}_FULFILLED`: {
      const gender = genderOptions.find(item => item.label === action.payload.data.gender);
      return {
        ...state,
        isFetching: false,
        currentUser: { ...action.payload.data, gender },
      };
    }
    case `${types.SAVE_PERSONAL_INFO}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${types.SAVE_PERSONAL_INFO}_REJECTED`: {
      const errors = action.payload.response ?
        action.payload.response.data : action.payload.message;
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
    // Cover profile
    case `${types.UPDATE_COVER_PROFILE}_PENDING`:
      return {
        ...state,
        isUploadingCover: true,
      };
    case `${types.UPDATE_COVER_PROFILE}_REJECTED`: {
      const errors = action.payload.response ?
        action.payload.response.data : action.payload.message;
      return {
        ...state,
        isUploadingCover: false,
        errors,
      };
    }
    case `${types.UPDATE_COVER_PROFILE}_FULFILLED`:
      return {
        ...state,
        isUploadingCover: false,
      };

    case types.SET_CURRENT_COVER_PROFILE:
      return {
        ...state,
        currentUser: { ...state.currentUser, photo_front: action.coverURI },
      };
    // Avatar profile
    case `${types.UPDATE_AVATAR_PROFILE}_PENDING`:
      return {
        ...state,
        isUploadingAvatar: true,
      };
    case `${types.UPDATE_AVATAR_PROFILE}_REJECTED`: {
      const errors = action.payload.response ?
        action.payload.response.data : action.payload.message;
      return {
        ...state,
        isUploadingAvatar: false,
        errors,
      };
    }
    case `${types.UPDATE_AVATAR_PROFILE}_FULFILLED`:
      return {
        ...state,
        isUploadingAvatar: false,
      };
    case types.SET_CURRENT_AVATAR_PROFILE:
      return {
        ...state,
        currentUser: { ...state.currentUser, photo: action.photoURI },
      };
    // Profile Data
    case `${types.UPDATE_PROFILE}_PENDING`:
      return {
        ...state,
        isFetching: true,
      };
    case `${types.UPDATE_PROFILE}_REJECTED`: {
      const errors = action.payload.response ?
        action.payload.response.data : action.payload.message;
      return {
        ...state,
        isFetching: false,
        errors,
      };
    }
    case `${types.UPDATE_PROFILE}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.currentUser },
      };
    case types.CLEAN_USER: {
      return initialState;
    }
    default: return state;
  }
}

export default userReducer;
