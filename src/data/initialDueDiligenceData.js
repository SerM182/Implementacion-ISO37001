/**
 * Módulo de Debida Diligencia de Socios Comerciales y Contratistas (ISO 37001 Cl. 8.2)
 * Cuestionario de 15 puntos ponderados, screening PEP y registro de proveedores de AUBASA
 */

export const DUE_DILIGENCE_CRITERIA = [
  {
    id: 'crit-1',
    dimension: 'Estructura Societaria y Beneficiario Final (UBO)',
    peso: 20,
    preguntas: [
      { id: 'q1_1', texto: '¿La empresa ha identificado fehacientemente a todos sus Beneficiarios Finales (personas humanas con >= 10% del capital) sin estructuras fiduciarias u offshore opacas?', puntos: 10 },
      { id: 'q1_2', texto: '¿La sociedad cuenta con inscripción vigente en el Registro de Proveedores de la Prov. de Buenos Aires y Registro Nacional de Constructores?', puntos: 10 }
    ]
  },
  {
    id: 'crit-2',
    dimension: 'Screening PEP y Conflictos de Intereses (UIF Res. 35/2023)',
    peso: 25,
    preguntas: [
      { id: 'q2_1', texto: '¿Ninguno de los accionistas, directores, apoderados o gerentes clave reviste el carácter de Persona Expuesta Políticamente (PEP) en el ámbito nacional o provincial?', puntos: 15 },
      { id: 'q2_2', texto: '¿Se ha verificado la ausencia de vínculos de parentesco (hasta 2do grado) o sociedades compartidas con directivos o personal de compras/obras de AUBASA?', puntos: 10 }
    ]
  },
  {
    id: 'crit-3',
    dimension: 'Antecedentes Penales, Judiciales e Inhabilitaciones',
    peso: 25,
    preguntas: [
      { id: 'q3_1', texto: '¿La firma y sus directores no registran condenas, procesamientos ni investigaciones activas por delitos de corrupción o fraude (Ley 27.401, cohecho, lavado de activos)?', puntos: 15 },
      { id: 'q3_2', texto: '¿La empresa no figura en listados de inhabilitados del Banco Mundial, BID, AFIP o Registro de Sanciones del Estado?', puntos: 10 }
    ]
  },
  {
    id: 'crit-4',
    dimension: 'Capacidad Económica, Fiscal y Solvencia Operativa',
    peso: 15,
    preguntas: [
      { id: 'q4_1', texto: '¿Presenta certificado fiscal para contratar expedido por ARBA / AFIP sin antecedentes de facturación apócrifa ni deudas líquidas y exigibles?', puntos: 10 },
      { id: 'q4_2', texto: '¿Posee planta de asfalto propia o contratada formalmente y parque de maquinaria vial verificado por inspección técnica?', puntos: 5 }
    ]
  },
  {
    id: 'crit-5',
    dimension: 'Programa de Integridad y Compromiso Antisoborno',
    peso: 15,
    preguntas: [
      { id: 'q5_1', texto: '¿Cuenta con un Programa de Integridad / Compliance formal conforme a la Ley 27.401 con Código de Ética y Canal de Denuncias?', puntos: 10 },
      { id: 'q5_2', texto: '¿Ha firmado la adhesión explícita a la Política Antisoborno y Cláusula Anticorrupción de AUBASA sin reservas?', puntos: 5 }
    ]
  }
];

export const INITIAL_PARTNERS_REGISTRY = [
  {
    id: 'PROV-001',
    razonSocial: 'Vial Construcciones del Atlántico S.A.',
    cuit: '30-68945231-8',
    rubro: 'Repavimentación y Obras Viales Mayores',
    contacto: 'Ing. Carlos Menéndez (Director de Operaciones)',
    email: 'contacto@vialatlantico.com.ar',
    contratoActual: 'Repavimentación Calzada Ascendente Autopista BALP (Tramo Quilmes - Berazategui km 21 a 38)',
    montoContratoARS: 1450000000,
    puntajeDD: 95,
    nivelRiesgo: 'bajo', // 'bajo' (85-100), 'medio' (65-84), 'alto' (<65 o PEP)
    tipoDebidaDiligencia: 'Simplificada',
    fechaEvaluacion: '2026-06-15',
    fechaVencimiento: '2028-06-15',
    dictamenOficial: 'PROVEEDOR APTO. Sin antecedentes desfavorables. Cumple Ley 27.401 y estructura UBO verificada.',
    hallazgos: 'Empresa con 20 años en el rubro vial metropolitano, cuenta con Programa de Integridad auditado y planta asfáltica en Berazategui.',
    oficialEvaluador: 'Dr. Martín Valenzuela (Oficial de Cumplimiento)'
  },
  {
    id: 'PROV-002',
    razonSocial: 'Consorcio Vial TelePASE & Tecnología S.R.L.',
    cuit: '33-71239845-9',
    rubro: 'Sistemas de Peaje, Antenas RFID y Software',
    contacto: 'Lic. Laura Benítez (Gerente Comercial)',
    email: 'lbenitez@telepasetecno.com.ar',
    contratoActual: 'Mantenimiento Preventivo y Actualización de Vías de TelePASE Dock Sud y Hudson',
    montoContratoARS: 420000000,
    puntajeDD: 72,
    nivelRiesgo: 'medio',
    tipoDebidaDiligencia: 'Estándar',
    fechaEvaluacion: '2026-04-10',
    fechaVencimiento: '2027-04-10',
    dictamenOficial: 'APROBADO CON CONDICIÓN DE MONITOREO. Requiere cláusula contractual de auditoría periódica de código y facturación.',
    hallazgos: 'Sociedad constituida hace 3 años. No cuenta con Oficial de Cumplimiento dedicado, pero firmó la adhesión a la Política de AUBASA.',
    oficialEvaluador: 'Dr. Martín Valenzuela (Oficial de Cumplimiento)'
  },
  {
    id: 'PROV-003',
    razonSocial: 'Áridos y Pavimentos del Sur UTE',
    cuit: '30-71890456-4',
    rubro: 'Bacheo Profundo y Provisión de Mezcla Asfáltica en Caliente',
    contacto: 'Arq. Esteban Rossi (Representante Técnico)',
    email: 'erossi@aridosdelsur.com.ar',
    contratoActual: 'Mantenimiento de Calzada Autopista BsAs-La Plata km 12 al 35',
    montoContratoARS: 890000000,
    puntajeDD: 55,
    nivelRiesgo: 'alto',
    tipoDebidaDiligencia: 'Intensificada (Enhanced DD)',
    fechaEvaluacion: '2026-08-01',
    fechaVencimiento: '2026-11-01',
    dictamenOficial: 'RIESGO ALTO. REQUIERE ELEVACIÓN Y AUTORIZACIÓN EXPRESA DEL DIRECTORIO DE AUBASA. Monitoreo por auditor externo.',
    hallazgos: 'Uno de los socios de la UTE posee un cargo político como Director de Vialidad Municipal en distrito limítrofe (PEP). Requiere control estricto de certificaciones y doble firma obligatoria en pagos.',
    oficialEvaluador: 'Dr. Martín Valenzuela (Oficial de Cumplimiento)'
  }
];
