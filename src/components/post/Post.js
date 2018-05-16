import React, {Component} from 'react';
import {FaCommentO, FaHeartO, FaEllipsisH} from 'react-icons/lib/fa'
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Post extends Component {
  state = {
    actionVisable: "none"
  }
  setActionVisable = () => {
    if (this.state.actionVisable === "none") {
      this.setState({actionVisable: ""});
    } else {
      this.setState({actionVisable: "none"});
    }
  }

  render() {
    const {post, onVote, onDelete} = this.props;

    const renderDate = (timestamp) => {
      let date = new Date();
      date.setTime(timestamp);
      return `${date.toLocaleString('en', {day: "numeric"})} ${date.toLocaleString('en', {month: "long"})} ${date.toLocaleString('en', {year: "numeric"})}`;
    }

    

    return (
        <article className={`post post-background-${post.category}`}>
          <Link to={`/${post.category}/${post.id}`} className="post-details-link">
            <header>
              <div className="post-date">{renderDate(post.timestamp)}</div>
              <div className="post-scores">
                <div className="post-score"><span>{post.commentCount}</span><FaCommentO size={14} /></div>
                <div className="post-score"><span>{post.voteScore}</span><FaHeartO size={14} /></div>
              </div>
            </header>
            <div className="spacer">{_.startCase(post.category)}</div>
            <div className="post-body">
              <h2>{post.title}</h2>
              <h3>{post.author}</h3>
              <p>{post.body}</p>
            </div>
          </Link>
          <div className="post-actions-wrapper">
            <span onClick={() => this.setActionVisable()}><FaEllipsisH size={20}/></span>
            <div className="post-actions" style={{"display": this.state.actionVisable}}>
              <div className="post-action-item" onClick={() => onVote(post, true)& this.setActionVisable()}>Upvote</div>
              <div className="post-action-item" onClick={() => onVote(post, false)& this.setActionVisable()}>Downvote</div>
              <span className="post-action-item"><Link to={`/${post.category}/${post.id}?edit=true`}>Edit</Link></span>
              <div className="post-action-item" onClick={() => onDelete(post.id) & this.setActionVisable()}>Delete</div>
            </div>
          </div>
        </article>
        
      );
  }
}

export default Post;