import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Mail,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  UserPlus,
  LogIn
} from 'lucide-react';

export default function LoginScreen() {
  const { signIn, signUp } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Administrador General SGAS');
  const [area, setArea] = useState('Gerencia General & Oficialía de Cumplimiento SGAS');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await signIn(email.trim(), password);
    setLoading(false);

    if (error) {
      setMessage({
        type: 'error',
        text: error.message === 'Invalid login credentials'
          ? 'Credenciales incorrectas. Verifique correo y contraseña o cree su usuario en la pestaña "Crear Usuario".'
          : (error.message || 'Error al iniciar sesión.')
      });
    } else {
      setMessage({ type: 'success', text: '¡Autenticado correctamente! Ingresando a AUBASA SGAS...' });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await signUp(email.trim(), password, {
      full_name: fullName.trim(),
      role: role,
      area: area,
      concesion: 'Autopista BALP (50 km)'
    });
    setLoading(false);

    if (error) {
      setMessage({ type: 'error', text: error.message || 'Error al registrar usuario en Supabase.' });
    } else {
      setMessage({
        type: 'success',
        text: '¡Usuario creado con éxito! Ya podés ingresar con tu correo y contraseña.'
      });
      setTab('login');
    }
  };

  return (
    <div className="min-h-screen bg-[#e9eef3] flex flex-col justify-center items-center p-4 selection:bg-[#0284c7] selection:text-white">
      {/* Contenedor Central */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-300/80 overflow-hidden text-slate-900">

        {/* Cabecera Azul Institucional AUBASA */}
        <div className="bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0ea5e9] p-6 text-white text-center relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-xs border border-white/30 flex items-center justify-center shadow-lg mb-3">
              <ShieldAlert className="w-8 h-8 text-white drop-shadow-sm" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">AUBASA SGAS</h1>
              <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-white/20 text-white rounded border border-white/30">
                ISO 37001
              </span>
            </div>
            <p className="text-xs text-sky-100 mt-1 font-medium">
              Autopista Buenos Aires — La Plata (50 km)
            </p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-900/50 text-[10px] text-sky-200 border border-sky-400/30 font-bold">
              <span>Contratación • Pagos • Obras Viales</span>
            </div>
          </div>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="p-6 sm:p-8 space-y-5">

          {/* Alerta de feedback */}
          {message && (
            <div className={`p-3.5 rounded-xl flex items-start gap-2.5 text-xs font-semibold border ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{message.text}</span>
            </div>
          )}

          {/* Selector de Pestañas Login vs Registro */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
            <button
              type="button"
              onClick={() => { setTab('login'); setMessage(null); }}
              className={`flex-1 py-2.5 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                tab === 'login'
                  ? 'bg-white text-[#0284c7] shadow-xs font-black border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Iniciar Sesión</span>
            </button>
            <button
              type="button"
              onClick={() => { setTab('signup'); setMessage(null); }}
              className={`flex-1 py-2.5 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                tab === 'signup'
                  ? 'bg-white text-[#0284c7] shadow-xs font-black border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Crear Usuario</span>
            </button>
          </div>

          {/* FORMULARIO DE LOGIN */}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Correo Electrónico (AUBASA)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@aubasa.com.ar"
                    className="w-full pl-9 pr-3 py-2.5 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-[#0284c7] placeholder:text-slate-400 placeholder:font-normal outline-none transition-all cursor-text shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-[#0284c7] placeholder:text-slate-400 placeholder:font-normal outline-none transition-all cursor-text shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg text-xs font-black shadow-md shadow-sky-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] mt-2"
              >
                {loading ? 'Verificando credenciales...' : 'Ingresar al Sistema SGAS BALP'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* FORMULARIO DE REGISTRO */
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label htmlFor="signup-name" className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    id="signup-name"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sergio Montes"
                    className="w-full pl-9 pr-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-[#0284c7] placeholder:text-slate-400 placeholder:font-normal outline-none transition-all cursor-text"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-xs font-bold text-slate-700 mb-1">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@aubasa.com.ar"
                    className="w-full pl-9 pr-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-[#0284c7] placeholder:text-slate-400 placeholder:font-normal outline-none transition-all cursor-text"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-role" className="block text-xs font-bold text-slate-700 mb-1">
                  Función / Rol en el Equipo SGAS
                </label>
                <select
                  id="signup-role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-[#0284c7] outline-none cursor-pointer"
                >
                  <option value="Administrador General SGAS">👑 Administrador General SGAS (Acceso Total & Control Maestro)</option>
                  <option value="Oficial de Cumplimiento SGAS">🛡️ Oficial de Cumplimiento Principal (ISO 37001 Cl. 5.3)</option>
                  <option value="Auditor Interno SGAS">🔍 Auditor Interno de Cumplimiento (Cl. 9.2)</option>
                  <option value="Responsable de Compras & Contrataciones">📑 Responsable de Compras & Contrataciones</option>
                  <option value="Control de Tesorería & Pagos">💳 Control de Tesorería & Pagos (Cl. 8.3)</option>
                  <option value="Supervisión de Obras BALP">🏗️ Supervisión de Obras BALP (LEMIT)</option>
                </select>
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-xs font-bold text-slate-700 mb-1">
                  Contraseña (Mínimo 6 caracteres)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-[#0284c7] placeholder:text-slate-400 placeholder:font-normal outline-none transition-all cursor-text"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
              >
                {loading ? 'Creando cuenta...' : 'Crear Usuario en Supabase Cloud'}
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </button>
            </form>
          )}

        </div>

        {/* Pie Informativo */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-center text-[11px] text-slate-500 font-medium">
          Sistema AUBASA ISO 37001 • Base de Datos Supabase PostgreSQL
        </div>
      </div>
    </div>
  );
}
