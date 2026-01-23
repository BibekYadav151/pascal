import api from '../lib/axios';

// Programs API
export const getPrograms = async () => {
    const response = await api.get('/programs');
    return response.data;
};

export const createProgram = async (programData) => {
    const response = await api.post('/programs', programData);
    return response.data;
};

export const updateProgram = async (id, programData) => {
    const response = await api.put(`/programs/${id}`, programData);
    return response.data;
};

export const deleteProgram = async (id) => {
    const response = await api.delete(`/programs/${id}`);
    return response.data;
};

export const getProgramById = async (id) => {
    const response = await api.get(`/programs/${id}`);
    return response.data;
};


// Universities API
export const getUniversities = async () => {
    const response = await api.get('/universities');
    return response.data;
};

export const createUniversity = async (universityData) => {
    const response = await api.post('/universities', universityData);
    return response.data;
};

export const updateUniversity = async (id, universityData) => {
    const response = await api.put(`/universities/${id}`, universityData);
    return response.data;
};

export const deleteUniversity = async (id) => {
    const response = await api.delete(`/universities/${id}`);
    return response.data;
};
