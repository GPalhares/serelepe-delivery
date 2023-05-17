import axios from 'axios';

jest.mock('axios');

const mockResponse = {
  status: 200,
  data: {
    role: 'customer',
  },
};

axios.post.mockResolvedValue(mockResponse);

export default axios;
