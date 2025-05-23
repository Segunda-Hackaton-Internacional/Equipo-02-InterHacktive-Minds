import { useAuthActions } from '@/hooks/flux/auth/useAuthActions';
import { useAuthStore } from '@/hooks/flux/auth/useAuthStore';
import React, { createContext, useContext, useEffect } from 'react';

interface IAuthContext {
    user: ReturnType<typeof useAuthStore>['user'];
    loading: ReturnType<typeof useAuthStore>['loading'];
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    createAccount: (email: string, password: string) => Promise<void>;
    createProviderAccount: (email: string, password: string) => Promise<void>;
    
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user, loading } = useAuthStore();
    const { loadUser, login, logout, register, registerProvider } = useAuthActions();

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                createAccount: register,
                createProviderAccount: registerProvider
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): IAuthContext => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext must be inside AuthProvider');
    return ctx;
};
