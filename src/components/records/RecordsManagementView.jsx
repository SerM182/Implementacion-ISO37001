import React, { useState, useMemo } from 'react';
import RecordsKpiHeader from './RecordsKpiHeader.jsx';
import RecordCategoryTabs from './RecordCategoryTabs.jsx';
import RecordsFilterBar from './RecordsFilterBar.jsx';
import RecordsTable from './RecordsTable.jsx';
import RecordDetailModal from './RecordDetailModal.jsx';
import RecordFormModal from './RecordFormModal.jsx';
import BlankTemplatesViewer from './BlankTemplatesViewer.jsx';
import {
  calculateRecordsKpis,
  filterRecords
} from '../../utils/recordsFilterEngine.js';
import {
  FileCheck2,
  FileText,
  Table,
  PlusCircle,
  Download,
  Printer
} from 'lucide-react';

export default function RecordsManagementView({
  records = [],
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord
}) {
  const [activeSubTab, setActiveSubTab] = useState('table'); // 'table' | 'blank_templates'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isoClauseFilter, setIsoClauseFilter] = useState('all');

  // Modales
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Cálculos de KPIs y métricas en vivo
  const kpis = useMemo(() => calculateRecordsKpis(records), [records]);

  // Filtrado de registros
  const filteredRecords = useMemo(() => {
    return filterRecords(records, {
      category: selectedCategory,
      status: statusFilter,
      searchQuery: searchQuery,
      isoClause: isoClauseFilter
    });
  }, [records, selectedCategory, statusFilter, searchQuery, isoClauseFilter]);

  // Handlers de Acciones
  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsDetailOpen(true);
  };

  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    setIsFormOpen(true);
  };

  const handleOpenNewRecordModal = () => {
    setSelectedRecord(null);
    setIsFormOpen(true);
  };

  const handleSaveRecord = (recordData) => {
    if (selectedRecord && selectedRecord.id) {
      // Modificar existente
      onUpdateRecord({
        ...recordData,
        id: selectedRecord.id
      });
    } else {
      // Crear nuevo con ID secuencial o timestamp
      const newId = `REC-${new Date().getFullYear()}-${String(records.length + 1).padStart(3, '0')}`;
      onAddRecord({
        ...recordData,
        id: newId
      });
    }
    setIsFormOpen(false);
    setSelectedRecord(null);
  };

  const handleDeleteRecord = (recordId) => {
    if (window.confirm(`¿Está seguro de eliminar el registro de evidencia ${recordId}? Esta acción quedará documentada en el log de auditoría.`)) {
      onDeleteRecord(recordId);
    }
  };

  // Exportar a CSV
  const handleExportCsv = () => {
    if (filteredRecords.length === 0) return;

    const headers = ['Código', 'Fecha', 'Tipo', 'Cláusula ISO', 'Título', 'Responsable', 'Ubicación', 'Estado Verificación', 'Resumen'];
    const rows = filteredRecords.map(r => [
      `"${r.id}"`,
      `"${r.fecha}"`,
      `"${r.tipoRegistro}"`,
      `"${r.clausulaIso}"`,
      `"${r.titulo?.replace(/"/g, '""')}"`,
      `"${r.responsable?.replace(/"/g, '""')}"`,
      `"${r.areaUbicacion?.replace(/"/g, '""')}"`,
      `"${r.estadoVerificacion}"`,
      `"${r.resumenEvidencia?.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AUBASA_ISO37001_Registros_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Selector de Sub-Pestañas: Registros Cargados vs Plantillas en Blanco */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-wide">
            Información Documentada & Registros Obligatorios (Cl. 7.5)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Gestión de evidencias de auditoría y repositorio oficial de plantillas en blanco normalizadas para AUBASA BALP (50 km).
          </p>
        </div>

        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveSubTab('table')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'table'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Evidencias Cargadas ({records.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('blank_templates')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'blank_templates'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Plantillas en Blanco (12 Oficiales)</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'table' && (
        <div className="space-y-6">
          {/* 1. Header de KPIs Ejecutivos */}
          <RecordsKpiHeader kpis={kpis} />

          {/* 2. Clasificación Normativa en Pestañas (Tipologías Obligatorias) */}
          <RecordCategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={kpis.byCategory}
          />

          {/* 3. Barra de Búsqueda y Filtros */}
          <RecordsFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            isoClauseFilter={isoClauseFilter}
            onIsoClauseFilterChange={setIsoClauseFilter}
            onOpenNewRecordModal={handleOpenNewRecordModal}
            onExportCsv={handleExportCsv}
            filteredCount={filteredRecords.length}
            totalCount={records.length}
          />

          {/* 4. Tabla de Registros y Evidencias Expandibles */}
          <RecordsTable
            records={filteredRecords}
            onViewRecord={handleViewRecord}
            onEditRecord={handleEditRecord}
            onDeleteRecord={handleDeleteRecord}
          />
        </div>
      )}

      {activeSubTab === 'blank_templates' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-950">
            <FileCheck2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-emerald-900 block mb-0.5">
                Modelos Oficiales en Blanco para AUBASA S.A. (Norma ISO 37001 / 37002 / 37008):
              </strong>
              Seleccione cualquier formulario a la izquierda para visualizar el texto normalizado, copiarlo al portapapeles o descargarlo en formato .txt listo para imprimir y firmar.
            </div>
          </div>

          <BlankTemplatesViewer />
        </div>
      )}

      {/* Modal de Detalle Completo */}
      <RecordDetailModal
        record={selectedRecord}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedRecord(null);
        }}
        onEdit={(rec) => {
          setIsDetailOpen(false);
          handleEditRecord(rec);
        }}
      />

      {/* Modal de Carga / Edición de Registro */}
      <RecordFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedRecord(null);
        }}
        onSave={handleSaveRecord}
        initialRecord={selectedRecord}
      />
    </div>
  );
}
