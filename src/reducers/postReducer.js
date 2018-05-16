import * as types from "../actions/actionTypes";

export default function postReducer(state = [], action) {
  switch(action.type) {
    case types.FETCH_POSTS_SUCCESS:
      return action.payload.posts;

    case types.FETCH_POST_SUCCESS:
      let posts = [];
      posts.push(Object.assign({}, state.posts,action.payload.post));
      return posts;
    
    case types.CREATE_POST_SUCCESS: 
      return Object.assign({}, state.posts, action.payload.post);
        
    case types.UPDATED_POST_SUCCESS:
      return [
        ...state.filter(post => post.id !== action.payload.post.id),
        Object.assign({}, action.payload.post)
      ]

    case types.DELETED_POST_SUCCESS:
      return [...state.filter(post => post.id !== action.payload.post.id)]
    default:
      return state;
  }
}