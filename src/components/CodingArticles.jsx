import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticlesByTopic } from '../utils/fetchArticlesByTopic';

function CodingArticles() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticlesByTopic('coding')
      .then(articles => {
        const sortedArticles = articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setArticles(sortedArticles);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Coding Articles</h2>
      {loading ? (<h4>Loading articles...</h4>) : (
        <ul className="articles-list">
          {articles.map(article => (
            <li key={article.article_id} className="article">
              <h3><Link to={`/article/${article.article_id}`}>{article.title}</Link></h3>
              {article.article_img_url && <img src={article.article_img_url} alt={article.title} />}
              <p>Author: {article.author}</p>
              <p>Published: {article.created_at}</p>
              <p>Votes: {article.votes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CodingArticles;
