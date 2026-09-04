import React from 'react';
import {
  ShieldCheck,
  Award,
  Layers,
  FileCheck2,
  Building2,
  CreditCard,
  HardHat,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function MaturityRadarCard({
  gapMaturity,
  risks = [],
  partners = [],
  onNavigate
}) {
  // Cálculo de riesgos residuales altos por proceso
  const highRisksByProcess = {
    'Contratación': risks.filter(r => r.proceso === 'Contratación' && r.evaluacionResidual?.nivel === 'alto').length,
    'Pagos': risks.filter(r => r.proceso === 'Pagos' && r.evaluacionResidual?.nivel === 'alto').length,
    'Obras Viales': risks.filter(r => r.proceso === 'Obras Viales' && r.evaluacionResidual?.nivel === 'alto').length
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Madurez del SGAS en los 3 Pilares del Alcance AUBASA
          </h3>
        </div>
        <span className="text-[10px] font-mono text-[#0284c7] font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
          Alcance Certificable
        </span>
      </div>

      {/* 3 Pilares del Alcance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Pilar 1: Contrataciones */}
        <div
          onClick={() => onNavigate && onNavigate('risks')}
          className="p-4 bg-slate-50 hover:bg-sky-50/50 border border-slate-200 hover:border-[#0284c7] rounded-xl cursor-pointer transition-all space-y-2 group shadow-2xs"
        >
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#0284c7] font-bold">
              <Building2 className="w-4 h-4" />
              <span>Contratación</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0284c7] transition-colors" />
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Licitaciones públicas, compras directas y pliegos técnicos con cláusulas antisoborno.
          </p>

          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium">Riesgos Altos Residuales:</span>
            <span className={`font-mono font-bold ${
              highRisksByProcess['Contratación'] > 0 ? 'text-rose-600' : 'text-emerald-600'
            }`}>
              {highRisksByProcess['Contratación']}
            </span>
          </div>
        </div>

        {/* Pilar 2: Pagos y Tesorería */}
        <div
          onClick={() => onNavigate && onNavigate('risks')}
          className="p-4 bg-slate-50 hover:bg-sky-50/50 border border-slate-200 hover:border-[#0284c7] rounded-xl cursor-pointer transition-all space-y-2 group shadow-2xs"
        >
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#0284c7] font-bold">
              <CreditCard className="w-4 h-4" />
              <span>Pagos y Tesorería</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0284c7] transition-colors" />
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Doble firma bancaria, fondos fijos en estaciones de peaje y redeterminaciones Dec. 367/17.
          </p>

          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium">Riesgos Altos Residuales:</span>
            <span className={`font-mono font-bold ${
              highRisksByProcess['Pagos'] > 0 ? 'text-rose-600' : 'text-emerald-600'
            }`}>
              {highRisksByProcess['Pagos']}
            </span>
          </div>
        </div>

        {/* Pilar 3: Obras Viales */}
        <div
          onClick={() => onNavigate && onNavigate('risks')}
          className="p-4 bg-slate-50 hover:bg-sky-50/50 border border-slate-200 hover:border-[#0284c7] rounded-xl cursor-pointer transition-all space-y-2 group shadow-2xs"
        >
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#0284c7] font-bold">
              <HardHat className="w-4 h-4" />
              <span>Obras Viales</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0284c7] transition-colors" />
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Cubicaciones, inspección en traza y ensayos de calados de asfalto/hormigón con laboratorios.
          </p>

          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium">Riesgos Altos Residuales:</span>
            <span className={`font-mono font-bold ${
              highRisksByProcess['Obras Viales'] > 0 ? 'text-rose-600' : 'text-emerald-600'
            }`}>
              {highRisksByProcess['Obras Viales']}
            </span>
          </div>
        </div>
      </div>

      {/* Madurez por Capítulos Normativos */}
      <div className="space-y-2.5 pt-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Nivel de Cumplimiento por Capítulos ISO 37001 (Cl. 4 a 10):
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          {gapMaturity?.byChapter && Object.entries(gapMaturity.byChapter).slice(0, 4).map(([chap, data]) => (
            <div key={chap} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-[11px] mb-1.5 font-bold">
                <span className="text-slate-700 line-clamp-1">{chap}</span>
                <span className="font-mono text-[#0284c7]">{data.percentage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full ${
                    data.percentage >= 85 ? 'bg-emerald-500' : data.percentage >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${data.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
