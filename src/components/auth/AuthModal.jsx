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
  ShieldAlert,
  Crown,
  Sparkles,
  Database,
  Check
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { user, signIn, signUp, signOut, updateProfile, setMasterAdminRole, isSupabaseConfigured } = useAuth();
  const [tab, setTab] = useState('profile'); // 'profile' | 'team_create' | 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Administrador General SGAS');
  const [area, setArea] = useState('Gerencia General & Oficialía de Cumplimiento SGAS');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const currentRole = user?.user_metadata?.role || 'Administrador General SGAS';
  const isSuperAdmin = user?.user_metadata?.isAdmin || currentRole.includes('Administrador');

  const handleGrantMasterAdmin = async () => {
    setLoading(true);
    setMessage(null);
    const { error } = await setMasterAdminRole();
    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: error.message || 'Error al actualizar permisos de administrador.' });
    } else {
      setMessage({
        type: 'success',
        text: '👑 ¡Permisos de Administrador Maestro concedidos! Ahora tenés acceso y control total sobre toda la aplicación AUBASA SGAS.'
      });
    }
  };

  const handleSwitchRole = async (newRole) => {
    setLoading(true);
    setMessage(null);
    const { error } = await updateProfile({
      role: newRole,
      isAdmin: true,
      permissions: 'full_admin_access'
    });
    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: error.message || 'Error al cambiar rol.' });
    } else {
      setMessage({ type: 'success', text: `Rol actualizado a: ${newRole} (con permisos de Administrador).` });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await signIn(email.trim(), password);
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

    const { error } = await signUp(email.trim(), password, {
      full_name: fullName.trim(),
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
        text: `¡Usuario ${email} creado con éxito! Ya puede ingresar con este correo y contraseña.`
      });
      setEmail('');
      setPassword('');
      setFullName('');
      setTab('profile');
    }
  };

  const handleLogout = async () => {
    await signOut();
    setMessage({ type: 'success', text: 'Sesión cerrada.' });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? "Centro de Control de Usuario & Administrador SGAS" : "Autenticación Oficial SGAS ISO 37001"}
      subtitle="Gestión de roles, permisos maestros y equipo de trabajo BALP (50 km)"
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Banner de Supabase Status */}
        {!isSupabaseConfigured && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block">Falta configurar la clave `anon` de Supabase:</strong>
              Verifique las variables de entorno en Vercel o archivo .env.
            </div>
          </div>
        )}

        {/* Feedback Alert */}
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

        {/* USUARIO CONECTADO */}
        {user ? (
          <div className="space-y-4">
            {/* Tarjeta de Perfil & Nivel de Permisos */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-2xl p-4.5 flex items-start gap-3.5 shadow-sm">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#0284c7] to-[#0ea5e9] text-white flex items-center justify-center font-black text-lg shadow-md shrink-0 border border-sky-300">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-black text-slate-900 truncate">
                    {user.user_metadata?.full_name || user.email}
                  </h4>
                  <span className="px-2.5 py-0.5 text-[10px] font-black uppercase bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-full flex items-center gap-1 shadow-xs">
                    <Crown className="w-3 h-3 text-slate-950" />
                    Permisos Administrador Total
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-0.5">{user.email}</p>

                <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] font-bold text-slate-700">
                  <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-sky-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                    Rol: {currentRole}
                  </span>
                  <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700">
                    BALP 50 km • Contratación • Pagos • Obras
                  </span>
                </div>
              </div>
            </div>

            {/* BOTÓN MAESTRO DE SUPERADMIN */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-sky-50 border border-amber-300 rounded-xl p-3.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-black text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                    <Crown className="w-4 h-4 text-amber-600" />
                    Acceso Total & Permisos de Administrador
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Como Administrador podés ver, crear, editar, firmar y borrar cualquier registro, riesgo, proveedor o denuncia.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGrantMasterAdmin}
                  disabled={loading}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-lg shadow-md flex items-center gap-1.5 shrink-0 transition-all cursor-pointer hover:scale-[1.02] disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Reasegurar Control Maestro</span>
                </button>
              </div>
            </div>

            {/* SELECTOR RÁPIDO DE ROL EN VIVO */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5 shadow-2xs">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wide">
                Cambiar Rol Activo del Usuario (Simular / Asignar Función)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { name: 'Administrador General SGAS', desc: 'Control maestro de todo el sistema' },
                  { name: 'Oficial de Cumplimiento SGAS', desc: 'Clausula 5.3 ISO 37001' },
                  { name: 'Auditor Interno SGAS', desc: 'Clausula 9.2 ISO 37001' },
                  { name: 'Responsable de Compras & Contrataciones', desc: 'Clausula 8.2 y 8.6' },
                  { name: 'Control de Tesorería & Pagos', desc: 'Clausula 8.3 Doble Token' },
                  { name: 'Supervisión de Obras BALP', desc: 'Clausula 8.4 Ensayos LEMIT' }
                ].map(r => (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => handleSwitchRole(r.name)}
                    disabled={loading}
                    className={`p-2.5 text-left rounded-lg border transition-all cursor-pointer flex items-start gap-2 ${
                      currentRole === r.name
                        ? 'bg-sky-50 border-sky-400 text-sky-950 font-black shadow-2xs ring-1 ring-sky-300'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-bold flex items-center gap-1">
                        {currentRole === r.name && <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />}
                        <span className="truncate">{r.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* SECCIÓN DEL EQUIPO DE 4 PERSONAS & REGISTRO DE COLEGAS */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#0284c7]" />
                  Equipo de Trabajo AUBASA BALP (4 Miembros)
                </h5>
                <span className="text-[10px] font-bold bg-white text-[#0284c7] px-2 py-0.5 rounded border border-sky-200">
                  Supabase Cloud Multi-User
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Podés crear a tus 3 colegas para que tengan su propio usuario y contraseña:
              </p>

              {/* Botón para alternar a formulario de creación de colega */}
              {tab !== 'team_create' ? (
                <button
                  type="button"
                  onClick={() => setTab('team_create')}
                  className="w-full py-2 bg-white hover:bg-sky-50 text-[#0284c7] border border-sky-300 rounded-lg text-xs font-black shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>+ Crear Usuario para un Colega del Equipo</span>
                </button>
              ) : (
                <form onSubmit={handleSignUp} className="bg-white p-3.5 rounded-xl border border-sky-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <strong className="text-xs font-black text-slate-900">Registrar Colega en Supabase</strong>
                    <button
                      type="button"
                      onClick={() => setTab('profile')}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej: Lic. Marcelo Rossi"
                      className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg outline-none focus:border-[#0284c7]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="colega@aubasa.com.ar"
                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg outline-none focus:border-[#0284c7]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Contraseña Inicial</label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-1.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg outline-none focus:border-[#0284c7]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Rol / Función</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs font-bold text-slate-800 border border-slate-300 rounded-lg outline-none bg-white"
                    >
                      <option value="Administrador General SGAS">👑 Administrador General SGAS</option>
                      <option value="Oficial de Cumplimiento SGAS">🛡️ Oficial de Cumplimiento SGAS</option>
                      <option value="Auditor Interno SGAS">🔍 Auditor Interno SGAS</option>
                      <option value="Responsable de Compras & Contrataciones">📑 Responsable de Compras & Contrataciones</option>
                      <option value="Control de Tesorería & Pagos">💳 Control de Tesorería & Pagos</option>
                      <option value="Supervisión de Obras BALP">🏗️ Supervisión de Obras BALP</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? 'Creando...' : 'Guardar y Dar de Alta en Supabase'}
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </button>
                </form>
              )}
            </div>

            {/* Acciones de Cierre de Sesión */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-[11px] text-slate-500 font-mono">
                ID: {user.id?.substring(0, 8)}...
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-lg text-xs font-black transition-all cursor-pointer shadow-2xs"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        ) : (
          /* FORMULARIO DE INICIO DE SESIÓN / REGISTRO SI NO ESTÁ AUTENTICADO */
          <div>
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
                    placeholder="usuario@aubasa.com.ar"
                    className="w-full pl-9 pr-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-[#0284c7] placeholder:text-slate-400 outline-none"
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
                    className="w-full pl-9 pr-3 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-200 focus:border-[#0284c7] placeholder:text-slate-400 outline-none"
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
          </div>
        )}
      </div>
    </Modal>
  );
}
