/**
 * Padrón de Usuarios del SGAS ISO 37001 / 37002 / 37008
 * AUTOPISTAS DE BUENOS AIRES S.A. (AUBASA) - CONCESIÓN BALP (50 KM)
 */

export const INITIAL_USERS_DATA = [
  {
    id: 'USR-001',
    email: 'sgiaubasa@gmail.com',
    nombre: 'Administrador General SGAS',
    area: 'Dirección General & Gerencia de Cumplimiento',
    cargo: 'Administrador Maestro del Sistema SGAS',
    rol: 'Administrador General SGAS',
    permisos: 'full_admin_access',
    isAdmin: true,
    estado: 'activo',
    fechaAlta: '2026-01-15',
    telefono: '+54 9 11 4000-0001',
    modulosPermitidos: ['all']
  },
  {
    id: 'USR-002',
    email: 'cumplimiento.sgas@aubasa.com.ar',
    nombre: '(a designar)',
    area: 'Oficina de Cumplimiento',
    cargo: 'Oficial de Cumplimiento Antisoborno ISO 37001',
    rol: 'Oficial de Cumplimiento ISO 37001',
    permisos: 'full_admin_access',
    isAdmin: true,
    estado: 'activo',
    fechaAlta: '2026-01-20',
    telefono: '+54 9 11 4000-0002',
    modulosPermitidos: ['all']
  },
  {
    id: 'USR-003',
    email: 'laura.gomez@aubasa.com.ar',
    nombre: 'Gómez, Laura',
    area: 'Compras, Licitaciones y Contrataciones',
    cargo: 'Jefa de Compras y Contrataciones',
    rol: 'Responsable de Compras y Contrataciones',
    permisos: 'edit_compliance',
    isAdmin: false,
    estado: 'activo',
    fechaAlta: '2026-02-01',
    telefono: '+54 9 11 4000-0003',
    modulosPermitidos: ['records', 'training', 'redFlags']
  },
  {
    id: 'USR-004',
    email: 'carlos.herrera@aubasa.com.ar',
    nombre: 'Herrera, Carlos',
    area: 'Planificación y Obras Viales',
    cargo: 'Inspector Técnico de Calzada (Tramo Hudson-La Plata)',
    rol: 'Inspector Técnico de Obras Viales',
    permisos: 'edit_compliance',
    isAdmin: false,
    estado: 'activo',
    fechaAlta: '2026-02-05',
    telefono: '+54 9 11 4000-0004',
    modulosPermitidos: ['records', 'risks', 'dueDiligence', 'training']
  },
  {
    id: 'USR-005',
    email: 'mariana.perez@aubasa.com.ar',
    nombre: 'Pérez, Mariana',
    area: 'Compras, Licitaciones y Contrataciones',
    cargo: 'Analista Principal de Pliegos y Contrataciones',
    rol: 'Responsable de Contrataciones & Due Diligence',
    permisos: 'edit_compliance',
    isAdmin: false,
    estado: 'activo',
    fechaAlta: '2026-02-10',
    telefono: '+54 9 11 4000-0005',
    modulosPermitidos: ['records', 'dueDiligence', 'risks', 'policies']
  }
];

export const USER_ROLES_CATALOG = [
  {
    id: 'admin_general',
    nombre: 'Administrador General SGAS',
    descripcion: 'Acceso total a todos los módulos, configuración, base de datos, gestión de usuarios y auditoría externa.',
    permisos: 'full_admin_access',
    isAdmin: true,
    color: 'amber'
  },
  {
    id: 'oficial_cumplimiento',
    nombre: 'Oficial de Cumplimiento ISO 37001',
    descripcion: 'Gestión integral del SGAS, canal ético, investigaciones forenses, matriz de riesgos y debida diligencia.',
    permisos: 'full_admin_access',
    isAdmin: true,
    color: 'sky'
  },
  {
    id: 'auditor_interno',
    nombre: 'Auditor Interno Líder',
    descripcion: 'Evaluación del Gap Analysis, verificación de registros Cl. 7.5 y emisión de informes de auditoría.',
    permisos: 'edit_compliance',
    isAdmin: false,
    color: 'purple'
  },
  {
    id: 'responsable_compras',
    nombre: 'Responsable de Contrataciones & Due Diligence',
    descripcion: 'Gestión de socios de negocios, scoring de debida diligencia, pliegos y cláusulas antisoborno.',
    permisos: 'edit_compliance',
    isAdmin: false,
    color: 'emerald'
  },
  {
    id: 'inspector_obras',
    nombre: 'Inspector Técnico de Obras Viales',
    descripcion: 'Carga de cubicaciones in-situ, ensayos de calidad asfáltica LEMIT/UNLP y remitos de obra BALP.',
    permisos: 'edit_compliance',
    isAdmin: false,
    color: 'blue'
  },
  {
    id: 'responsable_tesoreria',
    nombre: 'Responsable de Tesorería & Pagos',
    descripcion: 'Validación de 4 ojos, conciliaciones bancarias y trazabilidad de órdenes de pago a contratistas.',
    permisos: 'edit_compliance',
    isAdmin: false,
    color: 'indigo'
  },
  {
    id: 'consultor_auditor',
    nombre: 'Auditor Externo / Solo Lectura',
    descripcion: 'Visualización de evidencias, políticas, matrices y descarga de reportes oficiales en PDF.',
    permisos: 'view_only',
    isAdmin: false,
    color: 'slate'
  }
];
