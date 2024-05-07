import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../utils/articleApi';
import { fetchCommentsById } from '../utils/commentsApi';
import CommentCard from './CommentsCard';
import { getArticleVotes } from '../utils/getArticleVotesApi';
import updateVotes from '../utils/updateVotesApi';

function IndividualArticleCard() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articleComments, setArticleComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(0);
  const [userVote, setUserVote] = useState(null);

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
      const updatedVotes = await updateVotes(id, newVoteType);
      setCurrentVotes(updatedVotes); 
      setUserVote(newVoteType);
    } catch (error) {
      console.error(error);
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
          <div className="clearfix"></div>  {/* Added to clear layout after voting buttons */}
          <button className="toggle-button" onClick={toggleComments}>
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>

          {showComments && (
            <div className="comments">
              <h3>Comments</h3>
              <ul>
                {articleComments.map((comment) => (
                  <CommentCard key={comment.comment_id} comment={comment} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IndividualArticleCard;
