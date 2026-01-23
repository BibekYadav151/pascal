import api from '../lib/axios';

// Offers API
export const getOffers = async (includeExpired = true) => {
    const response = await api.get(`/offers?includeExpired=${includeExpired}`);
    return response.data;
};

export const createOffer = async (offerData) => {
    const response = await api.post('/offers', offerData);
    return response.data;
};

export const updateOffer = async (id, offerData) => {
    const response = await api.put(`/offers/${id}`, offerData);
    return response.data;
};

export const deleteOffer = async (id) => {
    const response = await api.delete(`/offers/${id}`);
    return response.data;
};
