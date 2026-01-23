import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getClasses,
    createClass,
    updateClass,
    deleteClass,
    getInstituteClasses,
    createInstituteClass,
    updateInstituteClass,
    deleteInstituteClass
} from '../api/classes';

// Regular Classes Hooks
export const useClasses = () => {
    return useQuery({
        queryKey: ['classes'],
        queryFn: getClasses,
    });
};

export const useCreateClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createClass,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
        },
    });
};

export const useUpdateClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateClass(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
        },
    });
};

export const useDeleteClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteClass,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
        },
    });
};

// Institute Classes Hooks
export const useInstituteClasses = () => {
    return useQuery({
        queryKey: ['institute-classes'],
        queryFn: getInstituteClasses,
    });
};

export const useCreateInstituteClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createInstituteClass,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['institute-classes'] });
        },
    });
};

export const useUpdateInstituteClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateInstituteClass(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['institute-classes'] });
        },
    });
};

export const useDeleteInstituteClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteInstituteClass,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['institute-classes'] });
        },
    });
};
