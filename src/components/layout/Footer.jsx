import React from 'react';
import { Shield, PhoneCall, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { AUBASA_CONTEXT } from '../../data/aubasaContext.js';

export default function Footer({ onOpenExportModal }) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 text-slate-600 text-xs py-10 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: AUBASA SGAS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0284c7] to-[#0ea5e9] flex items-center justify-center text-white font-black text-sm shadow-xs">
                A
              </div>
              <span className="font-extrabold text-slate-900 text-sm tracking-wide">
                AUBASA S.A.
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              {AUBASA_CONTEXT.nombreOficial} — Concesionaria pública de la Red Vial Provincial de Buenos Aires. Sistema de Gestión Antisoborno según Norma IRAM-ISO 37001:2025.
            </p>
          </div>

          {/* Columna 2: Alcance Operativo */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Alcance Auditado (50 km)
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-500">
              <li>• Licitaciones Públicas y Contrataciones</li>
              <li>• Controles Financieros y Pagos a Proveedores</li>
              <li>• Planificación y Ejecución de Obras Viales</li>
              <li>• Fondos Fijos y Recaudación en Peajes</li>
              <li>• Ensayos Técnicos LEMIT / UNLP</li>
            </ul>
          </div>

          {/* Columna 3: Marco Regulatorio */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Marco Legal & Trilogía
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-500">
              <li>• Norma Internacional ISO 37001:2025 (SGAS)</li>
              <li>• UNE-ISO 37002:2021 (Whistleblowing)</li>
              <li>• ISO/TS 37008:2023 (Investigaciones Forenses)</li>
              <li>• Ley Nacional 27.401 (Resp. Penal)</li>
              <li>• Decreto Provincial 367/17 (Redeterminaciones)</li>
            </ul>
          </div>

          {/* Columna 4: Canal Confidencial */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Línea Ética y Denuncias
            </h4>
            <div className="flex items-center gap-2 text-[11px] text-slate-700 font-semibold">
              <Mail className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>canal.etico@aubasa.com.ar</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-700 font-semibold">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>0800-468-3474 (Línea Confidencial)</span>
            </div>
            <p className="text-[10px] text-slate-400 pt-1">
              Garantía estricta de no represalias y reserva de identidad para denunciantes de buena fe (Cl. 8.9).
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AUBASA — Autopistas de Buenos Aires S.A. | Sistema de Gestión Antisoborno (SGAS).
          </div>
          <div className="flex items-center gap-4 font-medium">
            <span>Oficial de Cumplimiento: Dr. Martín Valenzuela</span>
            <span>•</span>
            <span className="text-[#0284c7] font-bold">Acreditación IRAM ISO 37001</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
