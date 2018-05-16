import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import {createCommentsForPost, updateComment} from '../../actions/actionComments';

class CommnetFormNew extends Component {
  state = {
    author: '',
    body: '',
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmitNew = (event) => {
    this.props.createCommentsForPost(this.props.parentId, this.state);
    this.setState({author: '', body: ''});
    event.preventDefault();
  }

  handleSubmitEdit = (event) => {
    this.props.updateComment(this.props.comment.id, Object.assign({}, this.state.body.length > 0 ? {body: this.state.body} : {body: this.props.comment.body}));
    this.props.onEditSubmit();
    event.preventDefault();
  }

  render() {
    switch (this.props.view) {
      case 'new':
        return (
          <form onSubmit={this.handleSubmitNew}>
            <label>
              <strong>Body:</strong>
              <textarea name="body" value={this.state.body} onChange={this.handleInputChange} />
            </label>
    
            <label>
              <strong>Author:</strong>
              <input type="text" name="author" value={this.state.author} onChange={this.handleInputChange} />
            </label>

            <input type="submit" value="Add Comment" className="button" />
          </form>
        )
        
        case 'edit':
          return (
            <form onSubmit={this.handleSubmitEdit}>
            <label>
              <strong>Body:</strong>
              <textarea name="body" value={this.state.body.length > 0 ? this.state.body : this.props.comment.body} onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Submit" className="button" />
          </form>
          )
      default:
        break;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createCommentsForPost, updateComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(CommnetFormNew);