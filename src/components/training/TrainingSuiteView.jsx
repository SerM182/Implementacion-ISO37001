import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Users,
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  HardHat,
  CreditCard,
  Scale,
  FileCheck2,
  Printer,
  ChevronRight
} from 'lucide-react';

import TrainingKpiCards from './TrainingKpiCards.jsx';
import TrainingCourseCatalog from './TrainingCourseCatalog.jsx';
import TrainingCoursePlayer from './TrainingCoursePlayer.jsx';
import TrainingQuizSimulator from './TrainingQuizSimulator.jsx';
import TrainingCertificateModal from './TrainingCertificateModal.jsx';

import { COURSES_CATALOG, TRAINING_PLAN_OVERVIEW } from '../../data/initialTrainingData.js';
import { calculateTrainingMetrics } from '../../utils/trainingEngine.js';

export default function TrainingSuiteView({
  trainingPlan = TRAINING_PLAN_OVERVIEW,
  collaborators = [],
  onUpdateCollaborators,
  onAddRecord
}) {
  const [activeSubTab, setActiveSubTab] = useState('catalog'); // 'catalog' | 'quiz' | 'plan' | 'collaborators'
  const [selectedCourseForPlayer, setSelectedCourseForPlayer] = useState(null);
  const [selectedCourseForQuiz, setSelectedCourseForQuiz] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);

  const metrics = calculateTrainingMetrics(trainingPlan, COURSES_CATALOG, collaborators);

  // Handlers de navegación
  const handleOpenCoursePlayer = (course) => {
    setSelectedCourseForPlayer(course);
  };

  const handleStartQuiz = (course) => {
    setSelectedCourseForPlayer(null);
    setSelectedCourseForQuiz(course);
    setActiveSubTab('quiz');
  };

  const handleCertificateGenerated = (certificate) => {
    setActiveCertificate(certificate);

    // Actualizar o agregar al colaborador en la lista si se desea
    if (onUpdateCollaborators) {
      const existingCollab = collaborators.find(c => c.legajo === certificate.legajo);
      let updatedList;
      if (existingCollab) {
        updatedList = collaborators.map(c =>
          c.legajo === certificate.legajo
            ? {
                ...c,
                cursosCompletados: Array.from(new Set([...c.cursosCompletados, certificate.courseId])),
                calificacionPromedio: Math.round((c.calificacionPromedio + certificate.calificacion) / 2),
                horasAcumuladas: c.horasAcumuladas + certificate.duracionHoras,
                estadoCertificacion: 'certificado',
                fechaUltimaCertificacion: certificate.fechaEmision
              }
            : c
        );
      } else {
        const newCollab = {
          id: `COL-${collaborators.length + 1}`.padStart(7, '0'),
          nombre: certificate.nombreColaborador,
          legajo: certificate.legajo,
          area: certificate.area,
          cargo: 'Colaborador Acreditado',
          cursosCompletados: [certificate.courseId],
          calificacionPromedio: certificate.calificacion,
          horasAcumuladas: certificate.duracionHoras,
          estadoCertificacion: 'certificado',
          fechaUltimaCertificacion: certificate.fechaEmision
        };
        updatedList = [newCollab, ...collaborators];
      }
      onUpdateCollaborators(updatedList);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Cabecera Principal del Módulo */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/80 text-xs font-mono font-bold">
                Cláusulas 7.2 & 7.3 ISO 37001:2025
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/80 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Plan Anual 2026 Activo
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Suite de Capacitaciones & Simulador de Integridad AUBASA
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Programa integral de formación y evaluación de eficacia para inspectores de obras viales, personal de compras, tesorería y directivos.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => {
                setSelectedCourseForQuiz(null);
                setActiveSubTab('quiz');
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-900/40 transition-all"
            >
              <Award className="w-4 h-4" />
              <span>Simulador de Examen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tarjetas de Métricas Globales */}
      <TrainingKpiCards metrics={metrics} />

      {/* Subnavegación de Pestañas del Módulo */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            setActiveSubTab('catalog');
            setSelectedCourseForPlayer(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeSubTab === 'catalog'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Catálogo de Cursos ({COURSES_CATALOG.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeSubTab === 'quiz'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Simulador Situacional (Examen)</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('plan');
            setSelectedCourseForPlayer(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeSubTab === 'plan'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Plan Anual por Áreas</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('collaborators');
            setSelectedCourseForPlayer(null);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeSubTab === 'collaborators'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Matriz de Colaboradores ({collaborators.length})</span>
        </button>
      </div>

      {/* CONTENIDO SEGÚN SUBPESTAÑA ACTIVA */}

      {/* 1. CATÁLOGO / REPRODUCTOR */}
      {activeSubTab === 'catalog' && (
        selectedCourseForPlayer ? (
          <TrainingCoursePlayer
            course={selectedCourseForPlayer}
            onClose={() => setSelectedCourseForPlayer(null)}
            onStartQuiz={(course) => handleStartQuiz(course)}
          />
        ) : (
          <TrainingCourseCatalog
            courses={COURSES_CATALOG}
            onSelectCourse={handleOpenCoursePlayer}
            onStartQuiz={handleStartQuiz}
          />
        )
      )}

      {/* 2. SIMULADOR DE EXAMEN */}
      {activeSubTab === 'quiz' && (
        <TrainingQuizSimulator
          selectedCourse={selectedCourseForQuiz}
          onGenerateCertificate={handleCertificateGenerated}
          onCancel={() => {
            setSelectedCourseForQuiz(null);
            setActiveSubTab('catalog');
          }}
        />
      )}

      {/* 3. PLAN ANUAL POR ÁREAS */}
      {activeSubTab === 'plan' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  Programa Anual de Capacitación 2026
                </span>
                <h2 className="text-xl font-black text-white">
                  Desglose de Cobertura y Horas Requeridas por Sector Vial
                </h2>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-slate-300">Año en curso: 2026</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainingPlan.areasAlcanzadas?.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white">
                      {area.nombre}
                    </h3>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-800/60">
                      {area.progreso}%
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Personal asignado:</span>
                      <strong className="text-white font-mono">{area.personal} personas</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Horas requeridas:</span>
                      <strong className="text-white font-mono">{area.horasRequeridas} hrs / persona</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Horas planificadas:</span>
                      <strong className="text-cyan-300 font-mono">{area.personal * area.horasRequeridas} hrs</strong>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${area.progreso}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Cuadro explicativo de auditoría */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-slate-300">
                <span className="font-bold text-white block">
                  Requisito de Auditoría ISO 37001 (Cl. 7.2 & 7.3)
                </span>
                <p className="leading-relaxed text-slate-400">
                  La organización debe conservar información documentada apropiada como evidencia de la competencia del personal. Todo colaborador en puestos de riesgo medio/alto de soborno debe acreditar la aprobación del curso específico con una periodicidad mínima anual.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MATRIZ DE COLABORADORES */}
      {activeSubTab === 'collaborators' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                  Padrón de Personal Formado
                </span>
                <h2 className="text-xl font-black text-white">
                  Registro de Competencias y Certificaciones Individuales
                </h2>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Total Registrados: <strong className="text-white">{collaborators.length}</strong>
              </div>
            </div>

            {/* Tabla de Colaboradores */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-950 text-slate-300 border-b border-slate-800 font-bold">
                    <th className="p-3.5">Colaborador / Legajo</th>
                    <th className="p-3.5">Área / Cargo</th>
                    <th className="p-3.5 text-center">Cursos Completados</th>
                    <th className="p-3.5 text-center">Horas Formación</th>
                    <th className="p-3.5 text-center">Eficacia Promedio</th>
                    <th className="p-3.5 text-center">Estado Certificación</th>
                    <th className="p-3.5 text-right">Última Emisión</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                  {collaborators.map((collab) => (
                    <tr key={collab.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5">
                        <strong className="text-white block">{collab.nombre}</strong>
                        <span className="text-[10px] font-mono text-slate-400">{collab.legajo}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-slate-200 block">{collab.cargo}</span>
                        <span className="text-[10px] text-slate-400">{collab.area}</span>
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-cyan-400">
                        {collab.cursosCompletados?.length || 0} cursos
                      </td>
                      <td className="p-3.5 text-center font-mono">
                        {collab.horasAcumuladas} hrs
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-emerald-400">
                        {collab.calificacionPromedio}%
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Certificado
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-mono text-slate-400 text-[11px]">
                        {collab.fechaUltimaCertificacion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Certificado Oficial */}
      {activeCertificate && (
        <TrainingCertificateModal
          certificate={activeCertificate}
          isOpen={!!activeCertificate}
          onClose={() => setActiveCertificate(null)}
          onAddRecord={onAddRecord}
        />
      )}
    </div>
  );
}
