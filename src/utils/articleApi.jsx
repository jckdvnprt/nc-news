import axios from 'axios';
export const fetchArticleById = (id) => {
  return axios.get(`https://nc-news-xd0a.onrender.com/api/articles/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching article with id ${id}:`, error);
      throw error; 
    });
};
