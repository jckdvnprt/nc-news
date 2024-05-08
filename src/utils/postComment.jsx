import axios from 'axios';
export const postComment = async (id, commentBody, author) => {
    console.log('Request data >>>', { body: commentBody, username: author, article_id: id, created_at: new Date().toISOString() }); 
    try {
      const response = await axios.post(`https://nc-news-xd0a.onrender.com/api/articles/${id}/comments`, {
        username: author,
        body: commentBody,
        article_id: id,
        created_at: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };