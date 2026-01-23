import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getGalleryEvents,
    createGalleryEvent,
    updateGalleryEvent,
    deleteGalleryEvent,
    deleteGalleryImage,
    uploadGalleryImage,
    deleteFile
} from '../api/gallery';

export const useGalleryEvents = () => {
    return useQuery({
        queryKey: ['gallery'],
        queryFn: getGalleryEvents,
    });
};

export const useCreateGalleryEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createGalleryEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
    });
};

export const useUpdateGalleryEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateGalleryEvent(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
    });
};

export const useDeleteGalleryEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteGalleryEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
    });
};

export const useDeleteGalleryImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, imageUrl }) => deleteGalleryImage(id, imageUrl),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery'] });
        },
    });
};

export const useUploadGalleryImage = () => {
    return useMutation({
        mutationFn: uploadGalleryImage,
    });
};

export const useDeleteFile = () => {
    return useMutation({
        mutationFn: deleteFile,
    });
};
