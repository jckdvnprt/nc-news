import axios from 'axios';

export const fetchArticleById = async (id) => {
  try {
    const response = await axios.get(`https://nc-news-xd0a.onrender.com/api/articles/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {

      console.error('Error fetching article:', error.response.data);
      throw new Error('Article not found (404)'); 
    } else {
      console.error('Error fetching article:', error);
      throw error;
    }
  }
};
