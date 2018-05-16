import * as types from "./actionTypes";
import * as api from '../api/index';

// ACTIONS
function fetchCategoriesSuccess(categories) {
  return {
    type: types.FETCH_CATEGORIES_SUCCESS,
    payload: {
      ...categories
    },
  };
}

// THUNKS
export function fetchCategories() {
  return dispatch => {
    api.fetchCategories().then(resp => {
      dispatch(fetchCategoriesSuccess(Object.assign([], resp.data)));
    }).catch(error => {
      throw(error);
    });
  }
}