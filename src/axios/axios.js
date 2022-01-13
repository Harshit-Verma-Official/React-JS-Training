import axios from "axios";
import { addAuthToken, fetchData, fetchSuccessfull } from "../redux/actions";
import store from "../redux/store";

const getToken = async (username, password) => {
  let token = await axios.post("http://45.79.126.81:6051/api/v1/auth/login", {
    loginId: username,
    password: password,
  });
  return token.data.data.access_token;
};

export const login = async (username, password) => {
  let token = await getToken(username, password);
  store.dispatch(addAuthToken(token));
};

export const APIGetCities = async (pageSize, pageNo) => {
  store.dispatch(fetchData());

  axios
    .get(
      `http://45.79.126.81:6051/api/v1/cities/?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=modifiedAt&sortDirection=DESC`,
      {
        headers: {
          Authorization: `bearer ${store.getState().authToken}`,
        },
      }
    )
    .then((response) => {
      store.dispatch(fetchSuccessfull(extractData(response.data.data)));
    });
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
