import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            isAdmin: false,
            adminEmail: '',
            login: (email, password) => {
                // Mock login for now (replace with API call later)
                if (email === 'admin@pascal.edu.np' && password === 'admin123') {
                    set({ isAdmin: true, adminEmail: email });
                    return { success: true };
                }
                return { success: false, error: 'Invalid credentials' };
            },
            logout: () => set({ isAdmin: false, adminEmail: '' }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;
