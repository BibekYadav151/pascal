import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
    getUniversities,
    createUniversity,
    updateUniversity,
    deleteUniversity
} from '../api/programs';

// Programs Hooks
export const usePrograms = () => {
    return useQuery({
        queryKey: ['programs'],
        queryFn: getPrograms,
    });
};

export const useCreateProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProgram,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['programs'] });
        },
    });
};

export const useUpdateProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateProgram(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['programs'] });
        },
    });
};

export const useDeleteProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProgram,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['programs'] });
        },
    });
};

// Universities Hooks
export const useUniversities = () => {
    return useQuery({
        queryKey: ['universities'],
        queryFn: getUniversities,
    });
};

export const useCreateUniversity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUniversity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['universities'] });
        },
    });
};

export const useUpdateUniversity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateUniversity(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['universities'] });
        },
    });
};

export const useDeleteUniversity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUniversity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['universities'] });
        },
    });
};
