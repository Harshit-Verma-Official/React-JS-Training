import {
  ADD_AUTH_TOKEN,
  FETCH_DATA,
  FETCH_FAILED,
  FETCH_SUCCESSFULL,
} from "./actionTypes";

const initialState = {
  authToken: null,
  loading: true,
  error: "",
  cities: [],
  totalPages: 0,
  pageSize: 5,
  pageNo: 0,
  isFirst: true,
  isLast: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, loading: true };
    case FETCH_SUCCESSFULL:
      return { ...state, loading: false, ...action.payload };
    case FETCH_FAILED:
      return { ...state, loading: false, cities: [], error: action.payload };
    case ADD_AUTH_TOKEN:
      return { ...state, authToken: action.payload };
    default:
      return state;
  }
};

export default reducer;
