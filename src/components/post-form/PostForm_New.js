import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import {createPost} from '../../actions/actionPosts';
import {fetchCategories} from '../../actions/actionCategories';

class PostFormNew extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  state = {
    category: '',
    title: '',
    body: '',
    author: ''
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let message = '';
    let success = true;
    if (_.isEmpty(this.state.category)) {
      message += "Category must be set.\n";
      success = false;
    }
    if (_.isEmpty(this.state.title)) {
      message += "Title must be set.\n";
      success = false;
    }
    if (_.isEmpty(this.state.body)) {
      message += "Body must be set.\n";
      success = false;
    }
    if (_.isEmpty(this.state.author)) {
      message += "Author must be set.\n";
      success = false;
    }
    if (success) {
      this.props.createPost(this.state);
      this.props.history.push('/');
    }
    else {
      this.setState({"error": message});
    }
    
    
    
  }

  render() {
    return (
      <section className="post-new">
        <header><h1>New Post</h1></header>
        <Link to='/' className="button button-back">Back</Link>
        
        <form onSubmit={this.handleSubmit} className="post-new-form">
          <label>
            <strong>Category:</strong>
            <select name="category" onChange={this.handleInputChange} >
              <option value="" hidden>Select a Category</option>
              {this.props.categories.map(category => {
                return <option key={category.name} value={category.name}>{_.startCase(category.name)}</option> 
              })}
            </select>
          </label>

          <label>
            <strong>Title:</strong>
            <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
          </label>

          <label>
            <strong>Body:</strong>
            <textarea name="body" value={this.state.body} onChange={this.handleInputChange} />
          </label>

          <label>
            <strong>Author:</strong>
            <input type="text" name="author" value={this.state.author} onChange={this.handleInputChange} />
          </label>

          <div className="error">{this.state.error}</div>
          <input type="submit" value="Submit" className="button" />
        </form>
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPost, fetchCategories }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostFormNew));