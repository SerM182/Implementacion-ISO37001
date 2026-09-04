import React, { useState } from 'react';
import Modal from '../common/Modal.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Building2,
  CheckCircle2,
  AlertCircle,
  Users,
  LogOut,
  KeyRound,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { user, signIn, signUp, signOut, isSupabaseConfigured } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'signup' | 'team'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Oficial de Cumplimiento SGAS');
  const [area, setArea] = useState('Gerencia de Compliance y Control');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      setMessage({ type: 'error', text: error.message || 'Error al iniciar sesión. Verifique credenciales.' });
    } else {
      setMessage({ type: 'success', text: 'Sesión iniciada correctamente en AUBASA SGAS.' });
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1000);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await signUp(email, password, {
      full_name: fullName,
      role: role,
      area: area,
      concesion: 'Autopista BALP (50 km)'
    });
    setLoading(false);

    if (error) {
      setMessage({ type: 'error', text: error.message || 'Error al registrar usuario.' });
    } else {
      setMessage({
        type: 'success',
        text: 'Usuario creado con éxito. Si tu proyecto tiene confirmación de email activada, revisá tu casilla, o ingresá directamente.'
      });
      setTab('login');
    }
  };

  const handleLogout = async () => {
    await signOut();
    setMessage({ type: 'success', text: 'Sesión cerrada.' });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? "Mi Cuenta & Equipo de Cumplimiento (AUBASA)" : "Autenticación Oficial SGAS ISO 37001"}
      subtitle="Acceso multiusuario seguro para el equipo de Cumplimiento BALP"
      maxWidth="max-w-lg"
    >
      <div className="space-y-5">
        {/* Banner de Supabase Status */}
        {!isSupabaseConfigured && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block">Falta configurar la clave `anon` de Supabase:</strong>
              Copia la clave <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">anon public</code> desde Project Settings ➔ API en Supabase y colócala en tu archivo <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">.env</code> para habilitar el login en vivo.
            </div>
          </div>
        )}

        {/* Feedback Alert */}
        {message && (
          <div className={`p-3.5 rounded-xl flex items-center gap-2 text-xs font-semibold border ${
            message.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* USUARIO CONECTADO */}
        {user ? (
          <div className="space-y-4">
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-slate-900 truncate">
                    {user.user_metadata?.full_name || user.email}
                  </h4>
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
                    Activo
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5">{user.email}</p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-bold text-slate-700">
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                    {user.user_metadata?.role || 'Oficial de Cumplimiento'}
                  </span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-sky-700">
                    {user.user_metadata?.concesion || 'BALP 50 km'}
                  </span>
                </div>
              </div>
            </div>

            {/* SECCIÓN DEL EQUIPO DE 4 PERSONAS */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#0284c7]" />
                  Equipo de Trabajo (4 Miembros)
                </h5>
                <span className="text-[10px] font-bold bg-white text-[#0284c7] px-2 py-0.5 rounded border border-sky-200">
                  Plan Supabase Cloud
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Podés crear a tus 3 colegas directamente registrándolos acá con su correo o desde el panel de Supabase en <strong>Authentication ➔ Users ➔ Add User</strong>.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div>
                      <strong className="text-slate-800 block">{user.email} (Tú)</strong>
                      <span className="text-[10px] text-slate-500">Oficial de Cumplimiento Principal</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">En línea</span>
                </div>

                <div className="p-2.5 bg-white/70 rounded-lg border border-dashed border-slate-300 flex items-center justify-between text-slate-500">
                  <span>+ Miembro 2 (Auditor Interno)</span>
                  <span className="text-[10px] font-semibold text-slate-400">Pendiente de registro</span>
                </div>
                <div className="p-2.5 bg-white/70 rounded-lg border border-dashed border-slate-300 flex items-center justify-between text-slate-500">
                  <span>+ Miembro 3 (Compras & Contrataciones)</span>
                  <span className="text-[10px] font-semibold text-slate-400">Pendiente de registro</span>
                </div>
                <div className="p-2.5 bg-white/70 rounded-lg border border-dashed border-slate-300 flex items-center justify-between text-slate-500">
                  <span>+ Miembro 4 (Tesorería / Obras)</span>
                  <span className="text-[10px] font-semibold text-slate-400">Pendiente de registro</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        ) : (
          /* FORMULARIO DE INICIO DE SESIÓN / REGISTRO */
          <div>
            {/* Pestañas Login vs Registro */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setTab('login'); setMessage(null); }}
                className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                  tab === 'login'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => { setTab('signup'); setMessage(null); }}
                className={`flex-1 py-2 rounded-lg text-center transition-all cursor-pointer ${
                  tab === 'signup'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Crear Mi Cuenta (Oficial)
              </button>
            </div>

            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico (AUBASA)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="oficial.cumplimiento@aubasa.com.ar"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-[#0284c7] hover:bg-sky-600 text-white rounded-lg text-xs font-black shadow-md shadow-sky-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Ingresando...' : 'Acceder al SGAS BALP'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre y Apellido</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Sergio Montes"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="usuario@aubasa.com.ar"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rol / Función en el SGAS</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none bg-white font-medium"
                  >
                    <option value="Oficial de Cumplimiento SGAS">Oficial de Cumplimiento Principal (ISO 37001 Cl. 5.3)</option>
                    <option value="Auditor Interno SGAS">Auditor Interno (Cl. 9.2)</option>
                    <option value="Responsable de Compras & Contrataciones">Responsable de Compras & Contrataciones</option>
                    <option value="Control de Tesorería & Pagos">Control de Tesorería & Pagos</option>
                    <option value="Supervisión de Obras BALP">Supervisión de Obras BALP (LEMIT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña (Mínimo 6 caracteres)</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Creando cuenta...' : 'Registrar Usuario en Supabase'}
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
