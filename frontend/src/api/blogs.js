import api from '../lib/axios';

export const getBlogs = async () => {
    const response = await api.get('/blogs');
    return response.data;
};

export const getBlogBySlug = async (slug) => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
};

export const createBlog = async (blogData) => {
    const response = await api.post('/blogs', blogData);
    return response.data;
};

export const updateBlog = async (id, blogData) => {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
};

export const deleteBlog = async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
};

export const uploadBlogImage = async (file) => {
    const formData = new FormData();
    formData.append('coverImage', file);
    const response = await api.post('/upload/blog-cover', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteBlogImage = async (filename) => {
    const response = await api.delete(`/upload/file/${filename}`);
    return response.data;
};
