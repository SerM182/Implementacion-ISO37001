import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Crown,
  Key,
  Mail,
  Building,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Search,
  Filter,
  X,
  Copy,
  Check,
  Database,
  Lock,
  Eye,
  RefreshCw,
  FileCode,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { USER_ROLES_CATALOG } from '../../data/initialUsersData.js';

export default function UsersManagementView({
  users = [],
  onAddUser,
  onUpdateUser,
  onDeleteUser
}) {
  const { user: currentUser, setMasterAdminRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [permissionFilter, setPermissionFilter] = useState('all');

  // Modales y drawers
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [adminNotification, setAdminNotification] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    area: 'Oficina de Cumplimiento',
    cargo: '',
    rol: 'Oficial de Cumplimiento ISO 37001',
    permisos: 'full_admin_access',
    isAdmin: true,
    estado: 'activo',
    telefono: '',
    modulosPermitidos: ['all']
  });

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setFormData({
      nombre: '',
      email: '',
      area: 'Oficina de Cumplimiento',
      cargo: '',
      rol: 'Oficial de Cumplimiento ISO 37001',
      permisos: 'full_admin_access',
      isAdmin: true,
      estado: 'activo',
      telefono: '',
      modulosPermitidos: ['all']
    });
    setIsUserModalOpen(true);
  };

  const handleOpenEditModal = (userItem) => {
    setEditingUser(userItem);
    setFormData({
      nombre: userItem.nombre || '',
      email: userItem.email || '',
      area: userItem.area || 'Oficina de Cumplimiento',
      cargo: userItem.cargo || '',
      rol: userItem.rol || 'Oficial de Cumplimiento ISO 37001',
      permisos: userItem.permisos || 'edit_compliance',
      isAdmin: !!userItem.isAdmin,
      estado: userItem.estado || 'activo',
      telefono: userItem.telefono || '',
      modulosPermitidos: userItem.modulosPermitidos || ['all']
    });
    setIsUserModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.email.trim()) {
      alert('Por favor ingrese el nombre y el correo electrónico del usuario.');
      return;
    }

    if (editingUser) {
      const updated = {
        ...editingUser,
        ...formData,
        email: formData.email.trim().toLowerCase()
      };
      onUpdateUser(updated);
    } else {
      const newUser = {
        id: `USR-${String(Date.now()).slice(-4)}`,
        ...formData,
        email: formData.email.trim().toLowerCase(),
        fechaAlta: new Date().toISOString().split('T')[0]
      };
      onAddUser(newUser);
    }

    setIsUserModalOpen(false);
  };

  const handleToggleAdminStatus = (userItem) => {
    const updated = {
      ...userItem,
      isAdmin: !userItem.isAdmin,
      permisos: !userItem.isAdmin ? 'full_admin_access' : 'edit_compliance',
      rol: !userItem.isAdmin ? 'Administrador General SGAS' : 'Oficial de Cumplimiento ISO 37001'
    };
    onUpdateUser(updated);
  };

  const handleGrantMasterAdminToCurrent = async () => {
    try {
      await setMasterAdminRole();
      // También asegurarse de actualizar en la lista de usuarios
      const targetEmail = currentUser?.email || 'sgiaubasa@gmail.com';
      const existing = users.find(u => u.email?.toLowerCase() === targetEmail.toLowerCase());
      if (existing) {
        onUpdateUser({
          ...existing,
          rol: 'Administrador General SGAS',
          isAdmin: true,
          permisos: 'full_admin_access'
        });
      }
      setAdminNotification(`¡Permisos de Administrador Maestro actualizados con éxito para ${targetEmail}!`);
      setTimeout(() => setAdminNotification(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Error al actualizar permisos de administrador.');
    }
  };

  // Filtrado
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.area?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.rol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.cargo?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || u.rol === roleFilter;
    const matchesPermission =
      permissionFilter === 'all' ||
      (permissionFilter === 'admin' && u.isAdmin) ||
      (permissionFilter === 'edit' && !u.isAdmin && u.permisos === 'edit_compliance') ||
      (permissionFilter === 'view' && u.permisos === 'view_only');

    return matchesSearch && matchesRole && matchesPermission;
  });

  // Métricas
  const totalAdmins = users.filter((u) => u.isAdmin).length;
  const totalActive = users.filter((u) => u.estado === 'activo').length;

  const sqlSnippet = `-- TABLA DE USUARIOS DEL SISTEMA SGAS AUBASA ISO 37001
CREATE TABLE IF NOT EXISTS public.app_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    area TEXT,
    cargo TEXT,
    rol TEXT DEFAULT 'Oficial de Cumplimiento ISO 37001',
    permisos TEXT DEFAULT 'edit_compliance',
    is_admin BOOLEAN DEFAULT true,
    estado TEXT DEFAULT 'activo',
    fecha_alta DATE DEFAULT CURRENT_DATE,
    telefono TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- HABILITAR SEGURIDAD RLS (Row Level Security)
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura y escritura a usuarios autenticados"
ON public.app_users FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- INSERTAR USUARIO MASTER ADMIN sgiaubasa@gmail.com
INSERT INTO public.app_users (id, email, nombre, area, cargo, rol, permisos, is_admin, estado, fecha_alta)
VALUES (
    'USR-001',
    'sgiaubasa@gmail.com',
    'Administrador General SGAS',
    'Dirección General & Gerencia de Cumplimiento',
    'Administrador Maestro del Sistema SGAS',
    'Administrador General SGAS',
    'full_admin_access',
    true,
    'activo',
    CURRENT_DATE
)
ON CONFLICT (email) DO UPDATE SET
    is_admin = true,
    permisos = 'full_admin_access',
    rol = 'Administrador General SGAS';
`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSnippet);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-slate-800">

      {/* 1. Header Principal */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 bg-sky-50 text-[#0284c7] rounded-xl border border-sky-200">
              <Users className="w-5 h-5" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0369a1] bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
              Cláusula 5.3 & 7.2 ISO 37001
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Gestión de Usuarios, Roles & Equipo de Cumplimiento SGAS
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            Administración del equipo de 4 personas y roles directivos asignados a la Concesión BALP (50 km). Asignación de permisos de edición, supervisión de contrataciones, pagos y obras viales.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setShowSqlGuide(!showSqlGuide)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Ver Script SQL para Supabase"
          >
            <FileCode className="w-4 h-4 text-[#0284c7]" />
            <span>Script SQL Supabase</span>
          </button>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* 2. Banner de Permisos de Administrador Maestro para sgiaubasa@gmail.com */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-sky-500/10 border border-amber-300 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-amber-500 text-white rounded-xl shadow-md shrink-0">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                Permisos de Administrador Maestro (Master Admin)
              </h3>
              <span className="px-2 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black uppercase rounded shadow-2xs">
                Acceso Total
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-1">
              El usuario <strong className="font-mono text-slate-900 bg-white/80 px-1.5 py-0.5 rounded border border-amber-300">sgiaubasa@gmail.com</strong> cuenta con privilegios absolutos para crear, editar, eliminar evidencias, matrices de riesgos, socios y gestionar todo el equipo de AUBASA.
            </p>
          </div>
        </div>

        <button
          onClick={handleGrantMasterAdminToCurrent}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 hover:text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Confirmar Admin a sgiaubasa@gmail.com</span>
        </button>
      </div>

      {adminNotification && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{adminNotification}</span>
        </div>
      )}

      {/* 3. Acordeón con Código SQL para Supabase */}
      {showSqlGuide && (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-sky-400" />
              <h3 className="text-sm font-bold text-white">
                Script SQL para Gestión de Usuarios en Supabase Cloud
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copySql}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? '¡Copiado!' : 'Copiar SQL'}</span>
              </button>
              <button
                onClick={() => setShowSqlGuide(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Puedes copiar y pegar este código directamente en el <strong>SQL Editor</strong> de tu proyecto en Supabase (<code className="text-sky-300">pjjoulwltioxqbgukoti.supabase.co</code>) para estructurar la tabla <code className="text-sky-300">app_users</code> con RLS y dar de alta al administrador.
          </p>
          <pre className="bg-slate-950 p-4 rounded-xl text-[11px] font-mono text-sky-300 overflow-x-auto border border-slate-800">
            {sqlSnippet}
          </pre>
        </div>
      )}

      {/* 4. Tarjetas KPI del Equipo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Usuarios</span>
            <Users className="w-5 h-5 text-[#0284c7]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{users.length}</span>
            <span className="text-xs font-semibold text-slate-500">miembros registrados</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Administradores</span>
            <Crown className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-700">{totalAdmins}</span>
            <span className="text-xs font-semibold text-slate-500">con control total</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Usuarios Activos</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-700">{totalActive}</span>
            <span className="text-xs font-semibold text-slate-500">habilitados en SGAS</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Alcance Operativo</span>
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-700">BALP</span>
            <span className="text-xs font-semibold text-slate-500">50 km Concesión</span>
          </div>
        </div>
      </div>

      {/* 5. Barra de Búsqueda y Filtros */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, correo, área o rol de usuario..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200 rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={permissionFilter}
              onChange={(e) => setPermissionFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs text-slate-700 rounded-xl px-3 py-2.5 outline-none cursor-pointer"
            >
              <option value="all">Todos los Permisos</option>
              <option value="admin">Solo Administradores</option>
              <option value="edit">Edición / Oficiales</option>
              <option value="view">Solo Lectura</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 px-1">
          <div>
            Mostrando <strong className="text-slate-900 font-bold">{filteredUsers.length}</strong> de <strong className="text-slate-900 font-bold">{users.length}</strong> usuarios en el sistema
          </div>
          {(searchQuery || permissionFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setPermissionFilter('all');
              }}
              className="text-[#0284c7] hover:underline font-bold text-[11px] cursor-pointer"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* 6. Tabla de Usuarios y Roles */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                <th className="p-3.5 pl-5">Usuario / Correo</th>
                <th className="p-3.5">Área & Cargo</th>
                <th className="p-3.5">Rol en SGAS</th>
                <th className="p-3.5 text-center">Nivel de Permisos</th>
                <th className="p-3.5 text-center">Estado</th>
                <th className="p-3.5 pr-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.map((item) => {
                const isMasterAdmin = item.email?.toLowerCase().includes('sgiaubasa') || (item.isAdmin && item.permisos === 'full_admin_access');

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Usuario / Email */}
                    <td className="p-3.5 pl-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs uppercase shrink-0 ${
                          item.isAdmin
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-sky-100 text-[#0369a1] border border-sky-200'
                        }`}>
                          {item.nombre ? item.nombre.charAt(0) : item.email.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{item.nombre}</span>
                            {item.isAdmin && (
                              <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" title="Administrador Maestro" />
                            )}
                          </div>
                          <span className="font-mono text-[11px] text-slate-500 block">{item.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Área & Cargo */}
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-800 block text-xs">{item.area}</span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[200px]" title={item.cargo}>
                        {item.cargo}
                      </span>
                    </td>

                    {/* Rol SGAS */}
                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        item.isAdmin
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : 'bg-sky-50 text-[#0369a1] border-sky-200'
                      }`}>
                        <Shield className="w-3 h-3 shrink-0" />
                        {item.rol}
                      </span>
                    </td>

                    {/* Nivel de Permisos */}
                    <td className="p-3.5 text-center whitespace-nowrap">
                      {item.isAdmin ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400 text-slate-950">
                          <Key className="w-3 h-3" />
                          ADMIN TOTAL
                        </span>
                      ) : item.permisos === 'edit_compliance' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          EDICIÓN SGAS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          SOLO LECTURA
                        </span>
                      )}
                    </td>

                    {/* Estado */}
                    <td className="p-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Activo
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="p-3.5 pr-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleAdminStatus(item)}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            item.isAdmin
                              ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-900'
                          }`}
                          title={item.isAdmin ? "Revocar privilegios Admin" : "Otorgar privilegios Admin"}
                        >
                          <Crown className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-[#0284c7] rounded-lg transition-all cursor-pointer"
                          title="Editar usuario"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {item.email !== 'sgiaubasa@gmail.com' && (
                          <button
                            onClick={() => {
                              if (window.confirm(`¿Desea eliminar al usuario ${item.nombre}?`)) {
                                onDeleteUser(item.id);
                              }
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg transition-all cursor-pointer"
                            title="Eliminar usuario"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. Modal de Crear / Editar Usuario */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div
            className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-8 transform transition-all text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-sky-50 text-[#0284c7] rounded-xl border border-sky-200">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingUser ? 'Editar Usuario / Rol SGAS' : 'Registrar Nuevo Usuario en el Equipo'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Asignación funcional y permisos normativos ISO 37001
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px] tracking-wider">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Laura Gómez"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px] tracking-wider">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@aubasa.com.ar o gmail.com"
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200 text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px] tracking-wider">
                      Área / Departamento
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200 text-xs"
                    >
                      <option value="Oficina de Cumplimiento">Oficina de Cumplimiento</option>
                      <option value="Dirección General">Dirección General</option>
                      <option value="Planificación y Obras Viales">Planificación y Obras Viales</option>
                      <option value="Compras, Licitaciones y Contrataciones">Compras y Licitaciones</option>
                      <option value="Tesorería y Administración">Tesorería y Pagos</option>
                      <option value="Auditoría Interna">Auditoría Interna</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px] tracking-wider">
                      Cargo Funcional
                    </label>
                    <input
                      type="text"
                      value={formData.cargo}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      placeholder="Ej: Jefa de Compras"
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px] tracking-wider">
                      Rol Asignado en SGAS
                    </label>
                    <select
                      value={formData.rol}
                      onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200 text-xs"
                    >
                      {USER_ROLES_CATALOG.map((r) => (
                        <option key={r.id} value={r.nombre}>
                          {r.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1 uppercase text-[10px] tracking-wider">
                      Nivel de Permisos
                    </label>
                    <select
                      value={formData.permisos}
                      onChange={(e) => {
                        const perm = e.target.value;
                        setFormData({
                          ...formData,
                          permisos: perm,
                          isAdmin: perm === 'full_admin_access'
                        });
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-800 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200 text-xs"
                    >
                      <option value="full_admin_access">Acceso Total (Master Admin)</option>
                      <option value="edit_compliance">Edición & Carga de Evidencias</option>
                      <option value="view_only">Solo Lectura / Auditoría Externa</option>
                    </select>
                  </div>
                </div>

                {/* Switch de Administrador */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">Privilegios de Administrador Maestro</span>
                      <span className="text-[10px] text-slate-500">Permite modificar y borrar cualquier elemento del sistema</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.isAdmin}
                    onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="bg-slate-50 -mx-6 -mb-6 p-4 px-6 border-t border-slate-200 flex items-center justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  {editingUser ? 'Guardar Cambios' : 'Registrar Usuario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
