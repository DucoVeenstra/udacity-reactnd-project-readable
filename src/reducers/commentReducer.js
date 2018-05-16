import * as types from "../actions/actionTypes";

const initialState = {
  comments:[]
}

export default function categoryReducer(state = initialState, action) {
  switch(action.type) {
    case types.FETCH_COMMENTS_SUCCESS:
      return action.payload.comments;

    case types.FETCH_COMMENT_SUCCESS:
      return [...state.filter(comment => comment.id !== action.payload.comment.id), Object.assign({}, action.payload.comment)];
    
    case types.CREATE_COMMENT_SUCCESS:
      const comments = [];
      comments.push(Object.assign({}, action.payload.comment));
      return [...state, ...comments];

    case types.DELETE_COMMENT_SUCCESS:
      return [...state.filter(comment => comment.id !== action.payload.comment.id)];

    default:
      return state;
  }
}