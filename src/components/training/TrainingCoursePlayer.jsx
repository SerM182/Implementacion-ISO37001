import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Award,
  X,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Clock,
  Layers,
  GraduationCap
} from 'lucide-react';

export default function TrainingCoursePlayer({
  course,
  onClose,
  onStartQuiz
}) {
  if (!course) return null;

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const activeModule = course.modulos?.[activeModuleIndex] || course.modulos?.[0];
  const totalModules = course.modulos?.length || 1;

  const handleNext = () => {
    if (activeModuleIndex < totalModules - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
    } else {
      onStartQuiz(course);
    }
  };

  const handlePrev = () => {
    if (activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Glow Superior */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Cabecera del Visor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/80 text-[10px] font-mono font-bold">
              {course.codigo}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {course.clausulaIso}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold">
              {course.categoria}
            </span>
          </div>
          <h2 className="text-xl font-black text-white">
            {course.titulo}
          </h2>
          <p className="text-xs text-slate-400">
            Destinatarios: <strong className="text-cyan-300">{course.rolDestinatario}</strong> &bull; Duración: <strong className="text-white">{course.duracionHoras} horas</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => onStartQuiz(course)}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-900/30 transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Ir al Examen</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Contenido Principal con Sidebar de Módulos */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar de Navegación por Módulos */}
        <div className="lg:col-span-1 space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Módulos del Curso
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">
              {activeModuleIndex + 1}/{totalModules}
            </span>
          </div>

          <div className="space-y-1.5">
            {course.modulos?.map((mod, idx) => {
              const isActive = idx === activeModuleIndex;
              return (
                <button
                  key={mod.numero}
                  onClick={() => setActiveModuleIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all flex items-start gap-2.5 ${
                    isActive
                      ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-200'
                      : 'bg-slate-900/60 hover:bg-slate-800/60 border border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-mono font-black shrink-0 ${
                    isActive ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {mod.numero}
                  </span>
                  <span className="line-clamp-2 leading-snug">{mod.titulo}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1 text-cyan-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Criterio de Evaluación</span>
              </div>
              <p className="text-[10px] leading-relaxed">
                Aprobación obligatoria con &ge;80% para emisión del certificado ISO 37001 e incorporación al legajo Cl. 7.5.
              </p>
            </div>
          </div>
        </div>

        {/* Panel del Módulo Activo */}
        <div className="lg:col-span-3 space-y-6 bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Título del Módulo */}
            <div className="space-y-2 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Módulo {activeModule?.numero} de {totalModules}
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-xs font-mono text-slate-400">
                  Material Pedagógico Oficial AUBASA
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                {activeModule?.titulo}
              </h3>
            </div>

            {/* Puntos Clave de Aprendizaje */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Lineamientos Operativos y Normativos
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {activeModule?.puntosClave?.map((punto, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start gap-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/60 flex items-center justify-center text-xs font-mono font-black shrink-0 mt-0.5">
                      {pIdx + 1}
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {punto}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Caso Práctico / Escenario de Aplicación Vial */}
            <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-900/40 rounded-2xl space-y-2 relative overflow-hidden">
              <div className="flex items-center gap-2 text-cyan-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Aplicación en la Operación Vial de AUBASA
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Este contenido regula las decisiones cotidianas en las estaciones de peaje (Dock Sud, Hudson, Ramal Gutiérrez y accesos BALP), en los frentes de obra vial y en las compras públicas. La inobservancia de estos controles da lugar a sanciones administrativas conforme el Reglamento Interno y la Ley 27.401.
              </p>
            </div>
          </div>

          {/* Barra Inferior de Navegación de Módulos */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <button
              onClick={handlePrev}
              disabled={activeModuleIndex === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeModuleIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Módulo Anterior</span>
            </button>

            <div className="flex items-center gap-1.5">
              {course.modulos?.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeModuleIndex
                      ? 'w-6 bg-cyan-400'
                      : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-900/30 transition-all"
            >
              <span>{activeModuleIndex < totalModules - 1 ? 'Siguiente Módulo' : 'Finalizar y Rendir Examen'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
