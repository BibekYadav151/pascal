import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, logoutUser } from '../api/auth';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: async (email, password) => {
                try {
                    const response = await loginUser(email, password);
                    if (response.success) {
                        const { token, ...userData } = response.data;
                        localStorage.setItem('token', token);
                        set({ user: userData, isAuthenticated: true });
                        return { success: true };
                    }
                    return { success: false, error: response.message || 'Login failed' };
                } catch (error) {
                    return { success: false, error: error.response?.data?.message || 'Login failed' };
                }
            },
            logout: async () => {
                await logoutUser();
                localStorage.removeItem('token');
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);

export default useAuthStore;
