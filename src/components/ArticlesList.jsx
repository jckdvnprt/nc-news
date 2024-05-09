import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../utils/api';
import { sortArticles } from '../utils/sorting'; 
import DropDownMenu from './DropDownMenu'


function ArticlesList() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const articlesData = await fetchArticles();
        const sortedArticles = sortArticles(articlesData, sortBy, sortOrder); 
        setArticles(sortedArticles);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [sortBy, sortOrder]);

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
      
      <DropDownMenu sortBy={sortBy} sortOrder={sortOrder} handleSortChange={handleSortChange} />
      {loading ? (<h4>Loading NC News...</h4>) : (
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
export default ArticlesList;
