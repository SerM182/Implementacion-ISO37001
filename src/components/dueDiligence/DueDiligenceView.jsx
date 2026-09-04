import React, { useState, useMemo } from 'react';
import PartnerEvaluatorModal from './PartnerEvaluatorModal.jsx';
import DueDiligenceCertificate from './DueDiligenceCertificate.jsx';
import SearchFilterBar from '../common/SearchFilterBar.jsx';
import { RiskBadge } from '../common/Badge.jsx';
import { formatCurrencyARS, formatDate } from '../../utils/formatters.js';
import {
  Building2,
  PlusCircle,
  Award,
  FileCheck,
  Edit,
  Trash2,
  AlertTriangle,
  ShieldAlert,
  Search,
  CheckCircle2
} from 'lucide-react';

export default function DueDiligenceView({
  partnersList = [],
  onUpdatePartners
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  // Modales
  const [isEvalModalOpen, setIsEvalModalOpen] = useState(false);
  const [partnerToEdit, setPartnerToEdit] = useState(null);
  const [certificatePartner, setCertificatePartner] = useState(null);

  // Estadísticas
  const stats = useMemo(() => {
    const total = partnersList.length;
    let bajo = 0;
    let medio = 0;
    let alto = 0;
    let pepCount = 0;

    partnersList.forEach(p => {
      if (p.nivelRiesgo === 'bajo') bajo++;
      else if (p.nivelRiesgo === 'medio') medio++;
      else if (p.nivelRiesgo === 'alto') {
        alto++;
        if (p.isPEP || p.dictamenOficial?.includes('PEP')) pepCount++;
      }
    });

    return { total, bajo, medio, alto, pepCount };
  }, [partnersList]);

  // Lista filtrada
  const filteredPartners = useMemo(() => {
    return partnersList.filter(p => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = p.razonSocial?.toLowerCase().includes(q);
        const matchCuit = p.cuit?.toLowerCase().includes(q);
        const matchRubro = p.rubro?.toLowerCase().includes(q);
        const matchContrato = p.contratoActual?.toLowerCase().includes(q);
        if (!matchName && !matchCuit && !matchRubro && !matchContrato) return false;
      }

      if (riskFilter !== 'all') {
        if (p.nivelRiesgo?.toLowerCase() !== riskFilter.toLowerCase()) return false;
      }

      return true;
    });
  }, [partnersList, searchQuery, riskFilter]);

  const handleSavePartner = (savedPartner) => {
    let updated;
    const exists = partnersList.some(p => p.id === savedPartner.id);
    if (exists) {
      updated = partnersList.map(p => (p.id === savedPartner.id ? savedPartner : p));
    } else {
      updated = [savedPartner, ...partnersList];
    }
    onUpdatePartners(updated);
  };

  const handleDeletePartner = (partnerId) => {
    if (window.confirm('¿Está seguro de eliminar el registro de debida diligencia de este proveedor?')) {
      const updated = partnersList.filter(p => p.id !== partnerId);
      onUpdatePartners(updated);
    }
  };

  const handleOpenNewPartner = () => {
    setPartnerToEdit(null);
    setIsEvalModalOpen(true);
  };

  const handleEditPartner = (p) => {
    setPartnerToEdit(p);
    setIsEvalModalOpen(true);
  };

  const handleViewCertificate = (p) => {
    setCertificatePartner(p);
  };

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white tracking-wide">
              Debida Diligencia de Socios Comerciales y Contratistas (ISO 37001 Cl. 8.2)
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              Ley 27.401
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evaluación sistemática de oferentes, contratistas de pavimentación, proveedores de telepeaje y socios estratégicos de AUBASA.
          </p>
        </div>

        <button
          onClick={handleOpenNewPartner}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-950 transition-all hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          Evaluar Nuevo Contratista
        </button>
      </div>

      {/* Tarjetas KPI de Resumen */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase">Proveedores Evaluados</span>
            <Building2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats.total}</div>
          <div className="text-[11px] text-slate-400 mt-1">En registro oficial AUBASA</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs font-semibold uppercase">Riesgo Bajo (Simplificada)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-300">{stats.bajo}</div>
          <div className="text-[11px] text-slate-400 mt-1">Puntaje 85-100 pts (Apto)</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-xs font-semibold uppercase">Riesgo Medio (Estándar)</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300">{stats.medio}</div>
          <div className="text-[11px] text-slate-400 mt-1">Puntaje 65-84 pts (Con monitoreo)</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-rose-400 mb-1">
            <span className="text-xs font-semibold uppercase">Riesgo Alto / PEP</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-300">{stats.alto}</div>
          <div className="text-[11px] text-slate-400 mt-1">Requiere elevación a Directorio</div>
        </div>
      </div>

      {/* Barra de Filtro y Búsqueda */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        secondaryFilter={riskFilter}
        onSecondaryFilterChange={setRiskFilter}
        secondaryOptions={[
          { value: 'all', label: 'Nivel de Riesgo: Todos' },
          { value: 'bajo', label: 'Riesgo Bajo (Simplificada)' },
          { value: 'medio', label: 'Riesgo Medio (Estándar)' },
          { value: 'alto', label: 'Riesgo Alto (Intensificada / PEP)' }
        ]}
        placeholder="Buscar por Razón Social, CUIT, rubro o contrato..."
      />

      {/* Grid de Tarjetas de Proveedores */}
      {filteredPartners.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-12 text-center">
          <Building2 className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-slate-300">No se encontraron contratistas</h4>
          <p className="text-xs text-slate-500 mt-1">
            Ajuste los criterios de búsqueda o realice una nueva evaluación.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPartners.map((partner) => {
            const isHighRisk = partner.nivelRiesgo === 'alto';
            const isMediumRisk = partner.nivelRiesgo === 'medio';

            return (
              <div
                key={partner.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
              >
                {/* Header de Tarjeta */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400">{partner.id}</span>
                      <h3 className="text-sm font-bold text-white line-clamp-1">{partner.razonSocial}</h3>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5">CUIT: {partner.cuit}</p>
                    </div>
                    <RiskBadge level={partner.nivelRiesgo} />
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400 text-[11px]">Rubro:</span>{' '}
                      <span className="text-slate-200 font-medium">{partner.rubro}</span>
                    </div>

                    {partner.contratoActual && (
                      <div className="text-[11px] text-slate-300">
                        <span className="text-slate-400">Contrato:</span> {partner.contratoActual}
                      </div>
                    )}

                    {partner.montoContratoARS > 0 && (
                      <div className="text-[11px] text-slate-300 font-mono">
                        <span className="text-slate-400">Monto:</span> {formatCurrencyARS(partner.montoContratoARS)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Puntaje y Dictamen */}
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Calificación DD:</span>
                    <span className="font-bold text-white font-mono text-sm">
                      {partner.puntajeDD} / 100 pts
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 italic">
                    "{partner.dictamenOficial}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                    <span>Eval: {formatDate(partner.fechaEvaluacion)}</span>
                    <span>Vence: {formatDate(partner.fechaVencimiento)}</span>
                  </div>
                </div>

                {/* Acciones de Tarjeta */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleViewCertificate(partner)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800/60 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ver Dictamen</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditPartner(partner)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
                      title="Editar evaluación"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePartner(partner.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Evaluación */}
      <PartnerEvaluatorModal
        isOpen={isEvalModalOpen}
        onClose={() => setIsEvalModalOpen(false)}
        partnerToEdit={partnerToEdit}
        onSavePartner={handleSavePartner}
      />

      {/* Modal de Certificado */}
      <DueDiligenceCertificate
        isOpen={!!certificatePartner}
        onClose={() => setCertificatePartner(null)}
        partner={certificatePartner}
      />
    </div>
  );
}
