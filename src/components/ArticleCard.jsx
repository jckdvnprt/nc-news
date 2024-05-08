import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../utils/articleApi';
import { fetchCommentsById } from '../utils/commentsApi';
import CommentCard from './CommentsCard';
import { getArticleVotes } from '../utils/getArticleVotesApi';
import updateVotes from '../utils/updateVotesApi';
import { postComment } from '../utils/postComment';

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
      setErrorMessage('');
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
            {showComments ? 'Hide Comments 🫣 ' : 'Show Comments🔎'}
          </button>
          {showComments && (
            <div className="comments">
              <h3>Comments</h3>
              <ul>
                {articleComments.map((comment) => (
                  <CommentCard key={comment.comment_id} comment={comment} />
                ))}
              </ul>

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
                {isSubmitting ? (
                  <p>Submitting...</p>
                ) : (
                  commentSubmitted ? (
                    <p>Thank you for submitting your lovely comment!</p>
                  ) : (
                    <button type="submit">Submit Comment</button>
                  )
                )}
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IndividualArticleCard;
