import React, {Component} from 'react';
import {FaThumbsOUp, FaThumbsODown} from 'react-icons/lib/fa';

class UpAndDownVote extends Component {
  render() {
    return (
      <section>
        <FaThumbsOUp onClick={this.props.upVote}/>
        <FaThumbsODown onClick={this.props.downVote}/>
      </section>
    );
  }
}

export default UpAndDownVote;