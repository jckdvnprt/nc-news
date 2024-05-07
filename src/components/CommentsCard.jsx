import React from 'react';

function CommentCard({ comment }) {
  return (
    <li>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-info">Author: {comment.author}</p>
      <p className="comment-info">Posted: {comment.created_at}</p>
      <p className="comment-votes">Votes: {comment.votes}</p>
    </li>
  );
}

export default CommentCard;
