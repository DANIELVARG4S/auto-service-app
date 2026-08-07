import client from '../../../api/client';

export const updateUser = async (id, payload) => {
  const response = await client.put(`/users/${id}`, payload);
  return response.data;
};

export const createUser = async (payload) => {
  const response = await client.post('/users', payload);
  return response.data;
};

export default { updateUser, createUser };
