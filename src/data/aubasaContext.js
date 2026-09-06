/**
 * Contexto Institucional de AUBASA (Autopistas de Buenos Aires S.A.)
 * Sistema de Gestión Antisoborno - Norma ISO 37001:2025
 */

export const AUBASA_CONTEXT = {
  empresa: {
    nombreOficial: 'Autopistas de Buenos Aires S.A.',
    sigla: 'AUBASA',
    tipoEntidad: 'Sociedad Anónima con Participación Estatal Mayoritaria (SAPEM - Prov. de Buenos Aires)',
    sedeCentral: 'Calle 528 e/ 118 y 119, Tolosa, La Plata, Provincia de Buenos Aires',
    cuit: '30-71409204-9',
    normaCertificar: 'ISO 37001:2025 (Sistema de Gestión Antisoborno - SGAS)',
    organismoDeSupervision: 'Ministerio de Infraestructura y Servicios Públicos de la Prov. de Buenos Aires',
  },
  alcanceSGAS: {
    titulo: 'Alcance Oficial del SGAS ISO 37001 en AUBASA - Concesión BALP',
    declaracion: 'El Sistema de Gestión Antisoborno de AUBASA tiene como alcance exclusivo los procesos de Contratación (Licitaciones y Adquisiciones) y Pagos (Tesorería y Controles Financieros) gestionados desde la Sede Central, y la Planificación y Ejecución de Obras Viales en la Concesión de la Autopista Buenos Aires - La Plata (BALP, 50 km). Quedan fuera de alcance los procesos de cobro y recaudación de peaje.',
    pilares: [
      {
        id: 'contratacion',
        nombre: 'Contratación y Compras BALP',
        icono: 'FileText',
        descripcion: 'Licitaciones públicas y privadas, concursos de precios, contrataciones directas, pliegos de bases y condiciones técnicas para obras de pavimentación, luminarias y señalización de la traza BALP.',
        areasInvolucradas: ['Gerencia de Compras y Contrataciones', 'Comisión Evaluadora de Ofertas', 'Asuntos Jurídicos'],
        normativaAplicable: 'Manual de Compras de AUBASA, Ley Prov. 13.981, Ley 27.401, ISO 37001 Cl. 8.4 y 8.6',
        riesgoTipico: 'Direccionamiento de pliegos, colusión de oferentes, filtración de presupuestos oficiales.'
      },
      {
        id: 'pagos',
        nombre: 'Pagos y Controles Financieros (Sede Central)',
        icono: 'DollarSign',
        descripcion: 'Tesorería central, emisión de pagos a contratistas y proveedores de BALP, redeterminaciones de precios y liquidaciones de certificados de obra, gestionados desde la Sede Central.',
        areasInvolucradas: ['Gerencia de Administración y Finanzas', 'Tesorería', 'Contabilidad'],
        normativaAplicable: 'Ley 27.401 Art. 7, ISO 37001 Cl. 8.1.2 y 8.3, Decreto 367/17 (Redeterminaciones)',
        riesgoTipico: 'Soborno para agilizar pagos a contratistas, alteración de fórmulas de redeterminación.'
      },
      {
        id: 'obras',
        nombre: 'Planificación y Ejecución de Obras Viales BALP',
        icono: 'HardHat',
        descripcion: 'Plan de mantenimiento y repavimentación de la Autopista Buenos Aires - La Plata (km 0 a km 50), ensanche de carriles, puentes, distribuidores (Quilmes, Berazategui, Hudson, La Plata), ensayos de asfalto y laboratorio con LEMIT.',
        areasInvolucradas: ['Gerencia de Obras e Infraestructura', 'Inspección de Obras en Traza BALP', 'Laboratorio de Materiales', 'Supervisión Vial'],
        normativaAplicable: 'Ley Prov. 6021 (Obras Públicas), Normas IRAM Viales, ISO 37001 Cl. 8.4 y 8.5',
        riesgoTipico: 'Soborno a inspectores para aprobar calidades inferiores o certificar metros cúbicos ficticios.'
      }
    ]
  },
  redVialConcesionada: [
    {
      nombre: 'Autopista Buenos Aires - La Plata (BALP)',
      trazado: '50 km que conectan la Ciudad Autónoma de Buenos Aires (CABA) con La Plata',
      accesos: ['Accesos Bernal, Quilmes y Berazategui', 'Ramal Gutiérrez'],
      caracteristicas: 'Corredor vial metropolitano de alto tránsito diario, con obras continuas de fresado, bacheo profundo, repavimentación y mantenimiento de distribuidores. El cobro y la recaudación de peaje están fuera del alcance del SGAS.'
    }
  ],
  autoridadesSGAS: {
    maximaAutoridad: 'Directorio de AUBASA',
    oficialCumplimiento: 'Oficial de Cumplimiento Antisoborno (Función de Cumplimiento ISO 37001 - Cl. 5.3)',
    dependencia: 'Reporte directo e independiente al Directorio (con autonomía de criterio y recursos asignados)',
    canalEtico: 'canal.etico@aubasa.com.ar / Línea Telefónica 0800-INTEGRIDAD / Portal Web Seguro'
  }
};
