export const sortArticles = (articlesData, sortBy, sortOrder) => {
  return articlesData.sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' ? new Date(a.created_at) - new Date(b.created_at) : new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === 'votes') {
      return sortOrder === 'asc' ? a.votes - b.votes : b.votes - a.votes;
 
    }
  });
};
