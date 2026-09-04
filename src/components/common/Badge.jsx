import React from 'react';
import { getRiskLevelBadge, getProcessBadge, getStatusBadge } from '../../utils/formatters.js';

export function RiskBadge({ level, className = '' }) {
  const badge = getRiskLevelBadge(level);
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${badge.color} ${badge.border} ${className}`}>
      {badge.label}
    </span>
  );
}

export function ProcessBadge({ process, className = '' }) {
  const badge = getProcessBadge(process);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${badge.bg} ${className}`}>
      {badge.label}
    </span>
  );
}

export function StatusBadge({ status, className = '' }) {
  const badge = getStatusBadge(status);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${badge.bg} ${className}`}>
      {badge.label}
    </span>
  );
}

export function GenericBadge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    primary: 'bg-cyan-900/60 text-cyan-200 border-cyan-700/60',
    success: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/60',
    warning: 'bg-amber-900/60 text-amber-200 border-amber-700/60',
    danger: 'bg-rose-900/60 text-rose-200 border-rose-700/60',
    purple: 'bg-purple-900/60 text-purple-200 border-purple-700/60'
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
