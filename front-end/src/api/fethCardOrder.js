import axios from 'axios';

async function fetchCardOrder(token, id) {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.get(`/sale/${id}`, {
      headers: { Authorization: token },
    });
    console.log(result);
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchCardOrder;
