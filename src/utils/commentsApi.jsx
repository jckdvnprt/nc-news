import axios from 'axios';
export const fetchCommentsById = (id) => {
  return axios.get(`https://nc-news-xd0a.onrender.com/api/articles/${id}/comments`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching comments from article with id ${id}:`, error);
      throw error; 
    });
};
