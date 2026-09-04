/**
 * Utilidades de formateo para la aplicación SGAS ISO 37001 AUBASA
 */

export function formatCurrencyARS(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '$ 0';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatCurrencyUSD(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return 'USD 0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString) {
  if (!dateString) return '-';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? dateString : d.toLocaleDateString('es-AR');
  } catch {
    return dateString;
  }
}

export function getRiskLevelBadge(level) {
  switch (level?.toLowerCase()) {
    case 'crítico':
    case 'critico':
    case 'muy alto':
      return { label: 'CRÍTICO', color: 'bg-red-500 text-white', border: 'border-red-600' };
    case 'alto':
      return { label: 'ALTO', color: 'bg-amber-500 text-white', border: 'border-amber-600' };
    case 'medio':
    case 'moderado':
      return { label: 'MEDIO', color: 'bg-yellow-500 text-slate-900', border: 'border-yellow-600' };
    case 'bajo':
    default:
      return { label: 'BAJO', color: 'bg-emerald-500 text-white', border: 'border-emerald-600' };
  }
}

export function getProcessBadge(proceso) {
  switch (proceso) {
    case 'Contratación':
    case 'Licitaciones':
      return { label: 'Contratación', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
    case 'Pagos':
    case 'Tesorería':
      return { label: 'Pagos y Finanzas', bg: 'bg-purple-100 text-purple-800 border-purple-200' };
    case 'Obras Viales':
    case 'Planificación de Obras':
      return { label: 'Obras Viales', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
    default:
      return { label: proceso || 'General', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
  }
}

export function getStatusBadge(status) {
  switch (status) {
    case 'completada':
    case 'conforme':
    case 'cerrada':
      return { label: 'Conforme / Resuelto', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    case 'en_progreso':
    case 'en_investigacion':
    case 'parcial':
      return { label: 'En Progreso / Parcial', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
    case 'no_conforme':
    case 'recibida':
      return { label: 'No Conforme / Pendiente', bg: 'bg-red-100 text-red-800 border-red-300' };
    case 'comite_etica':
      return { label: 'Comité de Ética', bg: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
    default:
      return { label: status || 'Pendiente', bg: 'bg-slate-100 text-slate-800 border-slate-300' };
  }
}
