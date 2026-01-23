import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, uploadBlogImage, deleteBlogImage } from '../api/blogs';

export const useBlogs = () => {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
    });
};

export const useBlog = (slug) => {
    return useQuery({
        queryKey: ['blogs', slug],
        queryFn: () => getBlogBySlug(slug),
        enabled: !!slug,
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

export const useUpdateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateBlog(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

export const useUploadBlogImage = () => {
    return useMutation({
        mutationFn: uploadBlogImage,
    });
};

export const useDeleteBlogImage = () => {
    return useMutation({
        mutationFn: deleteBlogImage
    });
};
