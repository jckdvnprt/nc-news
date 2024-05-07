import axios from 'axios';
export const fetchArticles = () => {
  return axios.get("https://nc-news-xd0a.onrender.com/api/articles")
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching articles:', error);
      throw error; 
    });
};
