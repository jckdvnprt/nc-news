import axios from 'axios';
export const fetchArticleById = (id) => {
  return axios.get(`https://nc-news-xd0a.onrender.com/api/articles/${id}`)
    .then(response => response.data)

};
