import React, { useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import ExecutiveHeroBanner from './ExecutiveHeroBanner.jsx';
import RoadmapTimeline from './RoadmapTimeline.jsx';
import MaturityRadarCard from './MaturityRadarCard.jsx';
import { calculateGapMaturity } from '../../utils/gapAnalysisScoring.js';
import { RECORD_CATEGORIES } from '../../data/initialRecordsData.js';
import {
  ShieldCheck,
  Award,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Layers,
  Users,
  Building2,
  Scale,
  FolderCheck,
  GraduationCap,
  ArrowUpRight,
  Crown,
  LogOut,
  UserCheck,
  Sparkles,
  Database,
  Check,
  UserPlus
} from 'lucide-react';

export default function ExecutiveDashboard({
  roadmapPhases = [],
  onUpdatePhases,
  risks = [],
  partners = [],
  gapItems = [],
  reports = [],
  records = [],
  redFlags = [],
  onNavigate,
  onOpenPrintReport
}) {
  const { user, signOut, updateProfile, setMasterAdminRole } = useAuth();
  const [roleMessage, setRoleMessage] = useState(null);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  const currentRole = user?.user_metadata?.role || 'Administrador General SGAS';

  const handleSwitchRole = async (newRole) => {
    setIsUpdatingRole(true);
    setRoleMessage(null);
    const { error } = await updateProfile({
      role: newRole,
      isAdmin: true,
      permissions: 'full_admin_access'
    });
    setIsUpdatingRole(false);
    if (error) {
      setRoleMessage({ type: 'error', text: 'Error al cambiar rol: ' + error.message });
    } else {
      setRoleMessage({ type: 'success', text: `Rol actualizado a: "${newRole}" con permisos de Administrador Maestro.` });
      setTimeout(() => setRoleMessage(null), 4000);
    }
  };

  const handleDashboardLogout = async () => {
    if (window.confirm('¿Desea cerrar la sesión de su usuario de AUBASA SGAS?')) {
      await signOut();
    }
  };
  // Cálculo de madurez de brechas
  const gapMaturity = useMemo(() => calculateGapMaturity(gapItems), [gapItems]);

  // Cálculos de registros y evidencias
  const verifiedRecords = useMemo(() => {
    return records.filter(r => r.estadoVerificacion === 'verificado');
  }, [records]);

  const verifiedRecordsPercentage = useMemo(() => {
    if (!records.length) return 0;
    return Math.round((verifiedRecords.length / records.length) * 100);
  }, [records, verifiedRecords]);

  const coveredRecordCategories = useMemo(() => {
    const present = new Set(records.map(r => r.tipoRegistro));
    return RECORD_CATEGORIES.filter(cat => present.has(cat.id)).length;
  }, [records]);

  // Cálculos de riesgos
  const highResidualRisks = useMemo(() => {
    return risks.filter(r => r.evaluacionResidual?.nivel === 'alto');
  }, [risks]);

  const mediumResidualRisks = useMemo(() => {
    return risks.filter(r => r.evaluacionResidual?.nivel === 'medio');
  }, [risks]);

  // Cálculos de debida diligencia
  const highRiskPartners = useMemo(() => {
    return partners.filter(p => p.nivelRiesgo === 'alto');
  }, [partners]);

  // Casos abiertos de canal ético
  const openReports = useMemo(() => {
    return reports.filter(r => r.estado !== 'cerrada');
  }, [reports]);

  // Progreso general del roadmap
  const globalRoadmapProgress = useMemo(() => {
    if (!roadmapPhases.length) return 0;
    const total = roadmapPhases.reduce((acc, p) => acc + (p.progreso || 0), 0);
    return Math.round(total / roadmapPhases.length);
  }, [roadmapPhases]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 0. PANEL DE CONTROL DE SESIÓN, PERMISOS SUPERADMIN & LOG OUT DIRECTO */}
      <div className="bg-gradient-to-r from-amber-500/15 via-sky-50 to-emerald-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-200/80 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0 border border-amber-300">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase text-amber-900 bg-amber-200 px-2 py-0.5 rounded border border-amber-300">
                  Panel de Control Maestro
                </span>
                <span className="text-xs font-bold text-slate-700">
                  Usuario Activo: <strong className="text-slate-900 font-black">{user?.user_metadata?.full_name || user?.email || 'Administrador AUBASA'}</strong>
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  ({user?.email})
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Rol actual: <strong className="text-sky-800 font-bold">{currentRole}</strong> • Permisos: <strong className="text-emerald-700 font-bold">Control Total & SuperAdmin Habilitado</strong>
              </p>
            </div>
          </div>

          {/* BOTÓN ROJO ULTRA PROMINENTE DE CERRAR SESIÓN */}
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={handleDashboardLogout}
              className="flex-1 md:flex-initial px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-md shadow-rose-200 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-rose-700"
              title="Cerrar la sesión actual de AUBASA SGAS"
            >
              <LogOut className="w-4 h-4 text-white" />
              <span>CERRAR SESIÓN (LOG OUT)</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert de Rol */}
        {roleMessage && (
          <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 border ${
            roleMessage.type === 'success' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-rose-50 text-rose-900 border-rose-300'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{roleMessage.text}</span>
          </div>
        )}

        {/* SELECTOR RÁPIDO DE ROLES EN VIVO */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-black text-slate-800 uppercase tracking-wide">
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#0284c7]" />
              Cambiar Rol en Vivo (Simular Funciones con Permisos Totales):
            </span>
            <span className="text-[10px] text-slate-500 font-normal normal-case">
              Haga click en cualquier rol para operar como dicho perfil con acceso de administrador
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            {[
              { role: 'Administrador General SGAS', label: '👑 Admin General' },
              { role: 'Oficial de Cumplimiento SGAS', label: '🛡️ Oficial Cumplimiento' },
              { role: 'Auditor Interno SGAS', label: '🔍 Auditor Interno' },
              { role: 'Responsable de Compras & Contrataciones', label: '📑 Compras & Contratos' },
              { role: 'Control de Tesorería & Pagos', label: '💳 Tesorería & Pagos' },
              { role: 'Supervisión de Obras BALP', label: '🏗️ Obras BALP (LEMIT)' }
            ].map(item => (
              <button
                key={item.role}
                onClick={() => handleSwitchRole(item.role)}
                disabled={isUpdatingRole}
                className={`px-2.5 py-2 rounded-lg text-left text-[11px] font-bold transition-all border cursor-pointer ${
                  currentRole === item.role
                    ? 'bg-sky-600 text-white border-sky-700 shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                <div className="truncate">{item.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* GUÍA DE DONDE VER LOS USUARIOS EN SUPABASE & BOTÓN DIRECTO */}
        <div className="bg-white/80 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#0284c7] shrink-0" />
            <span>
              <strong>¿Dónde ver y editar usuarios en Supabase?</strong> Ingrese a su consola de Supabase &gt; menú izquierdo <strong>Authentication</strong> &gt; solapa <strong>Users</strong> &gt; columna <strong>User Metadata</strong>.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('users')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Gestionar Padrón de Usuarios</span>
            </button>
            <span className="text-[10px] font-mono bg-sky-50 text-sky-800 border border-sky-200 px-2 py-1 rounded shrink-0">
              auth.users & app_users
            </span>
          </div>
        </div>
      </div>

      {/* 1. HERO BANNER VIBRANTE & SECCIÓN 'EASY AS 1-2-3' (Idéntico a la imagen de muestra) */}
      <ExecutiveHeroBanner
        onNavigate={onNavigate}
        onOpenPrintReport={onOpenPrintReport}
        stats={{
          gapItemsCount: gapItems.length,
          recordsCount: records.length,
          risksCount: risks.length,
          partnersCount: partners.length,
          reportsCount: reports.length
        }}
      />

      {/* 2. TARJETAS KPI PRINCIPALES DE ESTADO EJECUTIVO (5 Métricas Clave) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#0284c7]" />
            <span>Métricas Operativas del Sistema de Gestión</span>
          </h2>
          <span className="text-[11px] text-slate-500 font-semibold">
            Haga click en una tarjeta para ir al módulo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* KPI 1: Registros de Evidencias Obligatorias Cl. 7.5 */}
          <div
            onClick={() => onNavigate('records')}
            className="bg-white border border-slate-200 hover:border-[#0284c7] rounded-xl p-4.5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-bold uppercase">
                <span>Evidencias (7.5)</span>
                <FolderCheck className="w-4 h-4 text-[#0284c7] group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-slate-900 font-mono">{records.length}</span>
                <span className="text-[10px] font-mono font-bold text-pink-600 bg-pink-50 px-1.5 py-0.2 rounded border border-pink-200">
                  Registros
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                <span className="text-emerald-700 font-bold">{verifiedRecords.length} Conformes</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-mono font-semibold">{verifiedRecordsPercentage}%</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 mt-2">
              <span>{coveredRecordCategories}/{RECORD_CATEGORIES.length} Tipologías ISO</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0284c7]" />
            </div>
          </div>

          {/* KPI 2: Preparación Auditoría de Certificación */}
          <div
            onClick={() => onNavigate('gapAnalysis')}
            className="bg-white border border-slate-200 hover:border-emerald-500 rounded-xl p-4.5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-bold uppercase">
                <span>Madurez ISO</span>
                <Award className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-slate-900 font-mono">{gapMaturity.overallPercentage}%</span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  Etapa 1
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 line-clamp-1 font-medium">
                {gapMaturity.readinessVerdict}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 mt-2">
              <span>{gapMaturity.conformeCount} conformes</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>

          {/* KPI 3: Riesgos de Soborno */}
          <div
            onClick={() => onNavigate('risks')}
            className="bg-white border border-slate-200 hover:border-amber-500 rounded-xl p-4.5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-bold uppercase">
                <span>Matriz Riesgos</span>
                <Layers className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-slate-900 font-mono">{risks.length}</span>
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                  Riesgos
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                <span className="text-rose-600 font-bold">{highResidualRisks.length} Altos</span>
                <span className="text-slate-300">•</span>
                <span className="text-amber-600 font-bold">{mediumResidualRisks.length} Medios</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 mt-2">
              <span>Cl. 4.5 & 6.1</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
            </div>
          </div>

          {/* KPI 4: Debida Diligencia Contratistas */}
          <div
            onClick={() => onNavigate('dueDiligence')}
            className="bg-white border border-slate-200 hover:border-purple-500 rounded-xl p-4.5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-bold uppercase">
                <span>Socios / DD</span>
                <Users className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-slate-900 font-mono">{partners.length}</span>
                <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                  Socios
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                <span className="text-rose-600 font-bold">{highRiskPartners.length} Alto Riesgo</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-600 font-bold">{partners.filter(p => p.nivelRiesgo === 'bajo').length} Aptos</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 mt-2">
              <span>Cl. 8.2 & Ley 27.401</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-purple-600" />
            </div>
          </div>

          {/* KPI 5: Canal Ético (ISO 37002 / 37008) */}
          <div
            onClick={() => onNavigate('redFlags')}
            className="bg-white border border-slate-200 hover:border-rose-500 rounded-xl p-4.5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-bold uppercase">
                <span>Canal Ético</span>
                <Scale className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-black text-slate-900 font-mono">{reports.length}</span>
                <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                  Casos
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px]">
                <span className="text-amber-600 font-bold">{openReports.length} Activos</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-600 font-bold">{reports.filter(r => r.estado === 'cerrada').length} Cerrados</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 mt-2">
              <span>ISO 37002 / 37008</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-rose-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. ALERTAS CRÍTICAS INSTITUCIONALES SI EXISTEN */}
      {(highResidualRisks.length > 0 || highRiskPartners.length > 0 || openReports.length > 0) && (
        <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-rose-800 text-xs font-black uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4 text-rose-600" />
            <span>Alertas de Cumplimiento que Requieren Atención Directa</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {highResidualRisks.length > 0 && (
              <div
                onClick={() => onNavigate('risks')}
                className="bg-white p-3.5 rounded-lg border border-rose-200 hover:border-rose-400 cursor-pointer transition-all shadow-xs"
              >
                <span className="text-rose-700 font-bold block mb-1">
                  {highResidualRisks.length} Riesgos Residuales Críticos:
                </span>
                <p className="text-slate-600 text-[11px]">
                  Requieren ejecución urgente del plan de mitigación en contratos u obras viales.
                </p>
              </div>
            )}

            {highRiskPartners.length > 0 && (
              <div
                onClick={() => onNavigate('dueDiligence')}
                className="bg-white p-3.5 rounded-lg border border-rose-200 hover:border-rose-400 cursor-pointer transition-all shadow-xs"
              >
                <span className="text-rose-700 font-bold block mb-1">
                  {highRiskPartners.length} Contratistas de Alto Riesgo:
                </span>
                <p className="text-slate-600 text-[11px]">
                  Exigen Dictamen Especial de Debida Diligencia y elevación al Directorio.
                </p>
              </div>
            )}

            {openReports.length > 0 && (
              <div
                onClick={() => onNavigate('redFlags')}
                className="bg-white p-3.5 rounded-lg border border-amber-200 hover:border-amber-400 cursor-pointer transition-all shadow-xs"
              >
                <span className="text-amber-700 font-bold block mb-1">
                  {openReports.length} Investigaciones Internas Abiertas:
                </span>
                <p className="text-slate-600 text-[11px]">
                  Expedientes en trámite forense bajo directrices ISO/TS 37008:2023.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. TARJETA DE MADUREZ DE LOS 3 PILARES */}
      <MaturityRadarCard
        gapMaturity={gapMaturity}
        risks={risks}
        partners={partners}
        onNavigate={onNavigate}
      />

      {/* 5. CRONOGRAMA / ROADMAP DE 6 FASES */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
          <div>
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Avance Global del Programa de Implementación SGAS
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Progreso acumulado: <strong className="text-[#0284c7] font-mono font-bold">{globalRoadmapProgress}%</strong>
            </span>
          </div>

          <div className="w-56 bg-slate-100 rounded-full h-3 border border-slate-200 overflow-hidden">
            <div
              className="h-3 bg-gradient-to-r from-sky-500 via-blue-600 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${globalRoadmapProgress}%` }}
            />
          </div>
        </div>

        <RoadmapTimeline
          phases={roadmapPhases}
          onUpdatePhases={onUpdatePhases}
        />
      </div>
    </div>
  );
}
