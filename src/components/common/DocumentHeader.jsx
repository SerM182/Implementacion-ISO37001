import React from 'react';
import { AUBASA_LOGO_DATA_URI } from '../../data/aubasaLogo.js';

/**
 * Encabezado oficial de documento, réplica del membrete real de AUBASA
 * (Manual de Gestión Rev.05): logo a la izquierda, título centrado y
 * tabla de control Código / Revisión / Fecha / Página a la derecha.
 */
export default function DocumentHeader({
  titulo,
  codigo,
  revision = '00',
  fecha,
  pagina = '1 de 1'
}) {
  const fechaTexto = fecha || new Date().toLocaleDateString('es-AR');

  return (
    <table className="w-full border-collapse border border-slate-900 text-slate-900 bg-white">
      <tbody>
        <tr>
          <td className="border border-slate-900 p-2 w-36 sm:w-44 align-middle text-center">
            <img src={AUBASA_LOGO_DATA_URI} alt="AUBASA" className="w-full h-auto max-h-12 mx-auto" />
          </td>
          <td className="border border-slate-900 p-2 align-middle text-center">
            <span className="text-sm sm:text-base font-bold">{titulo}</span>
          </td>
          <td className="border border-slate-900 p-0 w-40 sm:w-48 align-top">
            <table className="w-full border-collapse text-[10px] sm:text-[11px]">
              <tbody>
                <tr>
                  <td className="border-b border-slate-900 px-2 py-0.5 font-bold bg-slate-50 w-16">Código</td>
                  <td className="border-b border-slate-900 px-2 py-0.5 font-mono">{codigo}</td>
                </tr>
                <tr>
                  <td className="border-b border-slate-900 px-2 py-0.5 font-bold bg-slate-50">Revisión</td>
                  <td className="border-b border-slate-900 px-2 py-0.5 font-mono">{revision}</td>
                </tr>
                <tr>
                  <td className="border-b border-slate-900 px-2 py-0.5 font-bold bg-slate-50">Fecha</td>
                  <td className="border-b border-slate-900 px-2 py-0.5 font-mono">{fechaTexto}</td>
                </tr>
                <tr>
                  <td className="px-2 py-0.5 font-bold bg-slate-50">Página</td>
                  <td className="px-2 py-0.5 font-mono">{pagina}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
