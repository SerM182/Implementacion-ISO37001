import React from 'react';
import {
  ShieldAlert,
  LayoutDashboard,
  Bot,
  Grid,
  Building2,
  FileText,
  CheckSquare,
  AlertTriangle,
  FolderCheck,
  GraduationCap,
  Printer,
  Database,
  User,
  UserCheck,
  LogIn,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Navbar({
  activeTab,
  onTabChange,
  onOpenExportModal,
  onPrintMaster,
  onOpenAuthModal
}) {
  const { user, signOut } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'gapAnalysis', label: 'Diagnóstico (32)', icon: CheckSquare, badge: 'IRAM' },
    { id: 'policies', label: 'POEs (10)', icon: FileText },
    { id: 'records', label: 'Registros (7.5)', icon: FolderCheck, badge: '12 Plantillas', highlight: true },
    { id: 'risks', label: 'Riesgos', icon: Grid },
    { id: 'dueDiligence', label: 'Proveedores', icon: Building2 },
    { id: 'training', label: 'Capacitación', icon: GraduationCap },
    { id: 'redFlags', label: 'Canal Ético', icon: AlertTriangle, badge: '37002' },
    { id: 'advisor', label: 'Asistente IA', icon: Bot, isAi: true }
  ];

  const handleQuickLogout = async (e) => {
    e.stopPropagation();
    if (window.confirm('¿Desea cerrar la sesión del usuario actual?')) {
      await signOut();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs no-print select-none">
      <div className="w-full px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-15 gap-2">

          {/* 1. Logo Institucional AUBASA SGAS */}
          <div
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
            onClick={() => onTabChange('dashboard')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0284c7] to-[#0ea5e9] flex items-center justify-center shadow-md shadow-sky-200 border border-sky-300 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-[#0369a1]">AUBASA</span>
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">SGAS</span>
                <span className="px-1.5 py-0.2 text-[8px] font-black uppercase bg-sky-100 text-sky-800 border border-sky-200 rounded">
                  37001
                </span>
              </div>
              <p className="text-[9px] font-bold text-slate-500 tracking-tight hidden sm:block">
                BALP 50 km • Contratación • Pagos • Obras
              </p>
            </div>
          </div>

          {/* 2. Menú de Navegación Compacto y Limpio (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-50/90 p-1 rounded-xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  title={item.label}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-black uppercase tracking-tight transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0284c7] text-white shadow-xs'
                      : item.isAi
                      ? 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100 hover:text-indigo-900 border border-indigo-200/60'
                      : item.highlight
                      ? 'text-rose-700 hover:text-rose-900 hover:bg-rose-50 font-black'
                      : 'text-slate-700 hover:text-[#0284c7] hover:bg-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${
                    isActive ? 'text-white' : item.isAi ? 'text-indigo-600' : item.highlight ? 'text-rose-600' : 'text-slate-500'
                  }`} />
                  <span>{item.label}</span>
                  {item.badge && !isActive && (
                    <span className={`px-1 py-0.2 text-[8px] font-black rounded ${
                      item.highlight
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-sky-100 text-sky-800 border border-sky-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. Acciones Globales: Usuario / Cerrar Sesión, Base de Datos, PDF */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Si el usuario está conectado: muestra su perfil y botón de Cerrar Sesión */}
            {user ? (
              <div className="flex items-center gap-1 bg-emerald-50/90 border border-emerald-300 rounded-lg p-1 text-xs">
                <button
                  onClick={onOpenAuthModal}
                  title="Ver perfil de usuario y equipo"
                  className="flex items-center gap-1.5 px-2 py-1 hover:bg-emerald-100 rounded text-emerald-900 font-bold transition-colors cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate max-w-[100px] sm:max-w-[130px]">
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </button>

                {/* Botón directo de Cerrar Sesión */}
                <button
                  onClick={handleQuickLogout}
                  title="Cerrar Sesión de este usuario"
                  className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-rose-50 text-rose-700 hover:text-rose-800 border border-rose-200 rounded text-[11px] font-black transition-all cursor-pointer shadow-2xs"
                >
                  <LogOut className="w-3 h-3 text-rose-600" />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              /* Si no está conectado: Botón de Iniciar Sesión */
              <button
                onClick={onOpenAuthModal}
                title="Iniciar Sesión Oficial o Registrar Usuario"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg text-xs font-black transition-all shadow-xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-white" />
                <span>Iniciar Sesión</span>
              </button>
            )}

            <button
              onClick={onOpenExportModal}
              title="Administrar Base de Datos y Respaldos"
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-[#0284c7]" />
              <span className="hidden md:inline">Base de Datos</span>
            </button>

            {onPrintMaster && (
              <button
                onClick={onPrintMaster}
                title="Generar Reporte Oficial en PDF"
                className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">PDF</span>
              </button>
            )}
          </div>
        </div>

        {/* Menú de Navegación Móvil y Tablets con Scroll Suave */}
        <div className="xl:hidden flex items-center gap-1 py-1.5 overflow-x-auto no-scrollbar border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black uppercase whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0284c7] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

