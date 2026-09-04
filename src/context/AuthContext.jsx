import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      // Si no está configurada la anon key aún, mantener modo offline/demo
      setLoading(false);
      return;
    }

    // 1. Obtener sesión actual de Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(err => {
      console.error('Error al recuperar sesión de Supabase:', err);
      setLoading(false);
    });

    // 2. Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    if (!supabase) return { error: { message: 'Supabase no está configurado con la clave anon.' } };
    try {
      return await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });
    } catch (err) {
      console.error('Error en signIn:', err);
      return { error: { message: err.message || 'Error al conectar con el servidor de autenticación.' } };
    }
  };

  const signUp = async (email, password, metadata = {}) => {
    if (!supabase) return { error: { message: 'Supabase no está configurado con la clave anon.' } };
    try {
      return await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: { data: metadata }
      });
    } catch (err) {
      console.error('Error en signUp:', err);
      return { error: { message: err.message || 'Error al conectar con el servidor de registro.' } };
    }
  };

  const signOut = async () => {
    if (!supabase) return;
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Error al cerrar sesión:', err);
    } finally {
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, isSupabaseConfigured: isSupabaseConfigured() }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
