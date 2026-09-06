import React from 'react';
import {
  ShieldCheck,
  Award,
  BookOpen,
  FolderCheck,
  FileCheck2,
  AlertTriangle,
  Scale,
  Users,
  Layers,
  ArrowRight,
  Sparkles,
  Bot,
  Printer,
  GraduationCap,
  Lock,
  Search,
  CheckCircle2,
  Star,
  ExternalLink,
  ChevronRight,
  Check,
  FileText,
  AlertOctagon
} from 'lucide-react';
import { STANDARDS_TRILOGY } from '../../data/iso37002And37008Data.js';
import { RECORD_CATEGORIES } from '../../data/initialRecordsData.js';
import { MANDATORY_RECORDS_GUIDE } from '../policies/OperationalRecordsGuide.jsx';

export default function ExecutiveHeroBanner({
  onNavigate,
  onOpenPrintReport,
  stats = {}
}) {
  return (
    <div className="space-y-6">
      {/* 1. HERO BANNER PRINCIPAL AZUL VIBRANTE CON RIBBON DORADO (Fiel a la imagen de referencia) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#0ea5e9] shadow-xl p-6 sm:p-10 text-white border border-sky-400/30">
        {/* Textura sutil de mapa de red / autopista de fondo */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1.5px), radial-gradient(#ffffff 1.5px, #0284c7 1.5px)`,
            backgroundSize: `24px 24px`,
            backgroundPosition: `0 0, 12px 12px`
          }}
        />

        {/* Glows de ambientación */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-900/40 rounded-full blur-3xl pointer-events-none" />

        {/* RIBBON BOOKMARK DORADO CON ESTRELLA Y CORTE EN V (Swallowtail Notch) EN LA ESQUINA SUPERIOR DERECHA */}
        <div className="absolute top-0 right-6 sm:right-12 z-20 flex flex-col items-center drop-shadow-md select-none group">
          <div className="bg-gradient-to-b from-[#f59e0b] to-[#d97706] text-white font-black text-center px-4 pt-3 pb-2 shadow-lg border-x border-t border-amber-300/60 flex flex-col items-center">
            {/* Estrella dorada/blanca en el centro */}
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-[11px] font-black tracking-wider uppercase drop-shadow-xs">ISO 37001</span>
            <span className="text-[9px] font-extrabold text-amber-100 uppercase tracking-tight">BALP 50 KM</span>
          </div>
          {/* Corte en V (Swallowtail notch invertido) hecho con SVG para precisión milimétrica */}
          <svg
            className="w-full h-4 -mt-[1px] text-[#d97706]"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,0 100,20 50,0 0,20" fill="currentColor" />
          </svg>
        </div>

        {/* Contenido Principal del Hero */}
        <div className="relative z-10 max-w-3xl space-y-4">
          {/* Badge institucional */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-md text-[11px] font-extrabold bg-sky-900/60 text-sky-100 border border-sky-300/40 shadow-xs flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-200" />
              <span>AUBASA • AUTOPISTA BS. AS. — LA PLATA (50 KM)</span>
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-white/15 text-white border border-white/20">
              TRILOGÍA NORMATIVA INTEGRADA
            </span>
          </div>

          {/* Gran Título Blanco */}
          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-tight text-white drop-shadow-sm">
            Sistema de Gestión Antisoborno & Integridad en Autopista BALP
          </h1>

          {/* Subtítulo Blanco de Alta Legibilidad */}
          <p className="text-sm sm:text-base text-sky-50 leading-relaxed font-normal max-w-2xl">
            Plataforma oficial para la implementación, auditoría y control de requisitos <strong className="font-bold text-white underline decoration-sky-300">ISO 37001:2025</strong> (SGAS), <strong className="font-bold text-white underline decoration-emerald-300">UNE-ISO 37002:2021</strong> (Canal Ético) e <strong className="font-bold text-white underline decoration-indigo-300">ISO/TS 37008:2023</strong> (Investigaciones Forenses) en Contratación, Pagos y Obras Viales.
          </p>

          {/* Botón CTA Magenta Vibrante (Estilo 'Pay with a Tweet' / 'CREATE YOUR FREE CAMPAIGN') */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('gapAnalysis')}
              className="px-6 py-3.5 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-lg text-xs sm:text-sm font-black tracking-wider uppercase flex items-center gap-2.5 shadow-xl shadow-rose-950/30 transition-all hover:scale-[1.02] active:scale-[0.98] border border-rose-400/40"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>INICIAR CHECKLIST ISO 37001 (¿CÓMO LO CUMPLO?)</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('records')}
              className="px-4 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/30 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <FolderCheck className="w-4 h-4 text-sky-200" />
              <span>{RECORD_CATEGORIES.length} REGISTROS (7.5)</span>
            </button>

            <button
              onClick={() => onNavigate('advisor')}
              className="px-4 py-3 bg-sky-900/80 hover:bg-sky-900 text-sky-100 border border-sky-400/40 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <Bot className="w-4 h-4 text-sky-300" />
              <span>ASISTENTE IA</span>
            </button>

            {onOpenPrintReport && (
              <button
                onClick={onOpenPrintReport}
                className="px-3.5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
                title="Generar Informe PDF Completo"
              >
                <Printer className="w-4 h-4 text-white" />
                <span>PDF MASTER</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. BARRA DE CREDENCIALES & LOGOS (Logo Strip con fondo blanco y estilo escala de grises limpio) */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-slate-700">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            <Award className="w-4 h-4 text-[#0284c7]" />
            <span>Marco Normativo y Acreditación:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-bold">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>ISO 37001:2025 (SGAS)</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>UNE-ISO 37002:2021 (Denuncias)</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>ISO/TS 37008:2023 (Forense)</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Ley 27.401 • LEMIT / UNLP</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECCIÓN "EASY AS 1-2-3" EN 4 PASOS CON MAQUETAS GRÁFICAS DE MINI-NAVEGADORES (Idéntico a la imagen) */}
      <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Easy as 1-2-3-4
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Ruta estructurada de 4 pasos para implementar y auditar con éxito el Sistema de Gestión Antisoborno en AUBASA.
          </p>
        </div>

        {/* Cuadrícula de 4 Tarjetas Blancas con Mini-Navegadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* STEP 1: Diagnóstico & Checklist Maestro */}
          <div
            onClick={() => onNavigate('gapAnalysis')}
            className="bg-white border border-slate-200 hover:border-[#0284c7] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Step 1
                </span>
                <span className="text-[10px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  {stats.gapItemsCount || 32} Requisitos
                </span>
              </div>

              {/* Maqueta Gráfica de Mini-Navegador Web */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-inner mb-4">
                {/* Barra superior de mini-navegador con 3 puntos */}
                <div className="bg-slate-200/80 px-2.5 py-1.5 flex items-center gap-1.5 border-b border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="ml-2 flex-1 bg-white rounded text-[8px] font-mono text-slate-500 px-1.5 py-0.2 truncate">
                    aubasa.sgas/gap-analysis
                  </div>
                </div>
                {/* Contenido visual de la maqueta: Mini Checklist con checkboxes */}
                <div className="p-3 bg-white space-y-1.5 min-h-[95px] flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[10px] text-slate-700 font-semibold">
                    <div className="w-3.5 h-3.5 rounded bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                    <span className="truncate">Cl. 4.5 Evaluación Riesgos</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-700 font-semibold">
                    <div className="w-3.5 h-3.5 rounded bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                    <span className="truncate">Cl. 5.1 Liderazgo Directorio</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-700 font-semibold">
                    <div className="w-3.5 h-3.5 rounded bg-sky-500 text-white flex items-center justify-center text-[9px] font-bold">✓</div>
                    <span className="truncate">Cl. 8.2 Debida Diligencia</span>
                  </div>
                  {/* Barra de progreso mini */}
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden border border-slate-200">
                    <div className="bg-emerald-500 h-1.5 rounded-full w-[78%]" />
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                Diagnóstico & Checklist
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Evaluación integral de 36 requisitos normativos: brechas normativas y asignación de responsables.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-500">¿Cómo lo cumplo?</span>
              <span className="text-[#0284c7] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Checklist</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* STEP 2: Políticas, POEs & Registros (7.5) */}
          <div
            onClick={() => onNavigate('records')}
            className="bg-white border border-slate-200 hover:border-[#0284c7] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Step 2
                </span>
                <span className="text-[10px] font-mono font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                  {stats.recordsCount || 12} Evidencias
                </span>
              </div>

              {/* Maqueta Gráfica de Mini-Navegador Web */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-inner mb-4">
                <div className="bg-slate-200/80 px-2.5 py-1.5 flex items-center gap-1.5 border-b border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="ml-2 flex-1 bg-white rounded text-[8px] font-mono text-slate-500 px-1.5 py-0.2 truncate">
                    aubasa.sgas/records-7.5
                  </div>
                </div>
                {/* Contenido visual de la maqueta: Repositorio de Registros */}
                <div className="p-3 bg-white space-y-1.5 min-h-[95px] flex flex-col justify-center">
                  <div className="flex items-center justify-between text-[10px] bg-slate-50 p-1 rounded border border-slate-100">
                    <span className="font-mono font-bold text-slate-700">REG-01 Matriz BALP</span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">Vigente</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] bg-slate-50 p-1 rounded border border-slate-100">
                    <span className="font-mono font-bold text-slate-700">REG-02 Due Diligence</span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">Aprobado</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] bg-slate-50 p-1 rounded border border-slate-100">
                    <span className="font-mono font-bold text-slate-700">POE-01 Compras BALP</span>
                    <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-1 rounded">Doc. 7.5</span>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                Políticas & {RECORD_CATEGORIES.length} Registros (7.5)
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Repositorio documental auditable de {MANDATORY_RECORDS_GUIDE.length} registros obligatorios y 10 POEs operativos.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-500">Cláusula 7.5</span>
              <span className="text-[#0284c7] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Registros</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* STEP 3: Matriz de Riesgos & Debida Diligencia */}
          <div
            onClick={() => onNavigate('risks')}
            className="bg-white border border-slate-200 hover:border-[#0284c7] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Step 3
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {stats.risksCount || 12} Riesgos • {stats.partnersCount || 8} DD
                </span>
              </div>

              {/* Maqueta Gráfica de Mini-Navegador Web */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-inner mb-4">
                <div className="bg-slate-200/80 px-2.5 py-1.5 flex items-center gap-1.5 border-b border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="ml-2 flex-1 bg-white rounded text-[8px] font-mono text-slate-500 px-1.5 py-0.2 truncate">
                    aubasa.sgas/risk-matrix
                  </div>
                </div>
                {/* Contenido visual de la maqueta: Mini Heat Map de Riesgos */}
                <div className="p-3 bg-white min-h-[95px] flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1.5 w-full max-w-[140px]">
                    <div className="h-5 rounded bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white shadow-xs">2</div>
                    <div className="h-5 rounded bg-amber-500 flex items-center justify-center text-[9px] font-bold text-white shadow-xs">4</div>
                    <div className="h-5 rounded bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-white shadow-xs">6</div>
                    <div className="h-5 rounded bg-rose-400 flex items-center justify-center text-[8px] font-bold text-white">Alto</div>
                    <div className="h-5 rounded bg-amber-400 flex items-center justify-center text-[8px] font-bold text-white">Medio</div>
                    <div className="h-5 rounded bg-emerald-400 flex items-center justify-center text-[8px] font-bold text-white">Bajo</div>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                Matriz Riesgos & DD
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Identificación de soborno en peajes Dock Sud/Hudson, pagos y screening de socios.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-500">Cláusula 4.5 / 8.2</span>
              <span className="text-[#0284c7] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Matriz</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* STEP 4: Canal Ético & Investigaciones Forenses */}
          <div
            onClick={() => onNavigate('redFlags')}
            className="bg-white border border-slate-200 hover:border-[#0284c7] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  Step 4
                </span>
                <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  ISO 37002 / 37008
                </span>
              </div>

              {/* Maqueta Gráfica de Mini-Navegador Web */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden shadow-inner mb-4">
                <div className="bg-slate-200/80 px-2.5 py-1.5 flex items-center gap-1.5 border-b border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="ml-2 flex-1 bg-white rounded text-[8px] font-mono text-slate-500 px-1.5 py-0.2 truncate">
                    aubasa.sgas/whistleblowing
                  </div>
                </div>
                {/* Contenido visual de la maqueta: Formulario Seguro y Hash SHA-256 */}
                <div className="p-3 bg-white space-y-1.5 min-h-[95px] flex flex-col justify-center">
                  <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded border border-slate-100">
                    <Lock className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-[9px] font-bold text-slate-800">Canal Seguro Encriptado</span>
                  </div>
                  <div className="text-[8px] font-mono bg-purple-50 text-purple-800 p-1 rounded border border-purple-200 truncate">
                    SHA-256: 7f83b165...e912
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-slate-600 font-semibold">
                    <span>Expedientes: 3</span>
                    <span className="text-emerald-600 font-bold">Activo 24/7</span>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors">
                Canal Ético & Forense
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Gestión de denuncias UNE-ISO 37002 y peritajes forenses con evidencia inalterable.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-500">ISO 37002 / 37008</span>
              <span className="text-[#0284c7] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>Abrir Canal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
