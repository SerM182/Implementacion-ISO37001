import React, { useState } from 'react';
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
  LogIn
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Navbar({
  activeTab,
  onTabChange,
  onOpenExportModal,
  onPrintMaster,
  onOpenAuthModal,
  workspaceMode = 'blank'
}) {
  const { user } = useAuth();

  const navSections = [
    {
      group: 'Estrategia & Norma',
      items: [
        { id: 'dashboard', label: 'Dashboard', shortLabel: 'Dashboard', icon: LayoutDashboard },
        { id: 'gapAnalysis', label: 'Checklist 32 Requisitos', shortLabel: 'Diagnóstico ISO', icon: CheckSquare, badge: 'IRAM' },
        { id: 'policies', label: '10 Procedimientos POEs', shortLabel: 'POEs', icon: FileText }
      ]
    },
    {
      group: 'Operación & Evidencias BALP',
      items: [
        { id: 'records', label: 'Registros Obligatorios (7.5)', shortLabel: 'Registros (7.5)', icon: FolderCheck, badge: '12 Plantillas', highlight: true },
        { id: 'risks', label: 'Matriz de Riesgos', shortLabel: 'Riesgos', icon: Grid },
        { id: 'dueDiligence', label: 'Proveedores & DD', shortLabel: 'Proveedores', icon: Building2 }
      ]
    },
    {
      group: 'Personas & Canal Ético',
      items: [
        { id: 'training', label: 'Capacitaciones', shortLabel: 'Capacitación', icon: GraduationCap },
        { id: 'redFlags', label: 'Canal Ético & Radar', shortLabel: 'Canal Ético', icon: AlertTriangle, badge: '37002' },
        { id: 'advisor', label: 'Asistente IA', shortLabel: 'Asistente IA', icon: Bot, isAi: true }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs no-print select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">

          {/* 1. Logo Institucional AUBASA SGAS */}
          <div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => onTabChange('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0284c7] to-[#0ea5e9] flex items-center justify-center shadow-md shadow-sky-200 border border-sky-300 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-[#0369a1]">AUBASA</span>
                <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">SGAS</span>
                <span className="px-1.5 py-0.2 text-[9px] font-black uppercase bg-sky-100 text-sky-800 border border-sky-200 rounded">
                  ISO 37001
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-500 tracking-tight hidden sm:block">
                Autopista BALP (50 km) • Contrataciones • Pagos • Obras
              </p>
            </div>
          </div>

          {/* 2. Menú de Navegación Mejorado por Módulos (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-50/80 p-1 rounded-xl border border-slate-200/80">
            {navSections.map((section, idx) => (
              <React.Fragment key={section.group}>
                {idx > 0 && <div className="h-5 w-[1px] bg-slate-200 mx-0.5" />}
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onTabChange(item.id)}
                      title={item.label}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-tight transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0284c7] text-white shadow-xs'
                          : item.isAi
                          ? 'text-indigo-700 bg-indigo-50/60 hover:bg-indigo-100/80 hover:text-indigo-900 border border-indigo-200/60'
                          : item.highlight
                          ? 'text-rose-700 hover:text-rose-900 hover:bg-rose-50'
                          : 'text-slate-700 hover:text-[#0284c7] hover:bg-white'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? 'text-white' : item.isAi ? 'text-indigo-600' : item.highlight ? 'text-rose-600' : 'text-slate-500'
                      }`} />
                      <span className="whitespace-nowrap">{item.shortLabel}</span>
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
              </React.Fragment>
            ))}
          </nav>

          {/* 3. Acciones Globales: Login / Usuario, Base de Datos, PDF */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Botón de Autenticación / Usuario */}
            <button
              onClick={onOpenAuthModal}
              title={user ? "Mi Cuenta AUBASA & Equipo" : "Iniciar Sesión / Registrar Oficial"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs cursor-pointer border ${
                user
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-sky-50 hover:bg-sky-100 text-[#0284c7] border-sky-300'
              }`}
            >
              {user ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden md:inline truncate max-w-[110px]">{user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0]}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span className="hidden md:inline">Acceso Equipo</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenExportModal}
              title="Administrar Base de Datos, Respaldos y Modo En Blanco"
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 transition-colors shadow-2xs cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-[#0284c7]" />
              <span className="hidden md:inline">Base de Datos</span>
            </button>

            {onPrintMaster && (
              <button
                onClick={onPrintMaster}
                title="Generar Reporte Oficial para Auditoría / Directorio en PDF"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">Reporte PDF</span>
              </button>
            )}
          </div>
        </div>

        {/* Menú Móvil / Pantallas Medianas con Scroll Horizontal */}
        <div className="lg:hidden flex items-center gap-1 py-2 overflow-x-auto no-scrollbar border-t border-slate-100">
          {navSections.flatMap(s => s.items).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold uppercase whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0284c7] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
