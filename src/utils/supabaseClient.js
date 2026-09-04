import { createClient } from '@supabase/supabase-js';

// Sanitización rigurosa para evitar errores 'Failed to execute fetch on Window: Invalid value'
// causados por espacios, comillas, saltos de línea \r\n o sufijos /rest/v1/ en variables de entorno de Vercel
const cleanString = (str) => {
  if (!str) return '';
  return str.toString().trim().replace(/[\r\n\t'"]/g, '');
};

const OFFICIAL_PROJECT_URL = 'https://pjjoulwltioxqbgukoti.supabase.co';
const OFFICIAL_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqam91bHdsdGlveHFiZ3Vrb3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NjMxMDYsImV4cCI6MjEwNDAzOTEwNn0.4fEIEmgAwohCPWnhKJ_3cZoBahDUKivMZFLnCXHn6Tc';

const sanitizeUrl = (url) => {
  let clean = cleanString(url);
  if (!clean || !clean.includes('supabase.co')) {
    return OFFICIAL_PROJECT_URL;
  }
  clean = clean.replace(/\/rest\/v1\/?$/, '');
  clean = clean.replace(/\/+$/, '');
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = `https://${clean}`;
  }
  return clean;
};

const sanitizeKey = (key) => {
  let clean = cleanString(key);
  // Un JWT válido de Supabase debe empezar por eyJ, tener 3 partes separadas por puntos y longitud suficiente
  const isValidJwt = clean && clean.startsWith('eyJ') && clean.split('.').length === 3 && clean.length > 80;
  if (!isValidJwt) {
    clean = OFFICIAL_ANON_KEY;
  }
  return clean;
};

const rawUrl = import.meta.env.VITE_SUPABASE_URL || OFFICIAL_PROJECT_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || OFFICIAL_ANON_KEY;

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

