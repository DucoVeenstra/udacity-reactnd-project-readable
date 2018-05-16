import React, {Component} from 'react';
import {connect} from 'react-redux';

import PostList from './PostList';
import {fetchPosts} from '../../actions/actionPosts';

import './post.css';

class PostPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    return(
      <PostList
        posts={this.props.posts}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(PostPage);