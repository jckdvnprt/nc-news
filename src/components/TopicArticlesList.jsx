import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticlesByTopic } from '../utils/fetchArticlesByTopic';
import { sortArticles } from '../utils/sorting';
import DropDownMenu from './DropDownMenu'

function TopicArticlesList({ topic }) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const topicName = topic.charAt(0).toUpperCase() + topic.slice(1);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const articlesData = await fetchArticlesByTopic(topic);
        const sortedArticles = sortArticles(articlesData, sortBy, sortOrder);
        setArticles(sortedArticles);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [sortBy, sortOrder, topic]); 

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sortBy') {
      setSortBy(value);
    } else if (name === 'sortOrder') {
      setSortOrder(value);
    }
  };

  return (
    <div>
      <h2>{topicName} Articles</h2>
      <DropDownMenu sortBy={sortBy} sortOrder={sortOrder} handleSortChange={handleSortChange} />
      {loading ? (<h4>Loading {topic} articles...</h4>) : (
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

export default TopicArticlesList;
