import axios from 'axios';
export const getArticleVotes = (id) => {
    return axios.get(`https://nc-news-xd0a.onrender.com/api/articles/${id}`)
      .then(response => {
        return { votes: response.data.votes };
      });
  };
  