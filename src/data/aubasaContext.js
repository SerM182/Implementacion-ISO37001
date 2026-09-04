/**
 * Contexto Institucional de AUBASA (Autopistas de Buenos Aires S.A.)
 * Sistema de Gestión Antisoborno - Norma ISO 37001:2016
 */

export const AUBASA_CONTEXT = {
  empresa: {
    nombreOficial: 'Autopistas de Buenos Aires S.A.',
    sigla: 'AUBASA',
    tipoEntidad: 'Sociedad Anónima con Participación Estatal Mayoritaria (SAPEM - Prov. de Buenos Aires)',
    sedeCentral: 'Calle 528 e/ 118 y 119, Tolosa, La Plata, Provincia de Buenos Aires',
    cuit: '30-71409204-9',
    normaCertificar: 'ISO 37001:2016 (Sistema de Gestión Antisoborno - SGAS)',
    organismoDeSupervision: 'Ministerio de Infraestructura y Servicios Públicos de la Prov. de Buenos Aires',
  },
  alcanceSGAS: {
    titulo: 'Alcance Oficial del SGAS ISO 37001 en AUBASA - Concesión BALP',
    declaracion: 'El Sistema de Gestión Antisoborno de AUBASA tiene como alcance exclusivo la Concesión de la Autopista Buenos Aires - La Plata (BALP), abarcando de manera integral los procesos de Contratación (Licitaciones y Adquisiciones), Pagos (Tesorería y Controles Financieros) y Planificación y Ejecución de Obras Viales e Infraestructura de Peaje en la traza metropolitana (50 km).',
    pilares: [
      {
        id: 'contratacion',
        nombre: 'Contratación y Compras BALP',
        icono: 'FileText',
        descripcion: 'Licitaciones públicas y privadas, concursos de precios, contrataciones directas, pliegos de bases y condiciones técnicas para obras de pavimentación, luminarias, señalización y sistemas de peaje de la traza BALP.',
        areasInvolucradas: ['Gerencia de Compras y Contrataciones', 'Comisión Evaluadora de Ofertas', 'Asuntos Jurídicos'],
        normativaAplicable: 'Manual de Compras de AUBASA, Ley Prov. 13.981, Ley 27.401, ISO 37001 Cl. 8.4 y 8.6',
        riesgoTipico: 'Direccionamiento de pliegos, colusión de oferentes, filtración de presupuestos oficiales.'
      },
      {
        id: 'pagos',
        nombre: 'Pagos y Controles Financieros BALP',
        icono: 'DollarSign',
        descripcion: 'Tesorería central, emisión de pagos a contratistas de BALP, recaudación y fondos fijos en estaciones de peaje Dock Sud y Hudson, redeterminaciones de precios y liquidaciones de certificados de obra.',
        areasInvolucradas: ['Gerencia de Administración y Finanzas', 'Tesorería', 'Contabilidad', 'Supervisión de Peajes BALP'],
        normativaAplicable: 'Ley 27.401 Art. 7, ISO 37001 Cl. 8.1.2 y 8.3, Decreto 367/17 (Redeterminaciones)',
        riesgoTipico: 'Soborno para agilizar pagos, alteración de fórmulas de redeterminación, fondos fijos desviados.'
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
      peajes: ['Peaje Dock Sud (Ascendente / Descendente)', 'Peaje Hudson (Troncal)', 'Peajes Ramal Gutiérrez', 'Accesos Bernal, Quilmes y Berazategui'],
      caracteristicas: 'Corredor vial metropolitano de alto tránsito diario (>180.000 vehículos/día), 22 vías de cobro TelePASE y manual, obras continuas de fresado, bacheo profundo, repavimentación y mantenimiento de distribuidores.'
    }
  ],
  autoridadesSGAS: {
    maximaAutoridad: 'Directorio de AUBASA',
    oficialCumplimiento: 'Oficial de Cumplimiento Antisoborno (Función de Cumplimiento ISO 37001 - Cl. 5.3)',
    dependencia: 'Reporte directo e independiente al Directorio (con autonomía de criterio y recursos asignados)',
    canalEtico: 'canal.etico@aubasa.com.ar / Línea Telefónica 0800-INTEGRIDAD / Portal Web Seguro'
  }
};
