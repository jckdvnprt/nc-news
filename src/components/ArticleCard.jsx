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
  }, [id]);
  
  const toggleComments = () => {
    setShowComments(!showComments); 
  };

  const handleVote = async (voteType) => {
    try {
      const newVoteType = userVote === voteType ? null : voteType;
      const updatedVotes = await updateVotes(id, newVoteType);
      setCurrentVotes((prevVotes) => {
        if (userVote === 'up') {
          return prevVotes - 1;
        } else if (userVote === 'down') {
          return prevVotes + 1;
        } else if (newVoteType === 'up') {
          return prevVotes + 1;
        } else if (newVoteType === 'down') {
          return prevVotes - 1;
        }
        return updatedVotes;
      });
      setUserVote(newVoteType);
    } catch (error) {
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

          <button className={`vote-button ${userVote === 'up' ? 'upvoted' : ''}`} onClick={() => handleVote('up')}>
            {userVote === 'up' ? '👍' : 'Upvote'}
          </button>
          <button className={`vote-button ${userVote === 'down' ? 'downvoted' : ''}`} onClick={() => handleVote('down')}>
            {userVote === 'down' ? '👎' : 'Downvote'}
          </button>

          <button className="toggle-button" onClick={toggleComments}>
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>
        
          {showComments && ( 
            <div className="comments">
              <h3>Comments</h3>
              <ul>
                {articleComments.map(comment => (
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
