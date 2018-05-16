import * as types from "../actions/actionTypes";

export default function categoryReducer(state = [], action) {
  switch(action.type) {
    case types.FETCH_CATEGORIES_SUCCESS:
      return action.payload.categories;

    default:
      return state;
  }
}