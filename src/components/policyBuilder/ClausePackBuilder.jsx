import React, { useState } from 'react';
import Modal from '../common/Modal.jsx';
import { Copy, Check, FileCheck, Shield, BookOpen, Layers } from 'lucide-react';

const CLAUSE_SNIPPETS = [
  {
    id: 'CL-01',
    titulo: 'Cláusula de Integridad y Anticorrupción Básica',
    tipo: 'Compras y Contrataciones Generales',
    texto: `CLÁUSULA DE INTEGRIDAD Y PREVENCIÓN DEL SOBORNO (ISO 37001). EL PROVEEDOR declara y garantiza que ni él, ni sus directores, socios, apoderados o dependientes han ofrecido, prometido, entregado o solicitado dinero, dádivas o ventajas indebidas a funcionarios o dependientes de AUBASA S.A. El incumplimiento facultará a AUBASA a rescindir unilateralmente la presente orden de compra o contrato con pérdida de garantías y denuncia penal.`
  },
  {
    id: 'CL-02',
    titulo: 'Cláusula de Auditoría y Verificación de Remitos de Obra Vial',
    tipo: 'Pliegos de Repavimentación y Obras Viales',
    texto: `CLÁUSULA DE CONTROL NO FINANCIERO Y AUDITORÍA DE CANTERAS (ISO 37001 Cl. 8.4). AUBASA y sus inspectores designados tendrán libre acceso a los obradores, plantas de asfalto y libros de despacho del CONTRATISTA para auditar la trazabilidad de insumos, ensayos de laboratorio (LEMIT/UNLP) y cubicaciones. La negativa o adulteración de registros configurará incumplimiento grave pasible de rescisión culpable conforme Ley 6021 y Ley 27.401.`
  },
  {
    id: 'CL-03',
    titulo: 'Cláusula de Declaración Jurada de Beneficiario Final y Screening PEP',
    tipo: 'Pliegos de Licitaciones Públicas',
    texto: `DECLARACIÓN JURADA DE BENEFICIARIO FINAL Y AUSENCIA DE CONFLICTO DE INTERÉS (Ley 27.401 & UIF Res. 35/2023). EL OFERENTE adjunta en sobre cerrado la nómina completa de accionistas hasta identificar la persona humana titular del control societario (Beneficiario Final) e informa si cuenta entre sus directivos con Personas Expuestas Políticamente (PEP). Toda falsedad u omisión conllevará la descalificación inmediata de la oferta.`
  },
  {
    id: 'CL-04',
    titulo: 'Cláusula de Obligatoriedad de Canal Ético y No Represalias',
    tipo: 'Convenios y Alianzas Comerciales',
    texto: `CANAL ÉTICO Y REPORTE DE IRREGULARIDADES (ISO 37001 Cl. 8.9). Ambas partes se comprometen a difundir entre su personal los canales confidenciales de denuncia de AUBASA (0800-468-3474 / canal.etico@aubasa.com.ar) para reportar cualquier solicitud o indicio de soborno, garantizando la indemnidad y protección absoluta contra represalias al denunciante de buena fe.`
  }
];

export default function ClausePackBuilder({ isOpen, onClose }) {
  const [selectedClauses, setSelectedClauses] = useState(['CL-01', 'CL-02', 'CL-03']);
  const [copied, setCopied] = useState(false);

  const toggleClause = (id) => {
    if (selectedClauses.includes(id)) {
      setSelectedClauses(selectedClauses.filter(c => c !== id));
    } else {
      setSelectedClauses([...selectedClauses, id]);
    }
  };

  const generatedText = CLAUSE_SNIPPETS
    .filter(c => selectedClauses.includes(c.id))
    .map(c => `/* ${c.titulo.toUpperCase()} (${c.tipo}) */\n${c.texto}`)
    .join('\n\n------------------------------------------------------------\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generador de Cláusulas Contractuales Antisoborno"
      subtitle="Cláusulas tipo ISO 37001 & Ley 27.401 para inserción en Pliegos de Licitación y Contratos Viales"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        {/* Selector de Cláusulas */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Seleccione las Cláusulas Requeridas para el Pliego:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CLAUSE_SNIPPETS.map((clause) => {
              const isSelected = selectedClauses.includes(clause.id);
              return (
                <div
                  key={clause.id}
                  onClick={() => toggleClause(clause.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-600'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-slate-700 text-cyan-600 focus:ring-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{clause.titulo}</h4>
                      <p className="text-[10px] text-cyan-400 mt-0.5">{clause.tipo}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vista previa del texto generado */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Texto Legal Consolidado para Copiar al Pliego:
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-all shadow"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado al Portapapeles' : 'Copiar al Pliego'}
            </button>
          </div>

          <textarea
            readOnly
            rows={10}
            value={generatedText}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 font-mono leading-relaxed"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
