import axios from 'axios';
import _ from 'lodash-uuid';

const API_BASE_URL = 'http://localhost:3001';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token
  }
});

// POSTS
export function fetchPosts() {
  return client.get(`/posts`);
}

export function fetchPostsByCategory(category) {
  return client.get(`${category}/posts`);
}

// POST
export function fetchPost(id) {
  return client.get(`/posts/${id}`);
}

export function createPost(params) {
  let parameters = Object.assign({}, params, {id: _.uuid(), timestamp: Date.now(), voteScore: 0, commentCount: 0});
  return client.post('/posts', parameters);
}

export function editPost(id, params) {
  return client.put(`/posts/${id}`, params);
}

export function voteForPost(id, params) {
  return client.post(`/posts/${id}`, params);
}

export function deletePost(id) {
  return client.delete(`/posts/${id}`)
}

// CATEGORIES
export function fetchCategories() {
  return client.get(`/categories`);
}

// COMMENTS
/**
 * createCommentForPost
 * @description Add a comment to a post.
 * @typedef {Object} params
 * @property {string} body
 * @property {string=} author
 * 
 * @param {params} params
 * @return {object} post
 */
export function createCommentForPost(postId, params) {
  let parameters = Object.assign({}, params, {id: _.uuid(), timestamp: Date.now(), parentId: postId});
  return client.post(`/comments`, parameters);
}

/**
 * fetchCommentsForPost
 * @description Get all the comments for a single post.
 * 
 * @param {string} postId
 * @return {object} comments
 */
export function fetchCommentsForPost(postId) {
  return client.get(`/posts/${postId}/comments`);
}

export function updateComment(id, params) {
  const parameters = Object.assign({}, params, {timestamp: Date.now()});
  return client.put(`/comments/${id}`, parameters);
}

export function voteForComment(id, params) {
  return client.post(`/comments/${id}`, params);
}

export function deleteComment(id) {
  return client.delete(`/comments/${id}`);
}