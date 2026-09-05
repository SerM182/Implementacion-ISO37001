import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    // 1. Obtener sesión actual de Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      // Auto-asegurar permisos Master Admin para sgiaubasa@gmail.com
      if (currentUser && currentUser.email?.toLowerCase().includes('sgiaubasa')) {
        if (!currentUser.user_metadata?.isAdmin || currentUser.user_metadata?.role !== 'Administrador General SGAS') {
          supabase.auth.updateUser({
            data: {
              role: 'Administrador General SGAS',
              isAdmin: true,
              permissions: 'full_admin_access',
              area: 'Dirección General & Gerencia de Cumplimiento AUBASA'
            }
          }).catch(() => {});
        }
      }
      setLoading(false);
    }).catch(err => {
      console.error('Error al recuperar sesión de Supabase:', err);
      setLoading(false);
    });

    // 2. Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser && currentUser.email?.toLowerCase().includes('sgiaubasa')) {
        if (!currentUser.user_metadata?.isAdmin || currentUser.user_metadata?.role !== 'Administrador General SGAS') {
          supabase.auth.updateUser({
            data: {
              role: 'Administrador General SGAS',
              isAdmin: true,
              permissions: 'full_admin_access',
              area: 'Dirección General & Gerencia de Cumplimiento AUBASA'
            }
          }).catch(() => {});
        }
      }
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
      const enhancedMetadata = {
        role: 'Administrador General SGAS',
        isAdmin: true,
        permissions: 'full_admin_access',
        concesion: 'Autopista BALP (50 km)',
        ...metadata
      };
      return await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: { data: enhancedMetadata }
      });
    } catch (err) {
      console.error('Error en signUp:', err);
      return { error: { message: err.message || 'Error al conectar con el servidor de registro.' } };
    }
  };

  const updateProfile = async (metadata = {}) => {
    if (!supabase) return { error: { message: 'Supabase no está configurado.' } };
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: metadata
      });
      if (!error && data?.user) {
        setUser(data.user);
      }
      return { data, error };
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      return { error: { message: err.message || 'Error al actualizar perfil.' } };
    }
  };

  const setMasterAdminRole = async () => {
    return await updateProfile({
      role: 'Administrador General SGAS',
      isAdmin: true,
      permissions: 'full_admin_access',
      area: 'Gerencia de Cumplimiento & Dirección General AUBASA'
    });
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

  // Permiso de administrador total concedido a cualquier usuario autenticado en la plataforma
  const isAdmin = true;
  const userRole = user?.user_metadata?.role || 'Administrador General SGAS';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        setMasterAdminRole,
        isAdmin,
        userRole,
        isSupabaseConfigured: isSupabaseConfigured()
      }}
    >
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

