import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  FileCheck2,
  ChevronRight,
  UserCheck,
  Building2
} from 'lucide-react';
import { evaluateQuizAnswers, buildCertificateData } from '../../utils/trainingEngine.js';
import { SITUATIONAL_QUIZ_QUESTIONS } from '../../data/initialTrainingData.js';

export default function TrainingQuizSimulator({
  selectedCourse,
  onGenerateCertificate,
  onCancel
}) {
  // Si hay un curso seleccionado, podemos priorizar sus preguntas o usar todas las preguntas situacionales
  const questions = SITUATIONAL_QUIZ_QUESTIONS;

  const [answers, setAnswers] = useState({});
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Formulario del colaborador para el certificado
  const [collabName, setCollabName] = useState('');
  const [collabDni, setCollabDni] = useState('');
  const [collabLegajo, setCollabLegajo] = useState('');
  const [collabArea, setCollabArea] = useState('');

  const handleSelectOption = (questionId, optionIndex) => {
    if (evaluationResult) return; // Bloqueado tras evaluar
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleEvaluate = () => {
    const result = evaluateQuizAnswers(questions, answers);
    setEvaluationResult(result);
  };

  const handleReset = () => {
    setAnswers({});
    setEvaluationResult(null);
  };

  const handleCreateCertificate = () => {
    if (!evaluationResult || !evaluationResult.isPassed) return;

    const cert = buildCertificateData({
      course: selectedCourse || {
        id: 'CUR-01',
        codigo: 'CAP-SGAS-01',
        titulo: 'Programa Integral de Capacitación y Evaluación Antisoborno ISO 37001',
        clausulaIso: 'Cl. 7.2 & 7.3',
        duracionHoras: 4
      },
      collaboratorName: collabName,
      collaboratorDni: collabDni,
      collaboratorLegajo: collabLegajo,
      collaboratorArea: collabArea,
      score: evaluationResult.score
    });

    onGenerateCertificate(cert);
  };

  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === questions.length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      {/* Cabecera del Simulador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/80 text-[10px] font-mono font-bold">
              Simulador de Eficacia Cl. 7.2 & 7.3
            </span>
            <span className="text-xs font-mono text-slate-400">
              Evaluación Situacional AUBASA
            </span>
          </div>
          <h2 className="text-xl font-black text-white">
            {selectedCourse ? `Evaluación: ${selectedCourse.titulo}` : 'Examen Situacional de Dilemas Éticos y Controles Antisoborno'}
          </h2>
          <p className="text-xs text-slate-400">
            Responda los dilemas reales de la operación de autopistas para evaluar el entendimiento práctico de la Norma ISO 37001:2025.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Respondidas</span>
            <span className="text-xs font-mono font-bold text-cyan-400">
              {answeredCount} / {questions.length}
            </span>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
            >
              Volver
            </button>
          )}
        </div>
      </div>

      {/* RESULTADO DE LA EVALUACIÓN (SI YA SE EVALUÓ) */}
      {evaluationResult && (
        <div className={`p-6 rounded-2xl border ${
          evaluationResult.isPassed
            ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
            : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
        } space-y-4 animate-fadeIn`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {evaluationResult.isPassed ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              ) : (
                <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-400">
                  <XCircle className="w-8 h-8" />
                </div>
              )}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
                  Dictamen de Eficacia de la Formación
                </span>
                <h3 className="text-lg font-black">
                  {evaluationResult.isPassed ? 'Acreditación Exitosa (Competente)' : 'No Acreditado (Repaso Requerido)'}
                </h3>
              </div>
            </div>

            <div className="flex items-baseline gap-2 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
              <span className="text-xs text-slate-400">Calificación:</span>
              <span className={`text-2xl font-black font-mono ${
                evaluationResult.isPassed ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {evaluationResult.score}%
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                ({evaluationResult.correctCount}/{evaluationResult.totalQuestions} correctas)
              </span>
            </div>
          </div>

          <p className="text-xs leading-relaxed opacity-90">
            {evaluationResult.feedbackGeneral}
          </p>

          {/* Formulario de Emisión de Certificado si Aprobó */}
          {evaluationResult.isPassed ? (
            <div className="pt-4 border-t border-emerald-800/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Datos del Colaborador para Emisión del Certificado Oficial
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    Nombre y Apellido
                  </label>
                  <input
                    type="text"
                    value={collabName}
                    onChange={(e) => setCollabName(e.target.value)}
                    placeholder="Apellido, Nombre"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    DNI / Identificación
                  </label>
                  <input
                    type="text"
                    value={collabDni}
                    onChange={(e) => setCollabDni(e.target.value)}
                    placeholder="XX.XXX.XXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    Nº de Legajo AUBASA
                  </label>
                  <input
                    type="text"
                    value={collabLegajo}
                    onChange={(e) => setCollabLegajo(e.target.value)}
                    placeholder="LEG-XXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                    Área / Puesto
                  </label>
                  <input
                    type="text"
                    value={collabArea}
                    onChange={(e) => setCollabArea(e.target.value)}
                    placeholder="Ej: Sede Central / Obras Viales"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleCreateCertificate}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Emitir Certificado Oficial ISO 37001</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reintentar Examen</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t border-rose-800/40">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reintentar Evaluación</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* LISTA DE PREGUNTAS / DILEMAS SITUACIONALES */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selectedOption = answers[q.id];
          const evaluatedQuestion = evaluationResult?.breakdown?.find(b => b.questionId === q.id);

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                evaluatedQuestion
                  ? evaluatedQuestion.isCorrect
                    ? 'bg-emerald-950/20 border-emerald-800/50'
                    : 'bg-rose-950/20 border-rose-800/50'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              } space-y-4`}
            >
              {/* Cabecera de la Pregunta */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">
                      {q.clausulaIso} &bull; Caso Situacional AUBASA
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                      {q.pregunta}
                    </h3>
                  </div>
                </div>

                {evaluatedQuestion && (
                  <div className="shrink-0">
                    {evaluatedQuestion.isCorrect ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Correcta
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-bold">
                        <XCircle className="w-3.5 h-3.5" />
                        Incorrecta
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Opciones de Respuesta */}
              <div className="space-y-2 pl-9">
                {q.opciones.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = q.respuestaCorrecta === optIdx;

                  let optionClasses = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white';

                  if (evaluationResult) {
                    if (isCorrect) {
                      optionClasses = 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200 font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionClasses = 'bg-rose-950/50 border-rose-500/60 text-rose-200 line-through';
                    } else {
                      optionClasses = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optionClasses = 'bg-cyan-950/60 border-cyan-500 text-cyan-100 font-medium shadow-sm shadow-cyan-500/20';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={!!evaluationResult}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${optionClasses}`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {opt.id.toUpperCase()}
                      </span>
                      <span>{opt.texto}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explicación Pedagógica si fue evaluado */}
              {evaluatedQuestion && (
                <div className="pl-9 pt-2">
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                      Fundamento Normativo y Operativo:
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {q.explicacion}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botón de Envío si aún no se evalúa */}
      {!evaluationResult && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            {isAllAnswered
              ? 'Todas las preguntas han sido respondidas. Puede proceder a la calificación.'
              : `Faltan ${questions.length - answeredCount} preguntas por responder.`}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
            >
              Reiniciar Respuestas
            </button>

            <button
              onClick={handleEvaluate}
              disabled={!isAllAnswered}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
                isAllAnswered
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-900/40'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Calificar y Evaluar Eficacia</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
