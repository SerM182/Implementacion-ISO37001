import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Scale,
  FileText,
  Lock,
  Download,
  CheckCircle2,
  AlertTriangle,
  User,
  Calendar,
  Layers,
  Key,
  Award,
  Hash,
  Copy,
  Check,
  Printer,
  FileCheck
} from 'lucide-react';
import { ISO37008_INVESTIGATION_FRAMEWORK } from '../../data/iso37002And37008Data.js';

export default function Iso37008InvestigationModal({
  isOpen,
  onClose,
  report,
  onUpdateReport
}) {
  if (!isOpen || !report) return null;

  const [activeTab, setActiveTab] = useState('tor'); // 'tor' | 'evidence' | 'interviews' | 'report' | 'remediation'
  const [copiedHash, setCopiedHash] = useState(false);

  // Datos del expediente (con defaults acordes al caso y a ISO/TS 37008)
  const [torMandate, setTorMandate] = useState({
    mandato: `Investigación formal ordenada por la Función de Cumplimiento Antisoborno de AUBASA respecto de los hechos denunciados en el expediente ${report.id} (${report.tokenSeguimiento}).`,
    alcance: `Verificación pericial y documental en la Concesión BALP (50 km) focalizado en el proceso de ${report.procesoAfectado || 'Contratación / Pagos / Obras'}.`,
    investigadorLider: report.oficialACargo || 'Oficial de Cumplimiento (a asignar)',
    fechaInicio: report.fechaRecepcion || '2026-07-15',
    fechaLimite: report.fechaLimiteInforme || '2026-08-30',
    declaracionNoConflicto: true,
    garantiaNoRepresalia: true
  });

  const [evidenceList, setEvidenceList] = useState([
    {
      id: 'EVID-01',
      tipo: 'Digital / Sistema Informático',
      descripcion: `Logs de auditoría del sistema de compras y pagos relacionados con ${report.categoria}.`,
      fechaRecoleccion: report.fechaRecepcion || '2026-07-15',
      custodio: 'Gerencia de Sistemas & Cumplimiento',
      hashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    },
    {
      id: 'EVID-02',
      tipo: 'Documental Físico / Certificado',
      descripcion: report.evidenciasAportadas || 'Expediente administrativo con pliegos, actas y comprobantes de pago.',
      fechaRecoleccion: '2026-07-18',
      custodio: 'Oficial de Cumplimiento AUBASA',
      hashSha256: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0'
    }
  ]);

  const [interviews, setInterviews] = useState([
    {
      id: 'INT-01',
      fecha: '2026-07-20',
      declarante: 'Testigo Clave / Supervisor Operativo',
      condicion: 'Testigo con reserva de identidad',
      resumenDeclaracion: 'Ratificó la mecánica de los hechos y aportó detalles sobre los horarios y personal involucrado en la traza BALP.',
      derechoDescargoGarantizado: true,
      actaFirmada: true
    },
    {
      id: 'INT-02',
      fecha: '2026-07-24',
      declarante: report.personasInvolucradas || 'Funcionario señalado en la denuncia',
      condicion: 'Persona Investigada',
      resumenDeclaracion: 'Formuló su descargo formal con asistencia de letrado patrocinante. No pudo justificar la incompatibilidad manifiesta.',
      derechoDescargoGarantizado: true,
      actaFirmada: true
    }
  ]);

  const [finalReportText, setFinalReportText] = useState(
    report.conclusionDictamen ||
    `Sobre la base de las evidencias analizadas y los testimonios recabados bajo directrices ISO/TS 37008:2023, se concluye la existencia de irregularidades administrativas tipificadas en el Código de Ética y la Cláusula 8.2 / 8.3 / 8.4 del SGAS ISO 37001.`
  );

  const [newEvidenceDesc, setNewEvidenceDesc] = useState('');
  const [newEvidenceType, setNewEvidenceType] = useState('Documental');

  const handleAddEvidence = (e) => {
    e.preventDefault();
    if (!newEvidenceDesc) return;
    const newHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setEvidenceList([
      ...evidenceList,
      {
        id: `EVID-0${evidenceList.length + 1}`,
        tipo: newEvidenceType,
        descripcion: newEvidenceDesc,
        fechaRecoleccion: new Date().toISOString().split('T')[0],
        custodio: 'Oficial de Cumplimiento AUBASA',
        hashSha256: newHash
      }
    ]);
    setNewEvidenceDesc('');
  };

  const handleCopyInvestigationSummary = () => {
    const text = `# EXPEDIENTE DE INVESTIGACIÓN INTERNA FORENSE (ISO/TS 37008:2023)
**Expediente:** ${report.id}
**Token Criptográfico:** ${report.tokenSeguimiento}
**Caso:** ${report.categoria} (${report.procesoAfectado})
**Ubicación BALP:** ${report.ubicacion}
**Investigador Líder:** ${torMandate.investigadorLider}
**Estado:** ${report.estado.toUpperCase()}

---

## 1. Términos de Referencia (ToR)
- **Mandato:** ${torMandate.mandato}
- **Alcance:** ${torMandate.alcance}
- **Declaración de Conflicto de Interés:** Verificada y descartada.
- **Garantías:** Protección activa al alertador y presunción de inocencia.

---

## 2. Evidencias y Cadena de Custodia (Hash SHA-256)
${evidenceList.map(ev => `- [${ev.id}] (${ev.tipo}): ${ev.descripcion} | Custodio: ${ev.custodio} | SHA-256: \`${ev.hashSha256}\``).join('\n')}

---

## 3. Actas de Entrevistas Forenses
${interviews.map(i => `- [${i.id} - ${i.fecha}] Declarante: ${i.declarante} (${i.condicion}) | Resumen: ${i.resumenDeclaracion}`).join('\n')}

---

## 4. Dictamen Final de Hechos Probados (Fact-Based Report)
${finalReportText}
`;
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 border-b border-indigo-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-950 border border-indigo-700 flex items-center justify-center text-indigo-400 shadow-inner">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                  {report.id}
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  Token: {report.tokenSeguimiento}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                  ISO/TS 37008:2023
                </span>
              </div>
              <h2 className="text-base font-black text-white mt-1">
                Expediente Digital de Investigación Interna Forense
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Pestañas del Expediente ISO/TS 37008 */}
        <div className="bg-slate-950 px-5 pt-3 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('tor')}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-t border-x ${
              activeTab === 'tor'
                ? 'bg-slate-900 text-indigo-300 border-indigo-600/80 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. Términos de Referencia (ToR)</span>
          </button>

          <button
            onClick={() => setActiveTab('evidence')}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-t border-x ${
              activeTab === 'evidence'
                ? 'bg-slate-900 text-cyan-300 border-cyan-600/80 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>2. Cadena de Custodia & Evidencias</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-cyan-950 text-cyan-400 font-mono">
              {evidenceList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('interviews')}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-t border-x ${
              activeTab === 'interviews'
                ? 'bg-slate-900 text-amber-300 border-amber-600/80 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>3. Actas de Entrevistas</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded bg-amber-950 text-amber-400 font-mono">
              {interviews.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 border-t border-x ${
              activeTab === 'report'
                ? 'bg-slate-900 text-emerald-300 border-emerald-600/80 shadow-md'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>4. Informe Final de Hechos Probados</span>
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {/* TAB 1: TÉRMINOS DE REFERENCIA */}
          {activeTab === 'tor' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-indigo-950/40 border border-indigo-800/60 p-4 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white font-bold text-sm">
                    Términos de Referencia Oficiales (ISO/TS 37008 Cl. 5)
                  </h4>
                  <p className="text-slate-400 mt-1 leading-relaxed">
                    Mandato legal e institucional emitido por la Función de Cumplimiento de AUBASA que delimita el objeto de la investigación, responsabilidades, plazos y salvaguardas de confidencialidad y no represalia.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Investigador Líder Asignado</span>
                  <p className="text-white font-bold text-xs">{torMandate.investigadorLider}</p>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Declaración jurada de no conflicto firmada</span>
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Plazos del Procedimiento</span>
                  <p className="text-white font-bold text-xs">
                    Inicio: <strong className="text-slate-200">{torMandate.fechaInicio}</strong> • Límite: <strong className="text-indigo-400">{torMandate.fechaLimite}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Ciclo ajustado a UNE-ISO 37002 (≤ 60 días hábiles)
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Mandato e Hipótesis Investigativa</span>
                <p className="text-slate-200 leading-relaxed font-medium">{torMandate.mandato}</p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <strong>Alcance territorial/funcional:</strong> {torMandate.alcance}
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Garantía de Protección Activa al Alertador contra Represalias (ISO 37002)</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-800">
                  ACTIVA
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: EVIDENCIAS & CADENA DE CUSTODIA CON HASH SHA-256 */}
          {activeTab === 'evidence' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm">
                    Registro de Evidencias & Cadena de Custodia (ISO/TS 37008 Cl. 6.3)
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Trazabilidad criptográfica para asegurar la inalterabilidad de pruebas documentales y digitales.
                  </p>
                </div>
              </div>

              {/* Formulario rápido para agregar evidencia */}
              <form onSubmit={handleAddEvidence} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                <select
                  value={newEvidenceType}
                  onChange={(e) => setNewEvidenceType(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                >
                  <option value="Documental Físico">Documental Físico</option>
                  <option value="Digital / Logs">Digital / Logs</option>
                  <option value="Peritaje Técnico">Peritaje Técnico</option>
                  <option value="Grabación / Audio">Grabación / Audio</option>
                </select>

                <input
                  type="text"
                  value={newEvidenceDesc}
                  onChange={(e) => setNewEvidenceDesc(e.target.value)}
                  placeholder="Detalle de la prueba asegurada (ej: Acta de ensayo LEMIT/UNLP)..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white min-w-[200px]"
                />

                <button
                  type="submit"
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs"
                >
                  Asegurar Evidencia
                </button>
              </form>

              {/* Lista de Evidencias */}
              <div className="space-y-2.5">
                {evidenceList.map((ev) => (
                  <div key={ev.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono font-bold text-[10px] border border-cyan-800">
                          {ev.id}
                        </span>
                        <span className="text-xs font-bold text-white">{ev.tipo}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Fecha: {ev.fechaRecoleccion}</span>
                    </div>

                    <p className="text-slate-300 text-xs">{ev.descripcion}</p>

                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                      <span className="truncate">SHA-256: {ev.hashSha256}</span>
                      <span className="text-slate-400 ml-2 shrink-0">Custodio: {ev.custodio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ACTAS DE ENTREVISTAS */}
          {activeTab === 'interviews' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h4 className="text-white font-bold text-sm">
                  Actas de Entrevistas Forenses (ISO/TS 37008 Cl. 6.4)
                </h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Garantía del derecho de defensa, presunción de inocencia y registro fehaciente de testimonios.
                </p>
              </div>

              <div className="space-y-3">
                {interviews.map((int) => (
                  <div key={int.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono font-bold text-[10px] border border-amber-800">
                          {int.id}
                        </span>
                        <strong className="text-white text-xs">{int.declarante}</strong>
                        <span className="text-[10px] text-slate-400">({int.condicion})</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{int.fecha}</span>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                      {int.resumenDeclaracion}
                    </p>

                    <div className="flex items-center gap-4 text-[10px] text-emerald-400 font-bold pt-1">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Derecho a descargo garantizado
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Acta de comparecencia firmada
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INFORME FINAL DE HECHOS PROBADOS (FACT-BASED REPORT) */}
          {activeTab === 'report' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm">
                    Dictamen & Informe Final de Hechos Probados (ISO/TS 37008 Cl. 7)
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Conclusiones objetivas basadas exclusivamente en las pruebas aseguradas.
                  </p>
                </div>

                <button
                  onClick={handleCopyInvestigationSummary}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedHash ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHash ? '¡Copiado!' : 'Copiar Expediente'}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="block text-slate-400 font-bold text-xs uppercase">
                  Conclusiones Fundamentadas & Recomendaciones de Remediación
                </label>
                <textarea
                  rows={5}
                  value={finalReportText}
                  onChange={(e) => setFinalReportText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-emerald-300 font-bold block mb-0.5">
                    Elevación Formal al Directorio de AUBASA & Comité de Ética
                  </strong>
                  <p className="text-slate-300 leading-relaxed">
                    El informe final habilita la aplicación de medidas disciplinarias internas, sanciones contractuales a contratistas y el cierre formal del ciclo bajo UNE-ISO 37002 Cl. 8.5.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-mono">
            Expediente Custodiado • Norma ISO/TS 37008:2023
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
            >
              Cerrar Expediente
            </button>
            <button
              onClick={() => {
                if (onUpdateReport) {
                  onUpdateReport({
                    ...report,
                    conclusionDictamen: finalReportText
                  });
                }
                onClose();
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors shadow-md"
            >
              Guardar y Actualizar Caso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
