import axios from 'axios';
function updateVotes(id, voteType) {
  return new Promise((resolve, reject) => {
    axios.patch(`https://nc-news-xd0a.onrender.com/api/articles/${id}`, {
      inc_votes: voteType === 'up' ? 1 : -1,
    })
      .then(response => {
        resolve(response.data.votes);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default updateVotes;
