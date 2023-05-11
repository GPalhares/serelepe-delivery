import axios from 'axios';

async function fetchCardOrder(token) {
  const instance = axios.create({
    baseURL: 'http://localhost3001',
  });
  try {
    const result = await instance.get('/sales/', {
      headers: { Authorization: token },
    });
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchCardOrder;
