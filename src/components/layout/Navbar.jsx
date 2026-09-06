import React, { useEffect, useRef, useState } from 'react';
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
  Users,
  Printer,
  Database,
  User,
  LogIn,
  LogOut,
  Crown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

// Barra de navegación con degradados + flechas que avisan cuando hay más pestañas
// fuera de la vista (los tabs no entran completos ni en desktop angosto ni en móvil).
function ScrollableNav({ className, children }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return undefined;
    const onScroll = () => updateScrollState();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollBy = (delta) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="relative min-w-0">
      {canScrollLeft && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10" />
          <button
            onClick={() => scrollBy(-120)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-white border border-slate-300 shadow-xs flex items-center justify-center cursor-pointer"
            title="Ver pestañas anteriores"
          >
            <ChevronLeft className="w-3 h-3 text-slate-600" />
          </button>
        </>
      )}
      <div ref={scrollRef} className={className}>
        {children}
      </div>
      {canScrollRight && (
        <>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10" />
          <button
            onClick={() => scrollBy(120)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-white border border-slate-300 shadow-xs flex items-center justify-center cursor-pointer"
            title="Ver más pestañas"
          >
            <ChevronRight className="w-3 h-3 text-slate-600" />
          </button>
        </>
      )}
    </div>
  );
}

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
    { id: 'gapAnalysis', label: 'Diagnóstico', icon: CheckSquare, badge: 'ISO' },
    { id: 'policies', label: 'POEs', icon: FileText, badge: '10' },
    { id: 'records', label: 'Registros', icon: FolderCheck, badge: '7.5', highlight: true },
    { id: 'risks', label: 'Riesgos', icon: Grid },
    { id: 'dueDiligence', label: 'Proveedores', icon: Building2 },
    { id: 'training', label: 'Capacitación', icon: GraduationCap },
    { id: 'redFlags', label: 'Canal Ético', icon: AlertTriangle, badge: '37002' },
    { id: 'users', label: 'Usuarios', icon: Users, badge: 'Admin' },
    { id: 'advisor', label: 'Asistente IA', icon: Bot, isAi: true }
  ];

  const handleQuickLogout = async (e) => {
    e.stopPropagation();
    if (window.confirm('¿Desea cerrar la sesión de su usuario de AUBASA SGAS?')) {
      await signOut();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs no-print select-none w-full">
      <div className="w-full px-2 sm:px-3 lg:px-4">
        <div className="flex items-center justify-between h-13 sm:h-15 gap-1.5 sm:gap-2">

          {/* 1. Logo Institucional AUBASA SGAS */}
          <div
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group shrink-0"
            onClick={() => onTabChange('dashboard')}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#0284c7] to-[#0ea5e9] flex items-center justify-center shadow-md shadow-sky-200 border border-sky-300 group-hover:scale-105 transition-transform shrink-0">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm font-black tracking-tight text-[#0369a1]">AUBASA</span>
                <span className="text-[9px] sm:text-[10px] font-black text-slate-800 uppercase tracking-wider">SGAS</span>
                <span className="px-1 py-0.2 text-[7px] sm:text-[8px] font-black uppercase bg-sky-100 text-sky-800 border border-sky-200 rounded">
                  37001
                </span>
              </div>
              <p className="text-[8px] sm:text-[9px] font-bold text-slate-500 tracking-tight hidden lg:block">
                BALP 50 km • Obras • Pagos • Compras
              </p>
            </div>
          </div>

          {/* 2. Menú de Navegación Compacto y Fluido (Desktop / Pantallas Grandes) */}
          <ScrollableNav className="hidden lg:flex items-center gap-0.5 bg-slate-50/90 p-0.5 sm:p-1 rounded-xl border border-slate-200/80 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  title={item.label}
                  className={`flex items-center gap-1 px-1.5 xl:px-2 py-1 rounded-lg text-[10px] xl:text-[11px] font-black uppercase tracking-tight transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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
                    <span className={`hidden 2xl:inline-block px-1 py-0.2 text-[8px] font-black rounded ${
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
          </ScrollableNav>

          {/* 3. Acciones Globales: Usuario / Superadmin, Cerrar Sesión Rojo Prominente, Base de Datos, PDF */}
          <div className="flex items-center gap-1 shrink-0">
            {user ? (
              <div className="flex items-center gap-1 bg-amber-50/90 border border-amber-300 rounded-lg p-0.5 text-xs">
                {/* Botón de Perfil & Permisos de Administrador */}
                <button
                  onClick={onOpenAuthModal}
                  title="Centro de Control de Administrador y Equipo"
                  className="flex items-center gap-1 px-1.5 py-0.5 sm:py-1 hover:bg-amber-100 rounded text-amber-950 font-black transition-colors cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate max-w-[70px] sm:max-w-[100px] text-[10px] sm:text-[11px] font-bold">
                    {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                  </span>
                  <span className="px-1 py-0.2 text-[7px] sm:text-[8px] font-black uppercase bg-amber-400 text-slate-950 rounded shadow-2xs">
                    Admin
                  </span>
                </button>

                {/* BOTÓN ROJO DE LOG OUT / CERRAR SESIÓN (Ultra Prominente) */}
                <button
                  onClick={handleQuickLogout}
                  title="Cerrar Sesión del usuario actual"
                  className="flex items-center gap-1 px-2 py-0.5 sm:py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] sm:text-[11px] font-black transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                >
                  <LogOut className="w-3 h-3 text-white shrink-0" />
                  <span className="font-extrabold">Salir</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                title="Iniciar Sesión Oficial o Registrar Usuario"
                className="flex items-center gap-1 px-2.5 py-1 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg text-xs font-black transition-all shadow-xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-white" />
                <span>Iniciar Sesión</span>
              </button>
            )}

            <button
              onClick={onOpenExportModal}
              title="Administrar Base de Datos y Respaldos"
              className="flex items-center gap-1 px-1.5 sm:px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-[#0284c7]" />
              <span className="hidden xl:inline text-[11px]">Base de Datos</span>
            </button>

            {onPrintMaster && (
              <button
                onClick={onPrintMaster}
                title="Generar Reporte Oficial en PDF"
                className="flex items-center gap-1 px-1.5 sm:px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline text-[11px]">PDF</span>
              </button>
            )}
          </div>
        </div>

        {/* Menú de Navegación Móvil y Tablets con Scroll Suave */}
        <ScrollableNav className="lg:hidden flex items-center gap-1 py-1.5 overflow-x-auto no-scrollbar border-t border-slate-100">
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
          {user && (
            <button
              onClick={handleQuickLogout}
              className="flex items-center gap-1 px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[11px] font-black uppercase whitespace-nowrap transition-all shrink-0 cursor-pointer shadow-xs ml-auto"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          )}
        </ScrollableNav>
      </div>
    </header>
  );
}
