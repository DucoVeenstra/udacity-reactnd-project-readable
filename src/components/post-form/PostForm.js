import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import UpAndDownVote from '../UpAndDownVote';
import {voteForPost, deletePost, fetchPost, updatePost} from '../../actions/actionPosts';

class PostForm extends Component {
  componentDidMount() {
    if (this.props.match.params.post_id) {
      this.props.fetchPost(this.props.match.params.post_id);
    }

    if (this.props.location.search === "?edit=true") {
      if (this.state.mode !== "edit"){
        this.setState({mode: 'edit'});
      }
    }
  }

  state = {
    mode: 'view',
    title: '',
    body: '',
    author: '',
    voteScore: 0
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    
    this.setState({
      [name]: value
    });
  }

  handleSave = (post) => {
    let title = this.state.title.length > 0 ? this.state.title : post.title;
    let body = this.state.body.length > 0 ? this.state.body : post.body;
    let author = this.state.author.length > 0 ? this.state.author : post.author;

    this.props.updatePost(post.id, Object.assign({}, {title: title, body: body, author: author}));

    this.setState({mode: 'view'});
  }

  handleEdit = () => {
    this.setState({mode: 'edit'});
  }

  handleDelete = (id) => {
    this.props.deletePost(id);
    this.props.history.push('/');
  }

  upVote = (id) => {
    this.props.voteForPost(id, { "option" : "upVote" });
  }
  
  downVote = (id) => {
    this.props.voteForPost(id, { "option" : "downVote" });
  }

  renderForm = (post) => {
    switch (this.state.mode) {
      case 'edit':
        return (
          <div className="post-form">
            <label>
              <strong>Title:</strong>
              <input type="text" name="title" value={this.state.title.length === 0 ? post.title : this.state.title} onChange={this.handleInputChange} />
            </label>

            <label>
              <strong>Body:</strong>
              <textarea name="body" value={this.state.body.length === 0 ? post.body : this.state.body} onChange={this.handleInputChange} />
            </label>

            <label>
              <strong>Author:</strong>
              <input type="text" name="author" value={this.state.author.length === 0 ? post.author : this.state.author} onChange={this.handleInputChange} />
            </label>

            <div onClick={(e) => this.handleSave(post)} className="button">Save</div>
          </div>
        )
      
      default: 
        return (
          <div className="post-form">
            <label>
              <strong>Author:</strong>
              <div>{post.author}</div>
            </label>

            <label>
              <strong>Title:</strong>
              <div>{post.title}</div>
            </label>

            <label>
              <strong>Body:</strong>
              <div>{post.body}</div>
            </label>

            <label>
              <strong>Score:</strong>
              <div>{post.voteScore}</div>
            </label>

            <UpAndDownVote upVote={() => this.upVote(post.id)} downVote={() => this.downVote(post.id)}/>
            <div onClick={() => this.handleEdit()} className="button">Edit</div>
            <div className="button button-delete" onClick={() => this.handleDelete(post.id)}>Delete</div>
          </div>
        );
    }
  }

  render() {
    if (this.props.posts.length === 0) {
      return null;
    }
    
    return (
      <section>
        <header><h1>Post Details</h1></header>
        <Link to='/' className="button button-back">Back</Link>
        {this.renderForm(this.props.posts[0])}
      </section>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ voteForPost, deletePost, fetchPost, updatePost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostForm));