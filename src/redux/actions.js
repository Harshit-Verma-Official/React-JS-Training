import axios from "axios";
import { FETCH_DATA, FETCH_FAILED, FETCH_SUCCESSFULL } from "./actionTypes";

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

export const setPageNo = (pageNo) => {
  return function (dispatch, getState) {
    dispatch(fetchData);
    axios
      .post("http://45.79.126.81:6051/api/v1/auth/login", {
        loginId: "cHJhdGVlaw==",
        password: "QWRtaW5AMTIz",
      })
      .then((response) => {
        axios
          .get(
            `http://45.79.126.81:6051/api/v1/cities/?pageNo=${pageNo}&pageSize=${
              getState().pageSize
            }&sortBy=modifiedAt&sortDirection=DESC`,
            {
              headers: {
                Authorization: `bearer ${response.data.data.access_token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);

            dispatch(fetchSuccessfull(extractData(response.data.data)));
          });
      });
  };
};

export const setPageSize = (size) => {
  return function (dispatch) {
    dispatch(fetchData);
    axios
      .post("http://45.79.126.81:6051/api/v1/auth/login", {
        loginId: "cHJhdGVlaw==",
        password: "QWRtaW5AMTIz",
      })
      .then((response) => {
        axios
          .get(
            `http://45.79.126.81:6051/api/v1/cities/?pageNo=0&pageSize=${size}&sortBy=modifiedAt&sortDirection=DESC`,
            {
              headers: {
                Authorization: `bearer ${response.data.data.access_token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);

            dispatch(fetchSuccessfull(extractData(response.data.data)));
          });
      });
  };
};

export const fetchCities = () => {
  return function (dispatch, getState) {
    dispatch(fetchData);
    axios
      .post("http://45.79.126.81:6051/api/v1/auth/login", {
        loginId: "cHJhdGVlaw==",
        password: "QWRtaW5AMTIz",
      })
      .then((response) => {
        axios
          .get(
            `http://45.79.126.81:6051/api/v1/cities/?pageNo=0&pageSize=${
              getState().pageSize
            }&sortBy=modifiedAt&sortDirection=DESC`,
            {
              headers: {
                Authorization: `bearer ${response.data.data.access_token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);

            dispatch(fetchSuccessfull(extractData(response.data.data)));
          });
      });
  };
};

const extractData = (data) => {
  const cities = data.content;
  const totalPages = data.totalPages;
  const pageSize = data.size;
  const pageNo = data.number;
  const isFirst = data.first;
  const isLast = data.last;

  return {
    cities,
    totalPages,
    pageSize,
    pageNo,
    isFirst,
    isLast,
  };
};
