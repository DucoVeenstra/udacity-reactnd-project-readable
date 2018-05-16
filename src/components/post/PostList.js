import React from 'react';
import Post from './Post';

import './post.css';

const PostList = props => {
  return (
    <section className="post-wrapper">
      {props.posts.map((post, index) => {
        return (
        <Post 
          key={index}
          post={post}
          onVote={props.onVote}
          onDelete={props.onDelete} />
        )
      })}
    </section>
  )
}

export default PostList;