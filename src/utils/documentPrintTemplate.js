import { AUBASA_LOGO_DATA_URI } from '../data/aubasaLogo.js';
import { parseFormSheet, splitLabel } from './formSheetParser.js';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderInlineHtml(text) {
  const escaped = escapeHtml(text);
  return escaped.replace(/(_{3,})|(\[\s{0,4}\])/g, (m, underscores) => {
    if (underscores) {
      const width = Math.min(300, Math.max(48, underscores.length * 5.5));
      return `<span class="blank" style="width:${width}px"></span>`;
    }
    return `<span class="chk"></span>`;
  });
}

function renderLabelledHtml(text, { forceLabel = false } = {}) {
  const split = splitLabel(text, { forceLabel });
  if (!split) return renderInlineHtml(text);
  return `<span class="label">${escapeHtml(split.label)}:</span> ${renderInlineHtml(split.rest)}`;
}

/**
 * Convierte el texto semi-estructurado de una plantilla de registro en HTML
 * con campos, casilleros y tablas estilizados, en vez de texto monoespaciado.
 */
function renderFormSheetHtml(bodyText) {
  const blocks = parseFormSheet(bodyText);
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'blank':
          return `<div class="sp"></div>`;
        case 'subtitle':
          return `<div class="subtitle">${renderInlineHtml(block.text)}</div>`;
        case 'header':
          return `<div class="hdr">${
            block.num ? `<span class="hdr-num">${block.num}</span>` : ''
          }<h4>${escapeHtml(block.text)}</h4></div>`;
        case 'field':
          return `<div class="field"><span class="dot"></span><span>${renderLabelledHtml(block.text, {
            forceLabel: true
          })}</span></div>`;
        case 'subfield':
          return `<div class="subfield">– <span>${renderLabelledHtml(block.text, { forceLabel: true })}</span></div>`;
        case 'checkbox':
          return `<div class="chkrow">${renderLabelledHtml(block.text)}</div>`;
        case 'subcheckbox':
          return `<div class="chkrow sub">${renderInlineHtml(block.text)}</div>`;
        case 'writeline':
          return `<div class="wline"></div>`;
        case 'table':
          return `<table class="sheet-table"><thead><tr>${block.header
            .map((h) => `<th>${escapeHtml(h)}</th>`)
            .join('')}</tr></thead><tbody>${block.rows
            .map((r) => `<tr>${r.map((c) => `<td>${renderInlineHtml(c)}</td>`).join('')}</tr>`)
            .join('')}</tbody></table>`;
        case 'paragraph':
        default:
          return `<p>${renderLabelledHtml(block.text)}</p>`;
      }
    })
    .join('\n');
}

/**
 * Genera el HTML completo para la ventana de impresión de un documento/registro,
 * replicando el membrete oficial de AUBASA (logo + tabla Código/Revisión/Fecha/Página).
 */
export function buildPrintableDocumentHtml({
  titulo,
  codigo,
  revision = '00',
  fecha,
  pagina = '1 de 1',
  bodyText
}) {
  const fechaTexto = fecha || new Date().toLocaleDateString('es-AR');
  const sheetHtml = renderFormSheetHtml(bodyText);

  return `
    <html>
      <head>
        <title>${titulo} - AUBASA SGAS</title>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          body { font-family: Arial, Helvetica, sans-serif; color: #0f172a; padding: 24px; }
          .letterhead { width: 100%; border-collapse: collapse; border: 1px solid #0f172a; margin-bottom: 18px; }
          .letterhead td { border: 1px solid #0f172a; padding: 8px; vertical-align: middle; }
          .letterhead .logo-cell { width: 170px; text-align: center; }
          .letterhead .logo-cell img { width: 100%; max-height: 60px; }
          .letterhead .title-cell { text-align: center; font-size: 15px; font-weight: bold; }
          .letterhead .meta-cell { width: 190px; padding: 0; }
          .meta-table { width: 100%; border-collapse: collapse; font-size: 11px; }
          .meta-table td { border-bottom: 1px solid #0f172a; padding: 3px 6px; }
          .meta-table tr:last-child td { border-bottom: none; }
          .meta-table .meta-label { font-weight: bold; background: #f1f5f9; width: 60px; }
          .sheet { font-size: 12.5px; color: #1e293b; }
          .sheet .subtitle { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 6px; padding: 8px 10px; font-weight: 600; color: #075985; margin-bottom: 14px; font-size: 12px; }
          .sheet .hdr { margin-top: 16px; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px solid #e2e8f0; }
          .sheet .hdr:first-child { margin-top: 0; }
          .sheet .hdr-num { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 4px; background: #0284c7; color: #fff; font-size: 10px; font-weight: 800; margin-right: 6px; }
          .sheet .hdr h4 { display: inline; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .02em; margin: 0; }
          .sheet .field, .sheet .chkrow, .sheet p { padding: 3px 0; }
          .sheet .field .dot { display: inline-block; width: 4px; height: 4px; border-radius: 50%; background: #0284c7; margin-right: 6px; }
          .sheet .subfield { padding: 3px 0 3px 16px; color: #475569; }
          .sheet .chkrow.sub { padding-left: 12px; }
          .sheet .label { font-weight: 700; color: #334155; }
          .sheet .blank { display: inline-block; border-bottom: 1.5px solid #94a3b8; height: 12px; margin: 0 3px; vertical-align: bottom; }
          .sheet .chk { display: inline-block; width: 11px; height: 11px; border: 1.5px solid #64748b; border-radius: 2px; margin: 0 3px -1px 3px; }
          .sheet .wline { border-bottom: 1px solid #cbd5e1; height: 20px; margin: 2px 0; }
          .sheet .sp { height: 6px; }
          .sheet p { color: #334155; line-height: 1.5; margin: 0; }
          .sheet table.sheet-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 11px; }
          .sheet table.sheet-table th, .sheet table.sheet-table td { border: 1px solid #cbd5e1; padding: 5px 6px; text-align: left; vertical-align: top; }
          .sheet table.sheet-table th { background: #f1f5f9; font-weight: 700; }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <table class="letterhead">
          <tr>
            <td class="logo-cell"><img src="${AUBASA_LOGO_DATA_URI}" alt="AUBASA" /></td>
            <td class="title-cell">${titulo}</td>
            <td class="meta-cell">
              <table class="meta-table">
                <tr><td class="meta-label">Código</td><td>${codigo}</td></tr>
                <tr><td class="meta-label">Revisión</td><td>${revision}</td></tr>
                <tr><td class="meta-label">Fecha</td><td>${fechaTexto}</td></tr>
                <tr><td class="meta-label">Página</td><td>${pagina}</td></tr>
              </table>
            </td>
          </tr>
        </table>
        <div class="sheet">${sheetHtml}</div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;
}
