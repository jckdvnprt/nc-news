import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../utils/articleApi'; 
import { fetchCommentsById } from '../utils/commentsApi';
import CommentCard from './CommentsCard'; 

function IndividualArticleCard() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [articleComments, setArticleComments] = useState([]);
  const [showComments, setShowComments] = useState(false); 

  useEffect(() => {
    fetchArticleById(id)
      .then(article => {
        setArticle(article);
        setLoading(false);
      });
  }, [id]); 

  useEffect(() => {
    fetchCommentsById(id)
      .then(comments => {
        setArticleComments(comments);
      });
  }, [id]); 

  const toggleComments = () => {
    setShowComments(!showComments); 
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