import {
  USER_FILE_REQUEST,
  FETCH_USER_FILE_COMMIT,
  USER_FILE_ERROR,
} from "../actions/types";

const initialState = {
  userFiles: [],
  loading: false,
  error: null,
};

const userFileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FILE_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_USER_FILE_COMMIT: {
      return {
        ...state,
        loading: action.loading,
        userFiles: action.payload,
      };
    }

    case USER_FILE_ERROR:
      return {
        ...state,
        loading: action.loading,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userFileReducer;
