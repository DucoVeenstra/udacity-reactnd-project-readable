import React from 'react';

import PostForm from '../post-form/PostForm';
import PostComments from '../comments/CommentPage';

const PostDetailPage = () => {
  return (
    <section className="post-details">
      <PostForm  view={"view"} />
      <PostComments /> 
    </section>
  );
}

export default PostDetailPage;