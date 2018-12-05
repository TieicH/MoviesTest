import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const initialState = {
  loading: true,
  page: 1,
  totalResults: 0,
  totalPages: 2,
  search: [],
  morePages: true,
  movie: "spiderman",
  category: "movie"
};

export const actionTypes = {
  CHANGE_MOVIE: "CHANGE_MOVIE",
  CHANGE_CATEGORY: "CHANGE_CATEGORY",
  FIRST_CHARGE: "FIRST_CHARGE",
  SET_PAGES: "SET_PAGES",
  SET_RESULTS: "SET_RESULTS",
  NEXT_PAGE: "NEXT_PAGE",
  FILL_MOVIE: "FILL_MOVIE"
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_MOVIE:
      return { ...state, movie: action.payload };
    case actionTypes.CHANGE_CATEGORY:
      return { ...state, category: action.payload };
    case actionTypes.SET_PAGES:
      return { ...state, morePages: action.payload };
    case actionTypes.FIRST_CHARGE:
      return { ...state, search: action.payload };
    case actionTypes.FILL_MOVIE:
      //console.log(action.payload);
      //console.log(state.search);
      return { ...state, search: [...state.search, action.payload] };
    case actionTypes.SET_RESULTS:
      return {
        ...state,
        totalPages: action.payload,
        totalResults: action.result
      };
    case actionTypes.NEXT_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export const nextPaged = page => dispatch => {
  return dispatch({ type: actionTypes.NEXT_PAGE, payload: page });
};

export const changedMovie = texto => dispatch => {
  return dispatch({ type: actionTypes.CHANGE_MOVIE, payload: texto });
};

export const changedCategory = texto => dispatch => {
  return dispatch({ type: actionTypes.CHANGE_CATEGORY, payload: texto });
};

export const firstCharged = data => dispatch => {
  return dispatch({ type: actionTypes.FIRST_CHARGE, payload: data });
};

export const fillMovie = data => dispatch => {
  return dispatch({ type: actionTypes.FILL_MOVIE, payload: data });
};

export const checkMoreMovies = (page, totalPages) => dispatch => {
  if (page == totalPages - 1) {
    return dispatch({ type: actionTypes.SET_PAGES, payload: false });
  } else {
    return dispatch({ type: actionTypes.SET_PAGES, payload: true });
  }
};

export const setTotalResults = (totalPages, totalResults) => dispatch => {
  return dispatch({
    type: actionTypes.SET_RESULTS,
    payload: totalPages,
    result: totalResults
  });
};

export function initializeStore(initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
