import React, { useState } from 'react';
import Modal from '../common/Modal.jsx';
import { Copy, Check, Printer, FileText, Edit3, Eye, ShieldCheck, Download } from 'lucide-react';
import DocumentHeader from '../common/DocumentHeader.jsx';

export default function PolicyEditorPreview({
  isOpen,
  onClose,
  policy,
  onSavePolicy
}) {
  if (!policy) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(policy.titulo || '');
  const [editedContent, setEditedContent] = useState(policy.contenidoMarkdown || '');
  const [copied, setCopied] = useState(false);

  // Sync state when policy changes
  React.useEffect(() => {
    if (policy) {
      setEditedTitle(policy.titulo || '');
      setEditedContent(policy.contenidoMarkdown || '');
      setIsEditing(false);
    }
  }, [policy]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    onSavePolicy({
      ...policy,
      titulo: editedTitle,
      contenidoMarkdown: editedContent,
      fechaModificacion: new Date().toISOString().slice(0, 10)
    });
    setIsEditing(false);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([editedContent], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${policy.codigo || 'POLITICA'}_AUBASA_ISO37001.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${policy.codigo}: ${policy.titulo}`}
      subtitle={`Documento Oficial del SGAS - Norma ISO 37001:2025 (${policy.clausulaIso})`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-4">
        {/* Barra de Herramientas */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950/80 border border-slate-800 rounded-xl no-print">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isEditing
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {isEditing ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
              {isEditing ? 'Vista Previa' : 'Editar Contenido'}
            </button>

            <span className="text-[11px] text-slate-500">
              Categoría: <strong className="text-slate-300">{policy.categoria}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
              title="Copiar texto al portapapeles"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
              title="Descargar en formato Markdown (.md)"
            >
              <Download className="w-3.5 h-3.5" />
              .MD
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-950"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir / PDF
            </button>
          </div>
        </div>

        {/* Modo Edición o Modo Visualización */}
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Título de la Política / Procedimiento</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Contenido Normativo (Formato Markdown)</label>
              <textarea
                rows={16}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 font-mono leading-relaxed focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Cancelar Edición
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold shadow-md"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        ) : (
          /* Documento Oficial Formateado para Lectura e Impresión */
          <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-xl border border-slate-300 shadow-2xl space-y-6 font-sans print-card">
            {/* Encabezado Controlado AUBASA (Membrete Oficial) */}
            <DocumentHeader
              titulo={policy.titulo}
              codigo={policy.codigo}
              pagina="1 de 1"
            />

            {/* Contenido Renderizado */}
            <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed space-y-3">
              {editedContent.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-base font-black text-slate-900 uppercase tracking-wide pt-2 border-b border-slate-200 pb-1">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xs font-bold text-slate-900 uppercase tracking-wider pt-2 text-cyan-900">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('**') && paragraph.includes('|')) {
                  return (
                    <div key={index} className="p-2 bg-slate-100 rounded border border-slate-200 font-mono text-[11px] text-slate-700">
                      {paragraph.replaceAll('**', '')}
                    </div>
                  );
                }
                if (paragraph.startsWith('---')) {
                  return <hr key={index} className="border-slate-300 my-2" />;
                }
                if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n- ').map(i => i.replace('- ', ''));
                  return (
                    <ul key={index} className="list-disc list-inside space-y-1 text-xs text-slate-700 pl-2">
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.includes('\n1. ') || paragraph.startsWith('1. ')) {
                  const items = paragraph.split(/\n\d+\.\s+/).filter(Boolean);
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-1 text-xs text-slate-700 pl-2">
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={index} className="text-xs text-slate-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Bloque de Aprobación Institucional (Firmas en Blanco para Completar) */}
            <table className="w-full border-collapse border border-slate-900 text-[11px] text-center text-slate-900 mt-2">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border border-slate-900 py-1.5 font-bold">REDACCIÓN - REVISIÓN</th>
                  <th className="border border-slate-900 py-1.5 font-bold">APROBACIÓN</th>
                  <th className="border border-slate-900 py-1.5 font-bold">LIBERACIÓN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-900 h-10"></td>
                  <td className="border border-slate-900 h-10"></td>
                  <td className="border border-slate-900 h-10"></td>
                </tr>
                <tr>
                  <td className="border border-slate-900 py-1.5">
                    <div className="font-semibold">Firma:</div>
                    <div className="text-slate-500 mt-0.5">Oficial de Cumplimiento</div>
                  </td>
                  <td className="border border-slate-900 py-1.5">
                    <div className="font-semibold">Firma:</div>
                    <div className="text-slate-500 mt-0.5">Comité de Integridad / Directorio</div>
                  </td>
                  <td className="border border-slate-900 py-1.5">
                    <div className="font-semibold">Firma:</div>
                    <div className="text-slate-500 mt-0.5">Gerente General</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Modal>
  );
}
