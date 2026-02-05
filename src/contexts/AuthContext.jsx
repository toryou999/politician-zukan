import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 初期化時にLocalStorageを確認
        const storedUser = localStorage.getItem('politician_arcade_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // 擬似ログイン（今は名前を入れるだけ等の簡易的なもの）
    const login = (userData) => {
        const dummyUser = {
            id: 'user_' + Date.now(),
            name: userData?.name || 'ゲスト総理',
            ...userData
        };
        setUser(dummyUser);
        localStorage.setItem('politician_arcade_user', JSON.stringify(dummyUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('politician_arcade_user');
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
