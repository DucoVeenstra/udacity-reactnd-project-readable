import * as types from "./actionTypes";
import * as api from '../api/index';
import _ from 'lodash';

// ACTIONS
function fetchPostsSuccess(posts) {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    payload: {
      posts
    },
  };
}

function createPostSuccess(post) {
  return {
    type: types.CREATE_POST_SUCCESS,
    payload: {
      post
    },
  };
};

function fetchPostSuccess(post) {
  return {
    type: types.FETCH_POST_SUCCESS,
    payload: {
      post
    },
  };
}

function updatePostSuccess(post) {
  return {
    type: types.UPDATED_POST_SUCCESS,
    payload: {
      post
    },
  };
}

function deletePostSuccess(post) {
  return {
    type: types.DELETED_POST_SUCCESS,
    payload: {
      post
    },
  };
}
// THUNKS
export function fetchPosts() {
  return dispatch => {
      api.fetchPosts().then(resp => {
      dispatch(fetchPostsSuccess(resp.data));
    }).catch(error => {
      throw(error);
    });
  }
}

export function fetchPostsByCategory(category) {
  return function(dispatch) {
    api.fetchPostsByCategory(category).then(resp => {
      dispatch(fetchPostsSuccess(resp.data))
    }).catch(error => {
      throw(error);
    });
  }
}

export function fetchPost(id) {
  return dispatch => {
    return api.fetchPost(id).then(resp => {
      // When Post is deleted the service return a empty object
      if (_.isEmpty(resp.data)) {
        window.location.href = '/404';
      }
      dispatch(fetchPostSuccess(resp.data));
    }).catch(error => {
      
      throw(error);
    });
  }
}

export function createPost(params) {
  return dispatch => {
    return api.createPost(params).then(resp => {
      dispatch(createPostSuccess(resp.data));
    }).catch(error => {
      throw(error);
    });
  }
}

export function voteForPost(id, params = {}) {
  return dispatch => {
    return api.voteForPost(id, params).then(resp => {
      dispatch(updatePostSuccess(resp.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updatePost(id, params = {}) {
  return dispatch => {
    return api.editPost(id, params).then(resp => {
      dispatch(updatePostSuccess(resp.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deletePost(id) {
  return dispatch => {
    api.deletePost(id).then(resp => {
      dispatch(deletePostSuccess(resp.data));
    }).catch(error => {
      throw(error);
    });
  }
}