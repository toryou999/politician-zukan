import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Supabaseのセッションチェック
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'ゲスト',
                    email: session.user.email,
                    isGuest: false
                });
            } else {
                // Supabaseがない場合やセッションがない場合はローカルストレージチェック(以前の互換性)
                const storedUser = localStorage.getItem('politician_arcade_user');
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (e) {
                        setUser(null);
                    }
                }
            }
            setLoading(false);
        });

        // 認証状態の変更リスナー
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'ゲスト',
                    email: session.user.email,
                    isGuest: false
                });
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    // 擬似ログイン（Supabase未設定時のフォールバック、または簡単ログイン）
    const login = async (userData) => {
        // 本来はここで supabase.auth.signInWith... を呼ぶ
        // ログイン（メールアドレス）
        const signIn = async (email, password) => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            return data;
        };

        // 新規登録（メールアドレス）
        const signUp = async (email, password, name) => {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name,
                    },
                },
            });
            if (error) throw error;
            return data;
        };

        const logout = async () => {
            await supabase.auth.signOut();
            setUser(null);
            localStorage.removeItem('politician_arcade_user');
        };

        const value = {
            user,
            signIn,
            signUp,
            logout,
            loading
        };

        return (
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        );
    }
