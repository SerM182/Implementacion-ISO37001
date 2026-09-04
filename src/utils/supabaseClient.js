import { createClient } from '@supabase/supabase-js';

// Sanitización rigurosa para evitar errores 'Failed to execute fetch on Window: Invalid value'
// causados por espacios, comillas, saltos de línea \r\n o sufijos /rest/v1/ en variables de entorno de Vercel
const cleanString = (str) => {
  if (!str) return '';
  return str.toString().trim().replace(/[\r\n\t'"]/g, '');
};

const sanitizeUrl = (url) => {
  let clean = cleanString(url);
  if (!clean) return 'https://pjjoulwltioxqbgukoti.supabase.co';
  // Si se pegó la URL con /rest/v1 o /rest/v1/ al final, eliminarlo
  clean = clean.replace(/\/rest\/v1\/?$/, '');
  clean = clean.replace(/\/+$/, '');
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = `https://${clean}`;
  }
  return clean;
};

const sanitizeKey = (key) => {
  let clean = cleanString(key);
  // Si no está definida o es inválida, usar la clave anon pública oficial del proyecto
  if (!clean || !clean.startsWith('eyJ')) {
    clean = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqam91bHdsdGlveHFiZ3Vrb3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NjMxMDYsImV4cCI6MjEwNDAzOTEwNn0.4fEIEmgAwohCPWnhKJ_3cZoBahDUKivMZFLnCXHn6Tc';
  }
  return clean;
};

const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pjjoulwltioxqbgukoti.supabase.co';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqam91bHdsdGlveHFiZ3Vrb3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NjMxMDYsImV4cCI6MjEwNDAzOTEwNn0.4fEIEmgAwohCPWnhKJ_3cZoBahDUKivMZFLnCXHn6Tc';

export const supabaseUrl = sanitizeUrl(rawUrl);
export const supabaseAnonKey = sanitizeKey(rawKey);

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseAnonKey.startsWith('eyJ'));
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

