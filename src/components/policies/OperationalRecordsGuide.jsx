import React, { useState } from 'react';
import {
  FolderCheck,
  FileText,
  Clock,
  UserCheck,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  Download,
  BookOpen,
  Sparkles,
  Layers,
  GraduationCap,
  Gift,
  Handshake,
  Receipt,
  HardHat,
  Search,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const MANDATORY_RECORDS_GUIDE = [
  {
    codigo: 'REC-CTX',
    nombre: 'Matriz de Contexto y Análisis FODA Antisoborno',
    clausulaIso: 'Cl. 4.1',
    tipoId: 'contexto',
    poeAsociado: 'MAN-SGAS-01 (Manual del SGAS - Cap. 2)',
    frecuencia: 'Anual / Ante cambios regulatorios o de la concesión BALP',
    responsable: 'Oficial de Cumplimiento & Directorio',
    conservacion: '10 años',
    queDebeContener: 'Factores internos (estructura, gobernanza, recursos) y externos (marco legal provincial y nacional, condiciones del mercado vial) que afectan al SGAS, análisis FODA formal y fecha de aprobación por el Directorio.',
    color: 'slate'
  },
  {
    codigo: 'REC-PI',
    nombre: 'Matriz de Partes Interesadas y sus Requisitos',
    clausulaIso: 'Cl. 4.2',
    tipoId: 'partes_interesadas',
    poeAsociado: 'MAN-SGAS-01 (Cap. 3 - Partes Interesadas)',
    frecuencia: 'Anual / Ante incorporación de nuevas partes relevantes',
    responsable: 'Comité de Integridad & RRHH',
    conservacion: '10 años',
    queDebeContener: 'Listado de partes interesadas pertinentes (contratistas, oferentes, SUTPA, Poder Ejecutivo PBA, entidades bancarias), sus requisitos y expectativas legítimas y el canal de relacionamiento vigente.',
    color: 'stone'
  },
  {
    codigo: 'REC-CAP',
    nombre: 'Registro de Capacitación & Evaluación de Eficacia',
    clausulaIso: 'Cl. 7.2 & 7.3',
    tipoId: 'capacitacion',
    poeAsociado: 'MAN-SGAS-01 / POE-SGAS-08',
    frecuencia: 'Anual y en cada inducción de personal nuevo',
    responsable: 'Gerencia de RRHH & Oficial de Cumplimiento',
    conservacion: '10 años en legajo digital',
    queDebeContener: 'Lista de asistencia firmada o registro digital LMS, temario abordado, nota de evaluación situacional (mínimo 80%) y certificado individual emitido con hash SHA-256.',
    color: 'cyan'
  },
  {
    codigo: 'REC-CDI',
    nombre: 'Declaración Jurada de Conflicto de Intereses',
    clausulaIso: 'Cl. 7.2 & 5.1',
    tipoId: 'conflicto_interes',
    poeAsociado: 'POE-SGAS-03',
    frecuencia: 'Anual (todo el personal clave) y por cada Licitación/Concurso',
    responsable: 'Directorio, Comisiones Evaluadoras, Inspectores de Obra y Compras',
    conservacion: 'Permanente durante la relación laboral + 10 años',
    queDebeContener: 'Formulario estandarizado firmado declarando vínculos societarios, familiares hasta 2º grado de consanguinidad o comerciales con contratistas de AUBASA, o manifestación expresa de no poseerlos.',
    color: 'emerald'
  },
  {
    codigo: 'REC-REG',
    nombre: 'Libro / Registro de Regalos, Cortesías y Hospitalidad',
    clausulaIso: 'Cl. 8.7',
    tipoId: 'regalos',
    poeAsociado: 'POE-SGAS-04',
    frecuencia: 'Continuo / Dentro de las 48 hs de recibido o rechazado un presente',
    responsable: 'Todo el personal de AUBASA / Custodia: Oficial de Cumplimiento',
    conservacion: '10 años',
    queDebeContener: 'Fecha, nombre del oferente/proveedor, motivo, descripción del bien/invitación, valor estimado en USD (tope máx. $50 USD), y destino final asignado (devolución protocolar o donación institucional).',
    color: 'amber'
  },
  {
    codigo: 'REC-AUD',
    nombre: 'Informe de Auditoría Interna Antisoborno',
    clausulaIso: 'Cl. 9.2',
    tipoId: 'auditoria',
    poeAsociado: 'POE-SGAS-08',
    frecuencia: 'Mínimo 1 vez al año (Previo a auditoría de certificación)',
    responsable: 'Equipo Auditor Interno Independiente / Oficial de Cumplimiento',
    conservacion: '10 años',
    queDebeContener: 'Plan de auditoría, lista de verificación por cláusula, hallazgos tipificados (Conformidad, Observación, No Conformidad Mayor/Menor), muestreo de expedientes y dictamen técnico.',
    color: 'blue'
  },
  {
    codigo: 'REC-DIR',
    nombre: 'Acta de Revisión del SGAS por la Dirección',
    clausulaIso: 'Cl. 9.3',
    tipoId: 'auditoria',
    poeAsociado: 'MAN-SGAS-01 / POE-SGAS-08',
    frecuencia: 'Semestral / Anual',
    responsable: 'Directorio & Presidencia de AUBASA',
    conservacion: 'Libro de Actas Oficial del Directorio (Permanente)',
    queDebeContener: 'Revisión del estado de acciones de revisiones previas, cambios en el contexto vial BALP, desempeño del SGAS (denuncias, auditorías, CAPAs), y decisiones sobre asignación de recursos y mejoras.',
    color: 'indigo'
  },
  {
    codigo: 'REC-CAPA',
    nombre: 'Ficha de No Conformidad y Acción Correctiva (CAPA)',
    clausulaIso: 'Cl. 10.1 & 10.2',
    tipoId: 'no_conformidad',
    poeAsociado: 'POE-SGAS-10',
    frecuencia: 'Por evento / Ante cualquier desvío, hallazgo o auditoría',
    responsable: 'Dueño del Proceso afectado & Oficial de Cumplimiento',
    conservacion: '10 años',
    queDebeContener: 'Descripción del desvío, contención inmediata, análisis de causa raíz mediante técnica de los 5 Porqués, plan de acción con fechas/responsables y verificación formal de eficacia a los 60 días.',
    color: 'rose'
  },
  {
    codigo: 'REC-PAC',
    nombre: 'Pacto de Integridad y Cláusulas Anticorrupción en Pliegos',
    clausulaIso: 'Cl. 8.6',
    tipoId: 'integridad_terceros',
    poeAsociado: 'POE-SGAS-02 / POE-SGAS-06',
    frecuencia: 'Por cada expediente de compra, concurso o licitación de obra',
    responsable: 'Gerencia de Compras & Contrataciones / Proveedores adjudicados',
    conservacion: 'Incorporado al expediente de contratación (Permanente)',
    queDebeContener: 'Compromiso firmado por el apoderado legal de la empresa oferente aceptando la política antisoborno de AUBASA, prohibición de dádivas a inspectores y renuncia a reclamos por rescisión ante corrupción.',
    color: 'purple'
  },
  {
    codigo: 'REC-FIN',
    nombre: 'Acta de Control Financiero y Doble Firma en Pagos',
    clausulaIso: 'Cl. 8.3',
    tipoId: 'controles_financieros',
    poeAsociado: 'POE-SGAS-05',
    frecuencia: 'Por cada lote de transferencias / Mensual en conciliaciones',
    responsable: 'Gerencia de Finanzas / Tesorería Central',
    conservacion: '10 años',
    queDebeContener: 'Comprobantes de transferencia con doble token de autorización (4 ojos), verificación de debida diligencia de proveedor y conciliación bancaria oficial.',
    color: 'teal'
  },
  {
    codigo: 'REC-OBR',
    nombre: 'Protocolo de Ensayos Técnicos e Inspección de Obras Viales',
    clausulaIso: 'Cl. 8.4',
    tipoId: 'ensayo_asfalto',
    poeAsociado: 'POE-SGAS-06',
    frecuencia: 'Por cada tramo/certificado de obra en Autopista BALP',
    responsable: 'Inspección de Obra AUBASA & Laboratorio Independiente (UNLP/LEMIT)',
    conservacion: 'Expediente de Obra (Permanente)',
    queDebeContener: 'Extracción de probetas testigo bajo protocolo de ensayo ciego, medición de densidad y espesor de carpeta asfáltica, acta de conformidad técnica indispensable para liberar el pago.',
    color: 'sky'
  },
  {
    codigo: 'REC-DD',
    nombre: 'Dictamen de Debida Diligencia de Contratistas',
    clausulaIso: 'Cl. 8.2',
    tipoId: 'debida_diligencia',
    poeAsociado: 'POE-SGAS-02',
    frecuencia: 'Previo a adjudicación / Renovación bienal o ante cambios societarios',
    responsable: 'Oficial de Cumplimiento / Comisión Evaluadora',
    conservacion: '10 años',
    queDebeContener: 'Screening de listas restrictivas, verificación de Beneficiario Final (UBO), antecedentes de juicios por fraude/cohecho, cálculo de matriz de riesgo y dictamen (Aprobado / Aprobado con Mitigaciones / Rechazado).',
    color: 'emerald'
  },
  {
    codigo: 'REC-DEN',
    nombre: 'Expediente de Investigación y Triaje del Canal Ético',
    clausulaIso: 'Cl. 8.9 & 8.10',
    tipoId: 'canal_etico',
    poeAsociado: 'POE-SGAS-07',
    frecuencia: 'Por cada reporte ingresado en la Línea Ética',
    responsable: 'Oficial de Cumplimiento & Comité de Integridad',
    conservacion: '10 años (Bajo reserva confidencial y cifrado)',
    queDebeContener: 'Acta de recepción anónima, evaluación de admisibilidad en 5 días, plan de recolección de pruebas, dictamen de conclusiones y medidas disciplinarias o elevación judicial.',
    color: 'rose'
  },
  {
    codigo: 'REC-OBJ',
    nombre: 'Tablero de Seguimiento de Objetivos Antisoborno',
    clausulaIso: 'Cl. 6.2',
    tipoId: 'objetivos',
    poeAsociado: 'MAN-SGAS-01',
    frecuencia: 'Trimestral',
    responsable: 'Oficial de Cumplimiento & Gerencias Operativas',
    conservacion: '10 años',
    queDebeContener: 'Indicadores de avance de los 5 objetivos anuales: % personal capacitado, % contratistas con debida diligencia, % pagos con doble firma y conciliación, tiempo de resolución de denuncias y cierre de CAPAs.',
    color: 'indigo'
  }
];

export const MANDATORY_POES_GUIDE = [
  {
    codigo: 'MAN-SGAS-01',
    titulo: 'Manual del Sistema de Gestión Antisoborno',
    clausulaIso: 'Cl. 4.1 a 10.2',
    responsable: 'Directorio & Oficial de Cumplimiento',
    salidaPrincipal: 'Estructura institucional, alcance BALP (50 km) y mapa de procesos SGAS.',
    categoria: 'Manual Maestro'
  },
  {
    codigo: 'POL-SGAS-01',
    titulo: 'Política Institucional Antisoborno de AUBASA',
    clausulaIso: 'Cl. 5.2',
    responsable: 'Directorio de AUBASA',
    salidaPrincipal: 'Declaración pública de tolerancia cero al soborno y prohibición de pagos de facilitación.',
    categoria: 'Gobernanza'
  },
  {
    codigo: 'POE-SGAS-01',
    titulo: 'Identificación y Evaluación de Riesgos de Soborno',
    clausulaIso: 'Cl. 4.5 & 6.1',
    responsable: 'Oficial de Cumplimiento & Líderes de Área',
    salidaPrincipal: 'Matriz de Riesgos SGAS, evaluación inherente vs residual y planes de tratamiento.',
    categoria: 'Riesgos'
  },
  {
    codigo: 'POE-SGAS-02',
    titulo: 'Debida Diligencia de Socios Comerciales y Contratistas',
    clausulaIso: 'Cl. 8.2',
    responsable: 'Oficial de Cumplimiento & Compras',
    salidaPrincipal: 'Dictámenes de debida diligencia, screening de listas y screening PEP/UBO.',
    categoria: 'Operación'
  },
  {
    codigo: 'POE-SGAS-03',
    titulo: 'Declaración y Gestión de Conflictos de Intereses',
    clausulaIso: 'Cl. 7.2',
    responsable: 'Gerencia de RRHH & Cumplimiento',
    salidaPrincipal: 'Registro de DDJJ anuales y protocolos de abstención en compras y obras.',
    categoria: 'Personal'
  },
  {
    codigo: 'POE-SGAS-04',
    titulo: 'Gestión de Regalos, Cortesías, Hospitalidad y Donaciones',
    clausulaIso: 'Cl. 8.7',
    responsable: 'Oficial de Cumplimiento',
    salidaPrincipal: 'Libro de registro de regalos, umbral de $50 USD y circuito de devolución.',
    categoria: 'Relaciones'
  },
  {
    codigo: 'POE-SGAS-05',
    titulo: 'Controles Financieros en Pagos a Proveedores y Tesorería Central',
    clausulaIso: 'Cl. 8.3',
    responsable: 'Gerencia de Administración & Finanzas',
    salidaPrincipal: 'Principio de cuatro ojos en transferencias bancarias y conciliación de cuentas oficiales.',
    categoria: 'Finanzas'
  },
  {
    codigo: 'POE-SGAS-06',
    titulo: 'Controles No Financieros en Licitaciones y Obras Viales',
    clausulaIso: 'Cl. 8.4',
    responsable: 'Gerencia de Obras & Comisiones Evaluadoras',
    salidaPrincipal: 'Protocolo de ensayos ciegos de asfalto (UNLP/LEMIT) y certificación cruzada.',
    categoria: 'Obras'
  },
  {
    codigo: 'POE-SGAS-07',
    titulo: 'Gestión de Denuncias, Canal Ético e Investigaciones',
    clausulaIso: 'Cl. 8.9 & 8.10',
    responsable: 'Comité de Integridad & Oficial de Cumplimiento',
    salidaPrincipal: 'Expedientes de investigación, garantía de no represalias y medidas disciplinarias.',
    categoria: 'Canal Ético'
  },
  {
    codigo: 'POE-SGAS-08',
    titulo: 'Auditorías Internas y Revisiones por la Dirección',
    clausulaIso: 'Cl. 9.2 & 9.3',
    responsable: 'Equipo Auditor Interno & Directorio',
    salidaPrincipal: 'Plan anual de auditoría, informes de hallazgos y acta de revisión del Directorio.',
    categoria: 'Evaluación'
  },
  {
    codigo: 'POE-SGAS-09',
    titulo: 'Control de Información Documentada y Evidencias SGAS',
    clausulaIso: 'Cl. 7.5',
    responsable: 'Oficial de Cumplimiento & Sistemas',
    salidaPrincipal: 'Reglas de versionado, codificación, trazabilidad SHA-256 y retención por 10 años.',
    categoria: 'Soporte'
  },
  {
    codigo: 'POE-SGAS-10',
    titulo: 'No Conformidades y Acciones Correctivas (CAPA)',
    clausulaIso: 'Cl. 10.1 & 10.2',
    responsable: 'Líderes de Proceso & Cumplimiento',
    salidaPrincipal: 'Fichas de CAPA con análisis de 5 Porqués y verificación de eficacia a los 60 días.',
    categoria: 'Mejora'
  }
];

export default function OperationalRecordsGuide({
  onNavigateToRecords,
  onNavigateToPolicy
}) {
  const [activeTab, setActiveTab] = useState('records'); // 'records' | 'poes'
  const [searchFilter, setSearchFilter] = useState('');

  const filteredRecords = MANDATORY_RECORDS_GUIDE.filter(rec => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      rec.codigo.toLowerCase().includes(q) ||
      rec.nombre.toLowerCase().includes(q) ||
      rec.clausulaIso.toLowerCase().includes(q) ||
      rec.responsable.toLowerCase().includes(q) ||
      rec.queDebeContener.toLowerCase().includes(q)
    );
  });

  const filteredPoes = MANDATORY_POES_GUIDE.filter(poe => {
    if (!searchFilter) return true;
    const q = searchFilter.toLowerCase();
    return (
      poe.codigo.toLowerCase().includes(q) ||
      poe.titulo.toLowerCase().includes(q) ||
      poe.clausulaIso.toLowerCase().includes(q) ||
      poe.responsable.toLowerCase().includes(q) ||
      poe.salidaPrincipal.toLowerCase().includes(q)
    );
  });

  const handleExportGuideMarkdown = () => {
    const md = `# GUÍA MAESTRA DE POLÍTICAS, POEs Y REGISTROS OBLIGATORIOS (CL. 7.5) - AUBASA
**Concesión:** Autopista Buenos Aires - La Plata (BALP - 50 km)
**Norma:** ISO 37001:2025 y Ley 27.401
**Fecha:** ${new Date().toLocaleDateString('es-AR')}

---

## 1. LOS ${MANDATORY_RECORDS_GUIDE.length} REGISTROS AUDITABLES OBLIGATORIOS A LLEVAR ADELANTE (CLÁUSULA 7.5)

${MANDATORY_RECORDS_GUIDE.map((r, i) => `
### ${i + 1}. [${r.codigo}] ${r.nombre}
- **Cláusula ISO 37001:** ${r.clausulaIso}
- **Procedimiento de Origen:** ${r.poeAsociado}
- **Frecuencia Obligatoria:** ${r.frecuencia}
- **Responsable de Emisión / Custodia:** ${r.responsable}
- **Plazo de Conservación:** ${r.conservacion}
- **Contenido Obligatorio:** ${r.queDebeContener}
`).join('\n---\n')}

---

## 2. PROCEDIMIENTOS OPERATIVOS ESTÁNDAR (POEs) Y MANUALES DEL SGAS

${MANDATORY_POES_GUIDE.map((p, i) => `
### ${i + 1}. [${p.codigo}] ${p.titulo}
- **Cláusula ISO 37001:** ${p.clausulaIso}
- **Categoría:** ${p.categoria}
- **Responsable:** ${p.responsable}
- **Salida / Entregable Principal:** ${p.salidaPrincipal}
`).join('\n---\n')}
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AUBASA_Guia_Maestra_POEs_y_Registros_ISO37001.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header de la Guía */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/70 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                Cl. 7.5 Información Documentada
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                BALP (50 km)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Guía Maestra: Políticas, POEs y Registros a Llevar Adelante
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Directorio oficial estructurado de los <strong>10 Procedimientos Operativos Estándar (POEs)</strong> y los <strong>{MANDATORY_RECORDS_GUIDE.length} Registros de Evidencia Obligatorios</strong> que AUBASA debe generar, firmar y custodiar operativamente para acreditar cumplimiento ante auditores del organismo certificador.
            </p>
          </div>

          <button
            onClick={handleExportGuideMarkdown}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/80 rounded-xl text-xs font-bold transition-all shadow-md"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Exportar Guía en .MD</span>
          </button>
        </div>
      </div>

      {/* Tabs Selector: Registros Obligatorios vs POEs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shadow-md">
          <button
            onClick={() => setActiveTab('records')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'records'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderCheck className="w-4 h-4" />
            <span>Registros Obligatorios (A Llevar Adelante)</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-white/20 text-white font-mono">
              {MANDATORY_RECORDS_GUIDE.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('poes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'poes'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>10 Procedimientos POE & Manuales SGAS</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-white/20 text-white font-mono">
              12
            </span>
          </button>
        </div>

        {/* Buscador Rápido */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Buscar por código, cláusula, rol..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* SECCIÓN 1: LOS REGISTROS OBLIGATORIOS (A LLEVAR ADELANTE) */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Requisito ISO 37001 Cl. 7.5:</strong> Cada uno de estos {MANDATORY_RECORDS_GUIDE.length} registros constituye evidencia auditable ante el organismo certificador. Haga clic en <em>"Gestionar en Registros Cl. 7.5"</em> para cargar o consultar expedientes.
              </span>
            </div>
            {onNavigateToRecords && (
              <button
                onClick={() => onNavigateToRecords()}
                className="hidden sm:inline-flex items-center gap-1 text-emerald-300 font-bold hover:underline whitespace-nowrap ml-3"
              >
                <span>Ir al Módulo de Registros</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRecords.map((rec) => (
              <div
                key={rec.codigo}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all hover:shadow-cyan-950/10"
              >
                <div className="space-y-3">
                  {/* Encabezado de la Tarjeta */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono font-black bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {rec.codigo}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950 text-slate-300 border border-slate-800">
                        {rec.clausulaIso}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                      {rec.conservacion}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {rec.nombre}
                  </h3>

                  {/* Metadatos de Operación */}
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-2 text-[11px]">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        Frecuencia:
                      </span>
                      <strong className="text-slate-200 text-right">{rec.frecuencia}</strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                        Responsable:
                      </span>
                      <strong className="text-slate-200 text-right">{rec.responsable}</strong>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-indigo-400" />
                        POE Origen:
                      </span>
                      <span className="text-indigo-300 font-mono font-semibold">{rec.poeAsociado}</span>
                    </div>
                  </div>

                  {/* Contenido Obligatorio de la Evidencia */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      ¿Qué debe contener la evidencia ante el organismo certificador?
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50">
                      "{rec.queDebeContener}"
                    </p>
                  </div>
                </div>

                {/* Footer con Acceso Directo */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Auditable Cl. 7.5
                  </span>

                  {onNavigateToRecords && (
                    <button
                      onClick={() => onNavigateToRecords(rec.tipoId)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all"
                    >
                      <FolderCheck className="w-3.5 h-3.5" />
                      <span>Ver Registros Cl. 7.5</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN 2: LOS 10 PROCEDIMIENTOS ESTÁNDAR (POEs) Y MANUALES */}
      {activeTab === 'poes' && (
        <div className="space-y-4">
          <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-4 flex items-center justify-between text-xs text-cyan-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Compendio Normativo de AUBASA:</strong> Procedimientos Operativos Estándar formalmente aprobados por la Dirección para regular compras, pagos, obras viales y canal ético en la traza BALP.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPoes.map((poe) => (
              <div
                key={poe.codigo}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-xs font-mono font-black bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {poe.codigo}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950 text-slate-300 border border-slate-800">
                        {poe.clausulaIso}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {poe.categoria}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {poe.titulo}
                  </h3>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-2 text-[11px]">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                        Responsable:
                      </span>
                      <strong className="text-slate-200 text-right">{poe.responsable}</strong>
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="text-slate-400 block font-semibold text-[10px] uppercase">
                        Entregable / Salida Principal:
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {poe.salidaPrincipal}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Documento Oficial AUBASA
                  </span>

                  {onNavigateToPolicy && (
                    <button
                      onClick={() => onNavigateToPolicy(poe.codigo)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600/90 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Ver Texto del POE</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
