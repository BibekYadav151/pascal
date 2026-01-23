import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOffers, createOffer, updateOffer, deleteOffer } from '../api/offers';

export const useOffers = (includeExpired = true) => {
    return useQuery({
        queryKey: ['offers', includeExpired],
        queryFn: () => getOffers(includeExpired),
    });
};

export const useCreateOffer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
        },
    });
};

export const useUpdateOffer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => updateOffer(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
        },
    });
};

export const useDeleteOffer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
        },
    });
};
