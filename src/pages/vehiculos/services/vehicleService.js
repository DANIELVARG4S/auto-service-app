import client from '../../../api/client';

export const updateVehicle = async (id, payload) => {
    const response = await client.put(`/vehicles/${id}`, payload);
    return response.data;
};

export default { updateVehicle };
