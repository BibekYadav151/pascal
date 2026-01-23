import api from '../lib/axios';

// Gallery API
export const getGalleryEvents = async () => {
    const response = await api.get('/gallery');
    return response.data;
};

export const createGalleryEvent = async (eventData) => {
    const response = await api.post('/gallery', eventData);
    return response.data;
};

export const updateGalleryEvent = async (id, eventData) => {
    const response = await api.put(`/gallery/${id}`, eventData);
    return response.data;
};

export const deleteGalleryEvent = async (id) => {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
};

export const deleteGalleryImage = async (id, imageUrl) => {
    const response = await api.delete(`/gallery/${id}/images`, { data: { imageUrl } });
    return response.data;
};

export const uploadGalleryImage = async (file) => {
    const formData = new FormData();
    formData.append('galleryImage', file);
    const response = await api.post('/upload/gallery-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteFile = async (filename) => {
    const response = await api.delete(`/upload/file/${filename}`);
    return response.data;
};
