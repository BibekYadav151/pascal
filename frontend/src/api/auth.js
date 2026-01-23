import api from '../lib/axios';

export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const logoutUser = async () => {
    // Optional: Call logout endpoint if backend requires it (e.g. invalidate cookie)
    // const response = await api.post('/auth/logout');
    // return response.data;
    return Promise.resolve();
};

export const getCurrentUser = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};
