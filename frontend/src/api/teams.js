import api from '../lib/axios';

export const getTeams = async () => {
    const response = await api.get('/teams');
    return response.data;
};

export const createTeam = async (teamData) => {
    const response = await api.post('/teams', teamData);
    return response.data;
};

export const updateTeam = async (id, teamData) => {
    const response = await api.put(`/teams/${id}`, teamData);
    return response.data;
};

export const deleteTeam = async (id) => {
    const response = await api.delete(`/teams/${id}`);
    return response.data;
};
