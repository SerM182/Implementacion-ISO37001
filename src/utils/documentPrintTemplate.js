import { AUBASA_LOGO_DATA_URI } from '../data/aubasaLogo.js';

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
  const escapedBody = String(bodyText)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

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
          pre { white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5; }
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
        <pre>${escapedBody}</pre>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;
}
