import {
  USER_FILE_REQUEST,
  FETCH_USER_FILE_COMMIT,
  USER_FILE_ERROR,
} from "./types";
import ApiService from "api/ApiService";

export const userFileRequest = (bool) => ({
  type: USER_FILE_REQUEST,
  payload: bool,
});

export const fetchUserFileCommit = (data) => ({
  type: FETCH_USER_FILE_COMMIT,
  payload: data,
  loading: false,
});

export const userFileError = (error) => ({
  type: USER_FILE_ERROR,
  payload: error,
  loading: false,
});

export const fetchUserFile = () => {
  return async function thunk(dispatch) {
    dispatch(userFileRequest(true));
    ApiService.getUserFiles()
      .then((res) => {
        const data = res.result;
        dispatch(fetchUserFileCommit(data));
      })
      .catch((e) => {
        dispatch(userFileError(e.message));
      });
  };
};

export const addUserFile = (file) => {
  return async function thunk(dispatch) {
    dispatch(userFileRequest(true));
    ApiService.addUserFile(file)
      .then((res) => {
        dispatch(userFileRequest(false));
      })
      .catch((e) => {
        dispatch(userFileError(e.message));
      });
  };
};

export const updateUserFile = (id, file) => {
  return async function thunk(dispatch) {
    ApiService.updateUserFile(id, file)
      .then((res) => {})
      .catch((e) => {
        dispatch(userFileError(e.message));
      });
  };
};

export const deleteUserFileById = (id, list) => {
  return async function thunk(dispatch) {
    dispatch(userFileRequest(true));

    ApiService.deleteUserFileById(id)
      .then(() => dispatch(fetchUserFileCommit(list)))
      .catch((e) => {
        dispatch(userFileError(e.message));
      });
  };
};
