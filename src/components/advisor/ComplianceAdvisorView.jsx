import React, { useState } from 'react';
import ChatInterface from './ChatInterface.jsx';
import DecisionTreeWizard from './DecisionTreeWizard.jsx';
import QuickScenarioCards from './QuickScenarioCards.jsx';
import {
  Bot,
  GitBranch,
  FileSpreadsheet,
  ShieldCheck,
  BookOpen,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function ComplianceAdvisorView() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'trees' | 'scenarios'

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-wide">
              Asistente Especialista en Compliance ISO 37001:2016
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              AUBASA Expert Engine
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Orientación técnica inmediata, resolución de dilemas éticos y aplicación de la Ley 27.401 y Ley 6021 en la operación vial.
          </p>
        </div>

        {/* Pestañas de Navegación del Asistente */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Consultor Virtual</span>
          </button>

          <button
            onClick={() => setActiveTab('trees')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'trees'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Árboles de Decisión</span>
          </button>

          <button
            onClick={() => setActiveTab('scenarios')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'scenarios'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Casos y Dictámenes</span>
          </button>
        </div>
      </div>

      {/* Contenido según pestaña */}
      <div>
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'trees' && <DecisionTreeWizard />}
        {activeTab === 'scenarios' && <QuickScenarioCards />}
      </div>
    </div>
  );
}
