import {
  ADD_AUTH_TOKEN,
  FETCH_DATA,
  FETCH_FAILED,
  FETCH_SUCCESSFULL,
} from "./actionTypes";

export const fetchData = () => {
  return {
    type: FETCH_DATA,
  };
};

export const fetchSuccessfull = (payload) => {
  return {
    type: FETCH_SUCCESSFULL,
    payload,
  };
};

export const fetchFailed = (error) => {
  return {
    type: FETCH_FAILED,
    payload: error,
  };
};

export const addAuthToken = (token) => {
  return {
    type: ADD_AUTH_TOKEN,
    payload: token,
  };
};
