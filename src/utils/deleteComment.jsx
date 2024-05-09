import axios from "axios";

export const deleteComment = async (commentId, articleId) => {
  try {
    const response = await axios.delete(
      `https://nc-news-xd0a.onrender.com/api/articles/${articleId}/comments/${commentId}`
    );
    console.log("Comment deleted successfully", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment ${commentId}:`, error);
    throw error;
  }
};
