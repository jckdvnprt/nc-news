import React, { useEffect, useState } from "react";
import axios from 'axios';

function ArticlesList() {
    const [loading, setLoading] = useState(true); 
    const [articles, setArticles] = useState([]);
        useEffect(() => {
            axios.get("https://nc-news-xd0a.onrender.com/api/articles")
            .then(response => {
                const sortedArticles = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setArticles(sortedArticles);
                setLoading(false); 
            })
        }, []);

  return (
    <div>
      {loading ? ( 
       <h4>Loading NC News...</h4>
      ) : (
        <ul className="articles-list"> 
          {articles.map(article => (
            <li key={article.article_id} className="article"> 
              <h3>{article.title}</h3>
              <p>Author: {article.author}</p>
              <p>Published: {article.created_at}</p>
              {article.article_img_url && <img src={article.article_img_url} alt={article.title} />} 
              <p>{article.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArticlesList;
