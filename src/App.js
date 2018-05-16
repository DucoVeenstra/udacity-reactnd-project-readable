import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import _ from 'lodash';
import {withRouter, Link} from 'react-router-dom';

import PostList from './components/post/PostList';
import CategoryPage from './components/category/CategoryPage';
import {fetchCategories} from './actions/actionCategories';
import {fetchPosts, fetchPostsByCategory, updatePost, deletePost} from './actions/actionPosts';

import './App.css';

class App extends Component {
  state = {
    sortByField: 'timestamp',
    sortingType: 'desc',
  }

  componentDidMount() {
    this.props.fetchCategories();
    if (_.isEmpty(this.props.match.params.category)) {
      this.props.fetchPosts();
    } else {
      this.props.fetchPostsByCategory(this.props.match.params.category);
    }
  }

  sortPosts = (field, sorttype) => {
    this.setState({sortByField: field, sortingType: sorttype});
  }

  onVotePost = (post, upVote) => {
    let score = post.voteScore;
    if (upVote) {
      score++;
      this.props.updatePost(post.id, { voteScore: score });
    } else {
      score--;
    }
    this.props.updatePost(post.id, { voteScore: score });
  }

  onDeletePost = (postId) => {
    this.props.deletePost(postId);
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="header-text">
            <h1>{this.props.match.params.category ? `${_.startCase(this.props.match.params.category)}` : "All Posts"}</h1>
          </div>
        </header>
        <div className="app-content">
          <PostList
            posts={_.orderBy(this.props.posts, [this.state.sortByField],[this.state.sortingType])}
            onVote={this.onVotePost}
            onDelete={this.onDeletePost}
          />
          
          <nav className="side-bar">
            <Link to="/newPost" className="button">Add Post</Link>
            <div>
              <section>
                <h2>Categories</h2>
                <CategoryPage />
                <h2>Sort By</h2>
                
                <div onClick={() => this.sortPosts('timestamp', 'desc')}>New Posts First</div>
                <div onClick={() => this.sortPosts('timestamp', 'asc')}>Old Posts First</div>
                <div onClick={() => this.sortPosts('voteScore', 'desc')}>Highest Score</div>
                <div onClick={() => this.sortPosts('voteScore', 'asc')}>Lowest Score</div>
              </section>
            </div>
            
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories,
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories, fetchPosts, fetchPostsByCategory, updatePost, deletePost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));