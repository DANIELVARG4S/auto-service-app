import client from '../../../api/client';

export const createVehicle = async (payload) => {
    const response = await client.post('/vehicles', payload);
    return response.data;
};

export const updateVehicle = async (id, payload) => {
    const response = await client.put(`/vehicles/${id}`, payload);
    return response.data;
};

export default { createVehicle, updateVehicle };
