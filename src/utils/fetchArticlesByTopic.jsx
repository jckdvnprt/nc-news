import axios from 'axios';
export async function fetchArticlesByTopic(topic) {
    const url = `https://nc-news-xd0a.onrender.com/api/articles?topic=${topic}`;
    try {
      const response = await axios.get(url);
      
      if (!response.data) {
        throw new Error('Failed to fetch articles');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  }
  