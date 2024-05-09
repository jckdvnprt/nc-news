import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../utils/articleApi';
import { fetchCommentsById } from '../utils/commentsApi';
import CommentCard from './CommentsCard';
import { getArticleVotes } from '../utils/getArticleVotesApi';
import updateVotes from '../utils/updateVotesApi';
import { postComment } from '../utils/postComment';
import { deleteComment } from '../utils/deleteComment';

function IndividualArticleCard() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articleComments, setArticleComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(0);
  const [userVote, setUserVote] = useState(null);
  const [newCommentBody, setNewCommentBody] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false); 
  const [loggedInUsername, setLoggedInUsername] = useState('happyamy2016');
  const [deletedComment, setDeletedComment] = useState(false);

  useEffect(() => {
    Promise.all([fetchArticleById(id), fetchCommentsById(id), getArticleVotes(id)])
      .then(([article, comments, votes]) => {
        setArticle(article);
        setArticleComments(comments);
        setCurrentVotes(votes.votes);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleDeleteComment = async (comment, commentId, articleId) => {
    if (comment.author !== loggedInUsername) {
      setErrorMessage('You can only delete comments you authored.');
      return;
    }

    try {
      await deleteComment(commentId, articleId); 
      const updatedComments = await fetchCommentsById(articleId); 
      setArticleComments(updatedComments);
      setDeletedComment(true);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error deleting comment. Please try again later.');
    }
  };


  const handleVote = async (voteType) => {
    try {
      const newVoteType = userVote === voteType ? null : voteType;
      setUserVote(newVoteType);

      setCurrentVotes((prevVotes) => {
        if (userVote === 'up') {
          return voteType === 'up' ? prevVotes - 1 : prevVotes; 
        } else if (userVote === 'down') {
          return voteType === 'down' ? prevVotes + 1 : prevVotes; 
        } else if (voteType === 'up') {
          return prevVotes + 1; 
        } else if (voteType === 'down') {
          return prevVotes - 1; 
        }
        return prevVotes;
      });
      await updateVotes(id, newVoteType);
    } catch (error) {
      setErrorMessage('Error occurred while processing vote. Please try again later.');
      console.error(error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newCommentBody.trim() || !newCommentAuthor.trim()) {
      setErrorMessage('Please fill out both the comment body and username fields.');
      return;
    }
    setIsSubmitting(true);
    try {
      await postComment(id, newCommentBody, newCommentAuthor);
      const updatedComments = await fetchCommentsById(id);
      setArticleComments(updatedComments);
      setNewCommentBody('');
      setNewCommentAuthor('');
      setCommentSubmitted(true); 
    } catch (error) {
      setErrorMessage('Error occurred while submitting comment. Please try again later.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {loading ? (
        <h4>Loading news article...</h4>
      ) : (
        <div className="single-article">
          <h2>{article.title}</h2>
          {article.article_img_url && <img src={article.article_img_url} alt={article.title} />}
          <p>{article.body}</p>
          <p>Author: {article.author}</p>
          <p>Published: {article.created_at}</p>
          <p>Votes: {currentVotes}</p>
          <p>Comment Count: {article.comment_count}</p>
          <div className="voting-buttons" style={{ width: '150px' }}> 
            {userVote === 'up' ? (
              <button className={`vote-button upvoted`} onClick={() => handleVote('up')}>
                {'  Upvoted 👍'}
              </button>
            ) : userVote === 'down' ? null : (
              <button className={`vote-button`} onClick={() => handleVote('up')}>
                {'Upvote'}
              </button>
            )}
            {userVote === 'down' ? (
              <button className={`vote-button downvoted`} onClick={() => handleVote('down')}>
                {' Downvoted 👎 '}
              </button>
            ) : userVote === 'up' ? null : (
              <button className={`vote-button`} onClick={() => handleVote('down')}>
                {'Downvote'}
              </button>
            )}
          </div>
          <button className="toggle-button" onClick={toggleComments}>
            {showComments ? 'Hide Comments 🫣 ' : 'Show Comments'}
          </button>
          {deletedComment ? (
            <p>You have deleted your previous comment, bye bye!</p>
          ) : null}
          {showComments && (
            <div className="comments">
              <h3>Comments</h3>
              <ul>
                {articleComments.map((comment) => (
                  <li key={comment.comment_id}>
                    <div className="comment-actions">
                      {comment.author === loggedInUsername && (
                        <button className="delete-button" onClick={() => handleDeleteComment(comment, comment.comment_id, id)}>
                          ❌ Delete
                        </button>
                      )}
                      <CommentCard comment={comment} />
                    </div>
                  </li>
                ))}
              </ul>

              {commentSubmitted ? (
                <p>Thank you for your comment!</p>
              ) : (
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                      id="comment"
                      value={newCommentBody}
                      onChange={(e) => setNewCommentBody(e.target.value)}
                      style={{ height: '100px', width: '300px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      id="username"
                      type="text"
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                    />
                  </div>
                  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IndividualArticleCard;
