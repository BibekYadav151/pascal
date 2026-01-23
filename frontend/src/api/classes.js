import api from '../lib/axios';

// Regular Classes API
export const getClasses = async () => {
    const response = await api.get('/classes');
    return response.data;
};

export const createClass = async (classData) => {
    const response = await api.post('/classes', classData);
    return response.data;
};

export const updateClass = async (id, classData) => {
    const response = await api.put(`/classes/${id}`, classData);
    return response.data;
};

export const deleteClass = async (id) => {
    const response = await api.delete(`/classes/${id}`);
    return response.data;
};

// Institute Classes API
export const getInstituteClasses = async () => {
    const response = await api.get('/institute-classes');
    return response.data;
};

export const createInstituteClass = async (classData) => {
    const response = await api.post('/institute-classes', classData);
    return response.data;
};

export const updateInstituteClass = async (id, classData) => {
    const response = await api.put(`/institute-classes/${id}`, classData);
    return response.data;
};

export const deleteInstituteClass = async (id) => {
    const response = await api.delete(`/institute-classes/${id}`);
    return response.data;
};
