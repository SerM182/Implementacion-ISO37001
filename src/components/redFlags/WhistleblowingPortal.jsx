import React, { useState } from 'react';
import {
  ShieldAlert,
  Lock,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Search,
  AlertTriangle,
  HelpCircle,
  FileText,
  UserCheck,
  EyeOff,
  Building2,
  Clock
} from 'lucide-react';

export default function WhistleblowingPortal({
  reports = [],
  onCreateReport
}) {
  const [mode, setMode] = useState('new'); // 'new' | 'track'
  const [tipoDenunciante, setTipoDenunciante] = useState('anonimo'); // 'anonimo' | 'identificado'

  // Formulario de nueva denuncia
  const [formData, setFormData] = useState({
    nombreDenunciante: '',
    contactoDenunciante: '',
    categoria: 'Conflicto de Intereses en Licitación',
    procesoAfectado: 'Contratación',
    ubicacion: 'Autopista Buenos Aires - La Plata',
    personasInvolucradas: '',
    descripcion: '',
    evidenciasAportadas: ''
  });

  const [submittedReport, setSubmittedReport] = useState(null);
  const [copiedToken, setCopiedToken] = useState(false);

  // Consulta de seguimiento por Token
  const [searchToken, setSearchToken] = useState('');
  const [trackedReport, setTrackedReport] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.descripcion.trim()) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const token = `AU-ETH-2026-${randomNum}`;
    const newId = `CASE-2026-${String(reports.length + 1).padStart(3, '0')}`;

    const newReport = {
      id: newId,
      tokenSeguimiento: token,
      fechaRecepcion: new Date().toISOString().slice(0, 10),
      origen: tipoDenunciante === 'anonimo' ? 'Canal Ético Web (Anónimo)' : 'Canal Ético Web (Identificado)',
      tipoDenunciante,
      nombreDenunciante: tipoDenunciante === 'identificado' ? formData.nombreDenunciante : 'Anónimo Protegido',
      contactoDenunciante: tipoDenunciante === 'identificado' ? formData.contactoDenunciante : '',
      categoria: formData.categoria,
      procesoAfectado: formData.procesoAfectado,
      ubicacion: formData.ubicacion,
      descripcion: formData.descripcion,
      personasInvolucradas: formData.personasInvolucradas || 'No especificadas en la presentación',
      evidenciasAportadas: formData.evidenciasAportadas || 'Sin archivos adjuntos especificados',
      estado: 'recibida',
      prioridad: 'alta',
      oficialACargo: 'Dr. Martín Valenzuela (Oficial de Cumplimiento)',
      fechaLimiteInforme: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      accionesTomadas: [
        {
          fecha: new Date().toISOString().slice(0, 10),
          detalle: 'Recepción formal mediante el Canal Ético de AUBASA y generación de expediente confidencial.'
        }
      ],
      conclusionDictamen: 'Caso ingresado en evaluación preliminar por la Función de Cumplimiento Antisoborno.'
    };

    onCreateReport(newReport);
    setSubmittedReport(newReport);
  };

  const handleCopyToken = () => {
    if (!submittedReport?.tokenSeguimiento) return;
    navigator.clipboard.writeText(submittedReport.tokenSeguimiento);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleSearchTracking = (e) => {
    e.preventDefault();
    const cleanToken = searchToken.trim().toUpperCase();
    if (!cleanToken) return;

    const found = reports.find(
      r => r.tokenSeguimiento?.toUpperCase() === cleanToken || r.id?.toUpperCase() === cleanToken
    );
    setTrackedReport(found || null);
    setHasSearched(true);
  };

  const handleResetForm = () => {
    setSubmittedReport(null);
    setFormData({
      nombreDenunciante: '',
      contactoDenunciante: '',
      categoria: 'Conflicto de Intereses en Licitación',
      procesoAfectado: 'Contratación',
      ubicacion: 'Autopista Buenos Aires - La Plata',
      personasInvolucradas: '',
      descripcion: '',
      evidenciasAportadas: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Selector de Modo: Cargar Denuncia vs Consultar Estado */}
      <div className="flex items-center justify-center gap-3">
        <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex items-center">
          <button
            onClick={() => setMode('new')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'new'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Presentar Reporte Confidencial</span>
          </button>

          <button
            onClick={() => setMode('track')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'track'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Consultar Estado por Código</span>
          </button>
        </div>
      </div>

      {/* MODO NUEVO REPORTE */}
      {mode === 'new' && (
        <div className="max-w-3xl mx-auto">
          {submittedReport ? (
            /* Confirmación de Envío con Token Seguro */
            <div className="bg-slate-900/95 border border-cyan-500/60 rounded-2xl p-8 shadow-2xl space-y-6 animate-in fade-in duration-300 text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-950">
                <CheckCircle2 className="w-8 h-8 text-cyan-400" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase tracking-wider">
                  Reporte Registrado con Éxito
                </span>
                <h3 className="text-lg font-black text-white mt-3">
                  Su reporte ha sido recibido por la Función de Cumplimiento Antisoborno
                </h3>
                <p className="text-xs text-slate-400 max-w-lg mx-auto mt-1 leading-relaxed">
                  Garantizamos confidencialidad absoluta y protección contra represalias según la Cláusula 8.9 de la Norma ISO 37001:2016 y la Ley Nacional 27.401.
                </p>
              </div>

              {/* Caja del Token de Seguimiento */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 max-w-md mx-auto space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                  Código Confidencial de Seguimiento:
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl font-mono font-black text-cyan-300 tracking-wider">
                    {submittedReport.tokenSeguimiento}
                  </span>
                  <button
                    onClick={handleCopyToken}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
                    title="Copiar código"
                  >
                    {copiedToken ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-amber-400/90 font-medium pt-1">
                  Guarde este código en un lugar seguro. Le permitirá consultar el avance de la investigación sin revelar sus datos.
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handleResetForm}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                >
                  Presentar Otro Reporte
                </button>
                <button
                  onClick={() => {
                    setSearchToken(submittedReport.tokenSeguimiento);
                    setTrackedReport(submittedReport);
                    setHasSearched(true);
                    setMode('track');
                  }}
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all shadow"
                >
                  Ver Estado de Este Reporte
                </button>
              </div>
            </div>
          ) : (
            /* Formulario de Carga de Denuncia */
            <form onSubmit={handleSubmit} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Header del Formulario */}
              <div className="border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-black text-white">
                    Canal Ético y Línea de Denuncias AUBASA
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Espacio seguro y protegido para informar presuntos sobornos, conflictos de interés, irregularidades en peajes, pagos o certificaciones de obra (ISO 37001 Cl. 8.9).
                </p>
              </div>

              {/* Selector de Tipo de Denunciante: Anónimo vs Identificado */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Modalidad de Presentación:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTipoDenunciante('anonimo')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      tipoDenunciante === 'anonimo'
                        ? 'bg-cyan-950/80 border-cyan-500 shadow-md'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <EyeOff className="w-5 h-5 text-cyan-400 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Presentación Anónima (100% Protegida)</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        No se solicitará ningún dato personal ni se rastreará su dirección IP.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTipoDenunciante('identificado')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      tipoDenunciante === 'identificado'
                        ? 'bg-cyan-950/80 border-cyan-500 shadow-md'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <UserCheck className="w-5 h-5 text-cyan-400 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Identidad con Reserva de Confidencialidad</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Sus datos solo serán accesibles para el Oficial de Cumplimiento.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Campos si es Identificado */}
              {tipoDenunciante === 'identificado' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Nombre Completo y Cargo</label>
                    <input
                      type="text"
                      value={formData.nombreDenunciante}
                      onChange={(e) => setFormData({ ...formData, nombreDenunciante: e.target.value })}
                      placeholder="Ej: Ing. Roberto Rossi - Inspector de Obras"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                      required={tipoDenunciante === 'identificado'}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Contacto Confidencial (Email / Teléfono)</label>
                    <input
                      type="text"
                      value={formData.contactoDenunciante}
                      onChange={(e) => setFormData({ ...formData, contactoDenunciante: e.target.value })}
                      placeholder="Ej: contacto.personal@email.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                      required={tipoDenunciante === 'identificado'}
                    />
                  </div>
                </div>
              )}

              {/* Proceso y Categoría */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Proceso Operativo Afectado <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.procesoAfectado}
                    onChange={(e) => setFormData({ ...formData, procesoAfectado: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    <option value="Contratación">Contratación (Licitaciones y Compras)</option>
                    <option value="Pagos">Pagos (Tesorería, Fondos Fijos, Peajes)</option>
                    <option value="Obras Viales">Planificación y Ejecución de Obras Viales</option>
                    <option value="Operaciones">Operaciones y Atención al Usuario</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Categoría de la Irregularidad <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  >
                    <option value="Conflicto de Intereses en Licitación">Conflicto de Intereses en Licitación</option>
                    <option value="Solicitud o Aceptación de Soborno">Solicitud o Aceptación de Soborno</option>
                    <option value="Irregularidad en Ensayos de Calidad de Asfalto">Irregularidad en Ensayos de Asfalto / Obras</option>
                    <option value="Uso Indebido de Fondos Fijos en Peaje">Uso Indebido de Fondos Fijos en Peaje</option>
                    <option value="Presión para Certificación de Obra Incompleta">Presión para Certificación de Obra Incompleta</option>
                    <option value="Colusión o Direccionamiento de Pliegos">Colusión o Direccionamiento de Pliegos</option>
                    <option value="Otro Incumplimiento Normativo">Otro Incumplimiento Normativo</option>
                  </select>
                </div>
              </div>

              {/* Ubicación y Personas Involucradas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Lugar / Tramo Vial / Estación de Peaje
                  </label>
                  <input
                    type="text"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    placeholder="Ej: Peaje Dock Sud / Peaje Hudson / Autopista BALP Km 28 / Sede Central"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Personas, Empresas o Funcionarios Involucrados
                  </label>
                  <input
                    type="text"
                    value={formData.personasInvolucradas}
                    onChange={(e) => setFormData({ ...formData, personasInvolucradas: e.target.value })}
                    placeholder="Nombres, cargos o razones sociales conocidas..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Descripción de los Hechos */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Descripción Detallada de los Hechos <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  placeholder="Relate con la mayor precisión posible qué ocurrió, cuándo, cómo y si hubo terceros presentes..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white leading-relaxed"
                />
              </div>

              {/* Evidencias */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Evidencias, Documentos o Indicios Disponibles
                </label>
                <textarea
                  rows={2}
                  value={formData.evidenciasAportadas}
                  onChange={(e) => setFormData({ ...formData, evidenciasAportadas: e.target.value })}
                  placeholder="Mencione si posee correos electrónicos, fotos, planillas, remitos o testigos de la situación..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              {/* Garantía de No Represalias */}
              <div className="bg-cyan-950/40 border border-cyan-900/60 rounded-xl p-3.5 flex items-start gap-3 text-xs text-cyan-200">
                <ShieldAlert className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Política de Tolerancia Cero y Protección al Denunciante:</strong> AUBASA garantiza que ningún colaborador o socio comercial sufrirá represalias, sanciones ni perjuicios por reportar de buena fe conductas contrarias al SGAS.
                </p>
              </div>

              {/* Botón de Envío */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={!formData.descripcion.trim()}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-950 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Reporte Confidencial</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* MODO CONSULTAR ESTADO DE REPORTE */}
      {mode === 'track' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-400" />
                Consulta Confidencial de Estado
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ingrese el código alfanumérico que le fue asignado al presentar su reporte (ej: <code>AU-ETH-2026-8942</code>).
              </p>
            </div>

            <form onSubmit={handleSearchTracking} className="flex gap-2">
              <input
                type="text"
                value={searchToken}
                onChange={(e) => setSearchToken(e.target.value)}
                placeholder="Ingrese su código (AU-ETH-2026-XXXX o CASE-2026-XXX)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Consultar</span>
              </button>
            </form>

            {hasSearched && (
              <div className="pt-4 border-t border-slate-800">
                {trackedReport ? (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 animate-in fade-in">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-cyan-400">
                            {trackedReport.tokenSeguimiento}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            ({trackedReport.id})
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1">
                          {trackedReport.categoria}
                        </h4>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        trackedReport.estado === 'cerrada'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : trackedReport.estado === 'comite_etica'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}>
                        {trackedReport.estado.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Fecha de Ingreso</span>
                        <span className="text-slate-200 font-mono">{trackedReport.fechaRecepcion}</span>
                      </div>
                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Proceso Afectado</span>
                        <span className="text-slate-200">{trackedReport.procesoAfectado}</span>
                      </div>
                      <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Oficial a Cargo</span>
                        <span className="text-slate-200">{trackedReport.oficialACargo}</span>
                      </div>
                    </div>

                    {/* Bitácora de Acciones */}
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Bitácora de Tratamiento e Investigación:
                      </span>
                      <div className="space-y-2">
                        {trackedReport.accionesTomadas?.map((acc, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                            <Clock className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-mono text-cyan-300 font-bold mr-2">{acc.fecha}:</span>
                              <span className="text-slate-300">{acc.detalle}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dictamen / Conclusión */}
                    <div className="bg-slate-900 p-3.5 rounded-lg border-l-4 border-cyan-500">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                        Dictamen / Estado Actual de la Función de Cumplimiento:
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {trackedReport.conclusionDictamen}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-8 bg-slate-950 rounded-xl border border-slate-800">
                    <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <h4 className="text-xs font-bold text-white">No se encontró ningún expediente con ese código</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Verifique que el código esté escrito correctamente (ej: AU-ETH-2026-XXXX).
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
