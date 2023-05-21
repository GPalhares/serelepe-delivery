import axios from 'axios';

async function fetchChangeStatus(token, id) {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.put(`/sale/${id}`, {
      headers: { Authorization: token },
    });
    console.log(result);
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchChangeStatus;
