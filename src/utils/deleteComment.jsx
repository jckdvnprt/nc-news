import axios from "axios";

export const deleteComment = async (commentId, articleId) => {
  try {
    const response = await axios.delete(
      `https://nc-news-xd0a.onrender.com/api/articles/${articleId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    const errorMessage = `Error deleting comment ${commentId}: ${error.message}`;
    const errorElement = document.createElement("div");
    errorElement.textContent = errorMessage;
    document.body.appendChild(errorElement);

    throw error;
  }
};
