import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';
import {FaEdit, FaClose} from 'react-icons/lib/fa';

import CommentForm from './CommentForm';
import UpAndDownVote from '../UpAndDownVote';
import {fetchCommentsForPost, deleteComment, voteForComment} from '../../actions/actionComments';

import './comment.css';

class CommentPage extends Component {
  componentDidMount() {
    if (this.props.match.params.post_id) {
      this.props.fetchCommentsForPost(this.props.match.params.post_id);
    }
  }

  state = {
    editComment: []
  }

  renderDate = (timestamp) => {
    let date = new Date();
    date.setTime(timestamp);
    return `${date.toLocaleString('en', {day: "numeric"})} ${date.toLocaleString('en', {month: "long"})} ${date.toLocaleString('en', {year: "numeric"})}`;
  }

  upVote = (id) => {
    this.props.voteForComment(id, { "option" : "upVote" });
  }
  
  downVote = (id) => {
    this.props.voteForComment(id, { "option" : "downVote" });
  }

  onRemoveComment = (id) => {
    this.props.deleteComment(id);
  }

  editComment = (id) => {
    this.setState({editComment: [...this.state.editComment, ...Object.assign(this.props.comments.filter(c => c.id === id))]});
  }

  editRemoveComment = (id) => {
    this.setState({editComment: [this.props.comments.filter(c => c.id !== id)]});
  }

  renderCommentItem = (i, index) => {
    let editComment = this.state.editComment.filter(c => c.id === i.id);

    if(editComment.length > 0) {
      return (
        <li key={index}>
           <div className="comment">
            <header>
              <strong className="comment-author">{i.author}</strong>
              <div className="comment-date">{this.renderDate(i.timestamp)}</div>
            </header>
            <CommentForm parentId={this.props.match.params.post_id} view={"edit"} comment={i} onEditSubmit={() => this.editRemoveComment(i.id)} />
          </div>
        </li>
      )
    } else {
      return (
        <li key={index}>
          <div className="comment">
            <header>
              <strong className="comment-author">{i.author}</strong>
              <div className="comment-date">{this.renderDate(i.timestamp)}</div>
            </header>
            <div className="comment-body">{i.body}</div>
            <div className="comment-footer">
              <span className={i.voteScore < 0 ? "comment-score comment-score-negative" : "comment-score"}>{i.voteScore}</span>
              <UpAndDownVote upVote={() => this.upVote(i.id)} 
                    downVote={() => this.downVote(i.id)} />
            </div>
          </div>
          <div className="comments-actions">
            <FaEdit onClick={() => this.editComment(i.id)} />
            <FaClose onClick={() => this.onRemoveComment(i.id) } />
          </div>
        </li>
      );
    }
  }

  render() {
    return (
      <section>
        <h2>Comments ({this.props.comments.length})</h2>

        <CommentForm parentId={this.props.match.params.post_id} view={"new"} />
        <ul className="comment-list">
          {_.orderBy(this.props.comments, ["timestamp"],["desc"]).map(this.renderCommentItem)}
        </ul>
      </section>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCommentsForPost, deleteComment, voteForComment }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentPage));