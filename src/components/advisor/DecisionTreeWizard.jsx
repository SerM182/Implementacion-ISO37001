import React, { useState } from 'react';
import { COMPLIANCE_KNOWLEDGE_BASE } from '../../data/complianceKnowledgeBase.js';
import {
  HelpCircle,
  GitBranch,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function DecisionTreeWizard() {
  const trees = COMPLIANCE_KNOWLEDGE_BASE.arbolesDecision || [];
  const [selectedTreeId, setSelectedTreeId] = useState(trees[0]?.id || 'tree-regalos');
  const [currentStep, setCurrentStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [finalResult, setFinalResult] = useState(null);

  const activeTree = trees.find(t => t.id === selectedTreeId) || trees[0];
  const stepData = activeTree?.pasos?.find(p => p.paso === currentStep);

  const handleSelectTree = (treeId) => {
    setSelectedTreeId(treeId);
    setCurrentStep(1);
    setHistory([]);
    setFinalResult(null);
  };

  const handleOptionClick = (option) => {
    const nextHistory = [
      ...history,
      {
        paso: currentStep,
        pregunta: stepData.pregunta,
        respuestaElegida: option.texto
      }
    ];
    setHistory(nextHistory);

    if (option.resultado) {
      setFinalResult({
        resultado: option.resultado,
        tipo: option.tipo || 'condicionado'
      });
    } else if (option.siguientePaso) {
      setCurrentStep(option.siguientePaso);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setHistory([]);
    setFinalResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Selector de Árboles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {trees.map((tree) => (
          <button
            key={tree.id}
            onClick={() => handleSelectTree(tree.id)}
            className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedTreeId === tree.id
                ? 'bg-cyan-950/70 border-cyan-500 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-mono mb-1">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Protocolo de Decisión</span>
              </div>
              <h4 className="text-xs font-bold text-white leading-snug">{tree.titulo}</h4>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {tree.descripcion}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
              {tree.pasos?.length} bifurcaciones normativas
            </div>
          </button>
        ))}
      </div>

      {/* Panel Interactivo del Árbol */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              {activeTree.titulo}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{activeTree.descripcion}</p>
          </div>

          {(history.length > 0 || finalResult) && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Árbol</span>
            </button>
          )}
        </div>

        {/* Historial de Preguntas y Respuestas */}
        {history.length > 0 && (
          <div className="space-y-2 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Ruta de Decisión Evaluada:
            </span>
            {history.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-300">
                <span className="text-cyan-400 font-mono font-bold">Paso {h.paso}:</span>
                <span className="text-slate-400 flex-1">{h.pregunta}</span>
                <span className="font-semibold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800 text-[11px]">
                  {h.respuestaElegida}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Paso Actual o Resultado Final */}
        {finalResult ? (
          <div
            className={`p-6 rounded-xl border space-y-4 animate-in fade-in duration-300 ${
              finalResult.tipo === 'prohibido'
                ? 'bg-rose-950/50 border-rose-700 text-rose-100'
                : finalResult.tipo === 'aceptable'
                ? 'bg-emerald-950/50 border-emerald-700 text-emerald-100'
                : 'bg-amber-950/50 border-amber-700 text-amber-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {finalResult.tipo === 'prohibido' ? (
                <div className="w-10 h-10 rounded-xl bg-rose-900 border border-rose-500 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-6 h-6 text-rose-300" />
                </div>
              ) : finalResult.tipo === 'aceptable' ? (
                <div className="w-10 h-10 rounded-xl bg-emerald-900 border border-emerald-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-amber-900 border border-amber-500 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-300" />
                </div>
              )}

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest block opacity-80">
                  {finalResult.tipo === 'prohibido'
                    ? 'ACCION PROHIBIDA / RIESGO CRÍTICO DE SOBORNO'
                    : finalResult.tipo === 'aceptable'
                    ? 'ACCIÓN PERMITIDA / CONFORME SGAS'
                    : 'ACCIÓN CONDICIONADA A DICTAMEN DE COMPLIANCE'}
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  Dictamen Institucional Vinculante
                </h4>
              </div>
            </div>

            <p className="text-xs leading-relaxed p-4 bg-slate-950/70 border border-slate-800 rounded-lg text-white font-medium">
              {finalResult.resultado}
            </p>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors"
              >
                Evaluar Otra Situación
              </button>
            </div>
          </div>
        ) : stepData ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-md font-mono text-xs font-bold">
                Paso {stepData.paso} de {activeTree.pasos.length}
              </span>
              <span className="text-xs font-semibold text-slate-400">Pregunta de Evaluación:</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <p className="text-sm font-bold text-white leading-relaxed">
                {stepData.pregunta}
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Seleccione la alternativa que describe su caso:
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {stepData.opciones.map((op, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(op)}
                    className="p-3.5 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500 rounded-xl text-left flex items-center justify-between gap-3 text-xs text-slate-200 transition-all group"
                  >
                    <span className="font-medium group-hover:text-cyan-300">{op.texto}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
