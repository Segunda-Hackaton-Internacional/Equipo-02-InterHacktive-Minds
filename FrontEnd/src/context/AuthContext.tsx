import { authOk } from '@/actions/auth/authActions';
import { AppDispatcher } from '@/dispatcher/AppDispatcher';
import { useAuthActions } from '@/hooks/flux/auth/useAuthActions';
import { useAuthStore } from '@/hooks/flux/auth/useAuthStore';
import { UserType } from '@/types/userType';
import React, { createContext, useContext, useEffect } from 'react';

interface IAuthContext {
    user: ReturnType<typeof useAuthStore>['user'];
    loading: ReturnType<typeof useAuthStore>['loading'];
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    createAccount: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user, loading } = useAuthStore();
    const { loadUser, login, logout, register } = useAuthActions();

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login: mockLogin,
                logout,
                createAccount: register,
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

const mockLogin = async (email: string, password: string) => {
    console.log("Bypassing login with:", email, password); 

    //MOCKEAR USUARIO???

    const mockUser = {
        "id": "",
        "email": "lau@example.com",
        "password": "password123",
        "avatar": "",
        "type": "OPERATOR" as UserType,
      }

      await new Promise(resolve => setTimeout(resolve, 300));

      AppDispatcher.dispatch(authOk(mockUser));
    
    return Promise.resolve();
  };
