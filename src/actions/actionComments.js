import * as types from "./actionTypes";
import * as api from '../api/index';

// ACTIONS
function fetchCommentsSuccess(comments) {
  return {
    type: types.FETCH_COMMENTS_SUCCESS,
    payload: {
      comments
    },
  };
}

function fetchCommentSuccess(comment) {
  return {
    type: types.FETCH_COMMENT_SUCCESS,
    payload: {
      comment
    },
  };
}

function createCommentSuccess(comment) {
  return {
    type: types.CREATE_COMMENT_SUCCESS,
    payload: {
      comment
    },
  };
}

function deleteCommentSuccess(comment) {
  return {
    type: types.DELETE_COMMENT_SUCCESS,
    payload: {
      comment
    },
  };
}

// THUNKS
export function fetchCommentsForPost (postId) {
  return dispatch => {
    api.fetchCommentsForPost(postId).then(resp => {
      dispatch(fetchCommentsSuccess(resp.data))
    }).catch(error => {
      throw(error);
    })
  }
}

export function createCommentsForPost (parentId, params) {
  return dispatch => {
    api.createCommentForPost(parentId, params).then(resp => {
      dispatch(createCommentSuccess(resp.data));
    })
  }
}

export function voteForComment(id, params) {
  return dispatch => {
    api.voteForComment(id, params).then(resp => {
      dispatch(fetchCommentSuccess(resp.data));
    })
  }
}

export function deleteComment(id) {
  return dispatch => {
    api.deleteComment(id).then(resp => {
      dispatch(deleteCommentSuccess(resp.data));
    });
  }
}

export function updateComment(id, params) {
  return dispatch => {
    api.updateComment(id, params).then(resp => {
      dispatch(fetchCommentSuccess(resp.data));
    });
  }
}