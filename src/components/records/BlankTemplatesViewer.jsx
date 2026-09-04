import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Download,
  Printer,
  Check,
  Building2,
  ShieldCheck,
  Search,
  ExternalLink,
  PlusCircle,
  FileCheck2,
  ClipboardList,
  ChevronRight,
  Eye
} from 'lucide-react';

export const BLANK_TEMPLATES_DATA = [
  {
    id: 'REC-01',
    codigo: 'REC-CDI-01',
    nombre: 'Declaración Jurada de Conflicto de Intereses',
    clausula: 'Cl. 7.2 & 5.1',
    categoria: 'Personal & Gobernanza',
    frecuencia: 'Anual y por cada Licitación/Concurso de Obra',
    responsable: 'Directorio, Comisiones de Compra, Inspectores y Jefes de Peaje',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN ANTISOBORNO (IRAM-ISO 37001)
ANEXO III - FORMULARIO OFICIAL DE DECLARACIÓN JURADA DE CONFLICTO DE INTERESES (Cl. 7.2)
Alcance: Autopista Buenos Aires - La Plata (BALP - 50 km)

1. DATOS DEL DECLARANTE:
• Apellido y Nombre: ____________________________________________________________________
• D.N.I. / CUIL: ____________________________ Legajo Nº: _______________________________
• Cargo / Función: ________________________________ Gerencia / Área: ____________________
• Estación / Ubicación: [  ] Sede Central   [  ] Peaje Dock Sud   [  ] Peaje Hudson   [  ] Traza BALP

2. DECLARACIÓN JURADA BAJO SANCIÓN DE LEY:
Declaro bajo juramento que a la fecha:
a) [  ] NO POSEO ningún tipo de vínculo societario, comercial, profesional o de parentesco hasta
       el 2º grado de consanguinidad o afinidad con proveedores, contratistas u oferentes de AUBASA S.A.
b) [  ] SÍ POSEO vinculación o interés que podría configurar un Conflicto de Intereses potencial o real:
       - Razón Social / Oferente: _______________________________________________________
       - Naturaleza del vínculo: [  ] Societario   [  ] Familiar   [  ] Laboral previo   [  ] Otro
       - Detalle circunstanciado: ______________________________________________________

3. COMPROMISO FORMAL DE ABSTENCIÓN:
Me comprometo a abstenerme de intervenir directa o indirectamente en cualquier acto de compra,
evaluación de ofertas, inspección de obras o libramiento de pagos relacionados con personas o
entidades con las que mantenga intereses particulares, comunicándolo de inmediato al Oficial de Cumplimiento.

Lugar y Fecha: ______________________, _____ de ____________________ de 202___

Firma del Declarante: _________________________    Aclaración: ________________________________
Revisado por Cumplimiento (Firma/Sello): _______________________________________________________`
  },
  {
    id: 'REC-02',
    codigo: 'REC-DD-02',
    nombre: 'Dictamen de Debida Diligencia de Contratista / Proveedor',
    clausula: 'Cl. 8.2',
    categoria: 'Debida Diligencia & Compras',
    frecuencia: 'Previo a toda adjudicación y renovación bienal',
    responsable: 'Oficial de Cumplimiento & Comisión Evaluadora',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN ANTISOBORNO (IRAM-ISO 37001)
FORMULARIO OFICIAL DE EVALUACIÓN Y DICTAMEN DE DEBIDA DILIGENCIA (Cl. 8.2)
Alcance: Contratación de Bienes, Servicios y Obras Viales en BALP (50 km)

1. IDENTIFICACIÓN DE LA CONTRAPARTE / OFERENTE:
• Razón Social: _________________________________________________________________________
• C.U.I.T.: ____________________________ Expediente / Licitación Nº: ___________________
• Domicilio Legal: ______________________________________________________________________
• Objeto del Contrato: __________________________________________________________________
• Monto Estimado de Contratación: $ _____________________________________________________

2. VERIFICACIONES DE INTEGRIDAD REALIZADAS:
[  ] 1. Acreditación de Beneficiarios Finales (UBO) y personas con control societario > 10%.
[  ] 2. Screening en Registro Público de Empleadores con Sanciones Laborales (REPSAL).
[  ] 3. Verificación de Personas Expuestas Políticamente (PEP) en nómina directiva.
[  ] 4. Consulta en Listas Internacionales de Inhabilitados (Banco Mundial / BID / ONU / OFAC).
[  ] 5. Existencia de Programa de Integridad propio acreditado según Ley Nacional Nº 27.401.
[  ] 6. Firma expresa del Pacto de Integridad y Aceptación de la Política Antisoborno de AUBASA.

3. EVALUACIÓN DEL NIVEL DE RIESGO DE SOBORNO:
[  ] RIESGO BAJO (Puntaje < 30): Procede la contratación ordinaria.
[  ] RIESGO MEDIO (Puntaje 30-60): Requiere cláusulas contractuales reforzadas y auditorías técnicas.
[  ] RIESGO ALTO (Puntaje > 60): Requiere autorización expresa del Directorio y plan de mitigación estricto.

4. DICTAMEN TÉCNICO FINAL DEL OFICIAL DE CUMPLIMIENTO:
[  ] APTO PARA CONTRATAR       [  ] APTO CON CONDICIONAMIENTO      [  ] NO APTO / RECHAZADO
Fundamentación: _________________________________________________________________________
_________________________________________________________________________________________

Fecha de Emisión: _____/_____/202___   Vigencia hasta: _____/_____/202___

Firma Oficial de Cumplimiento: _______________________    Firma Gerente de Compras: ___________________`
  },
  {
    id: 'REC-03',
    codigo: 'REC-ARQ-03',
    nombre: 'Acta de Arqueo Sorpresivo en Estaciones de Peaje BALP',
    clausula: 'Cl. 8.3',
    categoria: 'Controles Financieros',
    frecuencia: 'Mensual y sorpresiva en Dock Sud y Hudson',
    responsable: 'Auditoría Interna, Tesorería y Supervisión de Peaje',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN ANTISOBORNO (IRAM-ISO 37001)
ACTA DE ARQUEO SORPRESIVO Y CONCILIACIÓN DE FONDOS DE PEAJE (Cl. 8.3)
Estaciones de Peaje Autopista Buenos Aires - La Plata

1. DATOS DEL PROCEDIMIENTO DE ARQUEO:
• Estación de Peaje: [  ] Dock Sud Troncal    [  ] Hudson Troncal    [  ] Acceso / Ramal: _________
• Vía Nº: __________   Turno: [  ] Mañana   [  ] Tarde   [  ] Noche
• Fecha del Arqueo: _____/_____/202___   Hora de Inicio: _______ hs.   Hora de Cierre: _______ hs.
• Cajero/a Operador/a (Nombre y Legajo): _________________________________________________
• Auditor / Supervisor Actuante: ________________________________________________________

2. DETALLE DE VALORES FÍSICOS RECONTADOS EN CABINA:
• Fondo Fijo de Cambio Asignado al Inicio de Turno: $ __________________________________
• Billetes de $ 20.000 / $ 10.000 / $ 2.000 / $ 1.000: $ __________________________________
• Billetes menores y Monedas:                       $ __________________________________
• Total Efectivo Recontado en Caja (A):             $ __________________________________

3. CONCILIACIÓN CON SISTEMA INFORMÁTICO DE TRÁNSITOS:
• Tránsitos Cobro Manual según Sistema Vía: _________ vehículos   = $ ________________ (B)
• Tránsitos TelePASE / TAG Registrados:     _________ vehículos   (Sin cobro en efectivo)
• Tickets / Exenciones Autorizadas en Vía:  _________ pasadas

4. DETERMINACIÓN DE DIFERENCIAS:
Total Físico (A) - Total Sistema (B + Fondo Cambio) = Diferencia: $ _______________________
Resultado: [  ] EXACTO / SIN DIFERENCIAS   [  ] SOBRANTE ($ ______)   [  ] FALTANTE ($ ______)
Justificación / Observaciones del Cajero: _________________________________________________

Firma Cajero/a de Vía: _______________________    Firma Supervisor de Peaje: ___________________
Firma Auditor Interno SGAS: ___________________`
  },
  {
    id: 'REC-04',
    codigo: 'REC-OBR-04',
    nombre: 'Protocolo de Ensayos Técnicos e Inspección de Obras Viales',
    clausula: 'Cl. 8.4',
    categoria: 'Controles No Financieros',
    frecuencia: 'Por cada tramo o certificado de obra en BALP',
    responsable: 'Inspección de Obras AUBASA & Laboratorio LEMIT / UNLP',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN ANTISOBORNO (IRAM-ISO 37001)
PROTOCOLO DE ENSAYOS CIEGOS Y CERTIFICACIÓN TÉCNICA DE OBRAS VIALES (Cl. 8.4)
Traza Autopista Buenos Aires - La Plata (Km 0+000 al Km 50+000)

1. IDENTIFICACIÓN DE LA OBRA Y CONTRATISTA:
• Denominación de la Obra: ______________________________________________________________
• Expediente Nº: ____________________ Contratista Adjudicado: ___________________________
• Certificado de Obra Nº: __________ Período de Medición: _____/_____ al _____/_____/202___
• Ubicación del Tramo Inspeccionado: Km _______ al Km _______ (Sentido: [  ] La Plata  [  ] CABA)

2. MUESTREO TÉCNICO Y ENSAYOS DE LABORATORIO (LEMIT / UNLP):
• Extracción de Probetas Testigo: [  ] Calado Asfáltico en Caliente   [  ] Testigos de Hormigón
• Código Ciego de Probeta (Garantía de Ensayos Ciegos): __________________________________
• Espesor Especificado en Pliego: ________ cm  |  Espesor Real Medido en Testigo: ________ cm
• Densidad / Compactación Especificada: ________ %  |  Densidad Real Obtenida: ________ %
• Resistencia Característica a la Compresión: ________ MPa
• Laboratorio Certificador Independiente: [  ] LEMIT   [  ] UNLP Ingeniería   [  ] Otro: _________
• Informe de Ensayo Nº: __________________ de Fecha: _____/_____/202___

3. DICTAMEN DE CONFORMIDAD TÉCNICA PARA PAGO:
[  ] CONFORME (100%): Cumple especificaciones técnicas del pliego. Se autoriza libramiento de pago.
[  ] NO CONFORME: Desvío detectado. Se retiene el certificado hasta corrección o fresado del tramo.

Firma Inspector de Obra AUBASA: ___________________    Firma Director Técnico LEMIT: _________________
Firma Gerente Técnico Operativo: ___________________`
  },
  {
    id: 'REC-05',
    codigo: 'REC-CAPA-05',
    nombre: 'Ficha de No Conformidad y Acción Correctiva (CAPA)',
    clausula: 'Cl. 10.1 & 10.2',
    categoria: 'Mejora Continua',
    frecuencia: 'Ante todo desvío, hallazgo de auditoría o incidente',
    responsable: 'Dueño del Proceso afectado & Oficial de Cumplimiento',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN ANTISOBORNO (IRAM-ISO 37001)
FICHA OFICIAL DE NO CONFORMIDAD Y ACCIÓN CORRECTIVA (CAPA) (Cl. 10.1)

1. DATOS GENERALES:
• Registro CAPA Nº: CAPA-2026-______   Fecha de Apertura: _____/_____/202___
• Proceso Afectado: [  ] Contrataciones   [  ] Pagos / Tesorería   [  ] Obras Viales   [  ] Peajes   [  ] Otro
• Origen del Hallazgo: [  ] Auditoría Interna   [  ] Canal Ético   [  ] Control de Peaje   [  ] Auditoría IRAM

2. DESCRIPCIÓN CIRCUNSTANCIADA DEL DESVÍO O NO CONFORMIDAD:
_________________________________________________________________________________________
_________________________________________________________________________________________
Evidencia objetiva detectada: ___________________________________________________________

3. ACCIÓN DE CONTENCIÓN INMEDIATA (Corrección):
_________________________________________________________________________________________
Responsable: ____________________________________   Fecha de Ejecución: _____/_____/202___

4. ANÁLISIS DE CAUSA RAÍZ (Metodología de los 5 Porqués):
• 1. ¿Por qué ocurrió?: _________________________________________________________________
• 2. ¿Por qué?: _________________________________________________________________________
• 3. ¿Por qué?: _________________________________________________________________________
• 4. ¿Por qué?: _________________________________________________________________________
• 5. ¿Por qué? (Causa Raíz Final): _______________________________________________________

5. PLAN DE ACCIÓN CORRECTIVA PARA ELIMINAR LA CAUSA RAÍZ:
• Acción 1: _____________________________________ Resp: ______________ Plazo: _____/_____/202___
• Acción 2: _____________________________________ Resp: ______________ Plazo: _____/_____/202___

6. VERIFICACIÓN DE EFICACIA (A los 60 días posteriores):
Fecha de Verificación: _____/_____/202___   ¿El desvío volvió a repetirse?: [  ] SÍ   [  ] NO
Dictamen: [  ] CAPA CERRADA CON ÉXITO    [  ] CAPA REABIERTA POR INEFICACIA

Firma Dueño del Proceso: _________________________    Firma Oficial de Cumplimiento: ________________`
  },
  {
    id: 'REC-06',
    codigo: 'REC-REG-06',
    nombre: 'Libro / Formulario de Registro de Regalos y Cortesías',
    clausula: 'Cl. 8.7',
    categoria: 'Relaciones Institucionales',
    frecuencia: 'Dentro de las 48 hs de recibido o rechazado un presente',
    responsable: 'Todo el personal / Custodia: Oficial de Cumplimiento',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN ANTISOBORNO (IRAM-ISO 37001)
FORMULARIO DE DECLARACIÓN Y REGISTRO DE REGALOS Y HOSPITALIDAD (Cl. 8.7)

1. DATOS DEL RECEPTOR:
• Nombre y Apellido: ___________________________________________ Legajo: _________________
• Cargo / Puesto: ________________________________ Area / Gerencia: ______________________

2. DATOS DEL OFERENTE / PROVEEDOR:
• Persona o Empresa que ofrece el presente: _____________________________________________
• Vínculo comercial o institucional con AUBASA: __________________________________________
• Motivo manifiesto: [  ] Fin de Año   [  ] Evento / Conferencia   [  ] Cortesía Comercial   [  ] Otro

3. DESCRIPCIÓN DEL BIEN O INVITACIÓN:
• Detalle del objeto o beneficio: ________________________________________________________
• Valor Estimado de Mercado: $ _______________ (Equivalente en USD: USD $ ______________)
• ¿Supera el umbral institucional máximo de USD $50?: [  ] SÍ (Prohibido)   [  ] NO

4. DESTINO FINAL ASIGNADO AL BIEN:
[  ] 1. RECHAZADO EN EL ACTO Y DEVUELTO con nota protocolar explicativa de la política SGAS.
[  ] 2. ACEPTADO Y CONSERVADO (Cumple con ser de valor insignificante / material promocional común).
[  ] 3. ENTREGADO AL OFICIAL DE CUMPLIMIENTO para sorteo de personal o donación benéfica.

Fecha de Declaración: _____/_____/202___

Firma del Declarante: _________________________    Firma y Sello Oficial Cumplimiento: ___________`
  },
  {
    id: 'REC-07',
    codigo: 'REC-PAC-07',
    nombre: 'Pacto de Integridad y Cláusulas Antisoborno para Pliegos',
    clausula: 'Cl. 8.6',
    categoria: 'Contrataciones',
    frecuencia: 'Obligatorio en todo pliego licitatorio y contrato',
    responsable: 'Gerencia de Compras & Contratistas oferentes',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN ANTISOBORNO (IRAM-ISO 37001)
ANEXO DE INTEGRIDAD Y CLÁUSULAS ANTISOBORNO OBLIGATORIAS EN PLIEGOS (Cl. 8.6)
Licitaciones Públicas, Privadas y Concursos de Obras en Autopista BALP (50 km)

La empresa ____________________________________________________, C.U.I.T. Nº _____________________,
representada por ____________________________________________, DNI Nº ___________________________,
en su carácter de Apoderado Legal en la Licitación / Contratación Nº _____________________________:

DECLARA Y SE COMPROMETE FORMALMENTE ANTE AUTOPISTAS DE BUENOS AIRES S.A. (AUBASA) A:
1. Conocer y respetar estrictamente la Política Antisoborno de AUBASA y los requerimientos de la
   Norma IRAM-ISO 37001 y la Ley Nacional Nº 27.401 de Responsabilidad Penal Empresaria.
2. NO ofrecer, pagar, prometer ni autorizar, de manera directa o mediante intermediarios, ningún
   tipo de dádiva, soborno, pago indebido o beneficio a funcionarios, inspectores o empleados de AUBASA.
3. Denunciar de inmediato a través del Canal Ético de AUBASA (canal.etico@aubasa.com.ar / 0800-468-3474)
   cualquier solicitud o exigencia indebida efectuada por personal de la concesionaria.
4. ACEPTAR expresamente que el incumplimiento comprobado de este pacto facultará a AUBASA a la
   rescisión contractual con causa, ejecución íntegra de la garantía de oferta y remisión a la Justicia Penal.

Lugar y Fecha: ______________________, _____ de ____________________ de 202___

Firma del Apoderado de la Empresa: ______________________    Aclaración / Sello: _________________`
  },
  {
    id: 'REC-08',
    codigo: 'REC-CAP-08',
    nombre: 'Planilla de Capacitación y Evaluación de Eficacia SGAS',
    clausula: 'Cl. 7.2 & 7.3',
    categoria: 'Competencia & Concientización',
    frecuencia: 'Anual y en cada inducción de personal nuevo',
    responsable: 'Gerencia de RRHH & Oficial de Cumplimiento',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN ANTISOBORNO (IRAM-ISO 37001)
REGISTRO OFICIAL DE ASISTENCIA Y EVALUACIÓN DE EFICACIA FORMATIVA (Cl. 7.2 / 7.3)

1. DATOS DEL PROGRAMA DE CAPACITACIÓN:
• Título del Curso: ____________________________________________________________________
• Módulo: [  ] M-01 Política & Cl. 5.2   [  ] M-02 Peajes & Finanzas   [  ] M-03 Obras & LEMIT   [  ] M-04 Canal 37002
• Modalidad: [  ] Presencial Sede   [  ] Presencial Peajes   [  ] Plataforma E-Learning
• Instructor / Capacitador: _____________________________________ Duración: ______ Horas
• Fecha de Realización: _____/_____/202___

2. NÓMINA DE PARTICIPANTES Y CALIFICACIÓN DE EVALUACIÓN:
--------------------------------------------------------------------------------------------------
Nº | APELLIDO Y NOMBRE         | LEGAJO | PUESTO / SECTOR       | FIRMA ASISTENCIA | NOTA TEST (%)
---|---------------------------|--------|-----------------------|------------------|--------------
01 |                           |        |                       |                  |
02 |                           |        |                       |                  |
03 |                           |        |                       |                  |
04 |                           |        |                       |                  |
05 |                           |        |                       |                  |
--------------------------------------------------------------------------------------------------
Criterio de Aprobación y Eficacia: Calificación igual o superior al 80% en test de casos prácticos.

Firma del Instructor: ___________________________    Firma Oficial de Cumplimiento: ______________`
  },
  {
    id: 'REC-09',
    codigo: 'REC-DIR-09',
    nombre: 'Acta Oficial de Revisión del SGAS por la Dirección',
    clausula: 'Cl. 9.3',
    categoria: 'Evaluación del Desempeño',
    frecuencia: 'Semestral / Anual',
    responsable: 'Directorio y Presidencia de AUBASA',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN ANTISOBORNO (IRAM-ISO 37001)
ACTA DE REUNIÓN DEL DIRECTORIO — REVISIÓN POR LA DIRECCIÓN DEL SGAS (Cl. 9.3)
Libro de Actas Oficial — Sede Central AUBASA S.A.

En la Ciudad de Buenos Aires, a los _____ días del mes de _________________ de 202___, se reúne el
Directorio de Autopistas de Buenos Aires S.A. con la presencia del Oficial de Cumplimiento para
tratar el siguiente ORDEN DEL DÍA relativo al Sistema de Gestión Antisoborno (Norma IRAM-ISO 37001):

1. ESTADO DE LAS ACCIONES DE REVISIONES PREVIAS POR LA DIRECCIÓN.
2. CAMBIOS EN EL CONTEXTO EXTERNO E INTERNO DE LA CONCESIÓN BALP (50 KM).
3. DESEMPEÑO DEL SISTEMA DE GESTIÓN ANTISOBORNO:
   - Reportes e investigaciones del Canal Ético (Norma UNE-ISO 37002 e ISO/TS 37008).
   - Resultados de Auditorías Internas y Grado de Cumplimiento de Objetivos SGAS.
   - Estado de No Conformidades y Acciones Correctivas (CAPAs) abiertas y cerradas.
4. ASIGNACIÓN DE RECURSOS FINANCIEROS Y TECNOLÓGICOS PARA EL MANTENIMIENTO DEL SGAS.
5. OPORTUNIDADES DE MEJORA CONTINUA Y ADECUACIÓN DE CONTROLES VIALES.

RESOLUCIONES ADOPTADAS:
El Directorio resuelve por unanimidad dar por aprobado el informe del Oficial de Cumplimiento y
ratificar la política de Tolerancia Cero al Soborno en todas las operaciones de la Concesión BALP.

Firma Presidente Directorio: ____________________    Firma Directores: ___________________________
Firma Oficial de Cumplimiento: __________________`
  },
  {
    id: 'REC-10',
    codigo: 'REC-DEN-10',
    nombre: 'Formulario de Recepción y Triaje de Denuncia (UNE-ISO 37002)',
    clausula: 'Cl. 8.9 & UNE-ISO 37002',
    categoria: 'Canal Ético & Denuncias',
    frecuencia: 'Por cada reporte ingresado',
    responsable: 'Oficial de Cumplimiento & Comité de Integridad',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN DE DENUNCIAS (UNE-ISO 37002 / ISO 37001 Cl. 8.9)
FORMULARIO DE RECEPCIÓN, REGISTRO Y TRIAJE DE DENUNCIAS DEL CANAL ÉTICO

1. DATOS DE IDENTIFICACIÓN DEL CASO:
• Número de Caso: CASO-2026-______   Token de Seguimiento: _____________________________
• Fecha y Hora de Ingreso: _____/_____/202___ a las _______ hs.
• Canal de Entrada: [  ] Portal Web Cifrado   [  ] 0800-468-3474   [  ] Buzón   [  ] Correo Confidencial
• Condición del Denunciante: [  ] Anónimo   [  ] Con Identidad Reservada bajo Cláusula 8.9

2. HECHOS DENUNCIADOS:
• Proceso Afectado: [  ] Peajes / Recaudación   [  ] Compras / Licitaciones   [  ] Obras BALP   [  ] Otro
• Personas / Empresas Señaladas: ________________________________________________________
• Relato sintético de los hechos: _______________________________________________________
_________________________________________________________________________________________

3. TRIAJE Y EVALUACIÓN DE ADMISIBILIDAD (Plazo máx. 5 días hábiles):
[  ] ADMISIBLE: Con indicios razonables de soborno/corrupción. Se abre Expediente de Investigación.
[  ] INADMISIBLE: Hechos manifiestamente infundados o ajenos al alcance SGAS. Se archiva con acta.
[  ] DERIVACIÓN: Corresponde a reclamo laboral u operativo ordinario sin tipología de soborno.

4. MEDIDAS CAUTELARES Y PROTECCIÓN DE NO REPRESALIAS:
[  ] Activación de Protocolo de No Represalias para el denunciante y testigos.

Firma Oficial de Cumplimiento: _______________________    Fecha de Dictamen: _____/_____/202___`
  },
  {
    id: 'REC-11',
    codigo: 'REC-INV-11',
    nombre: 'Acta de Términos de Referencia e Investigación Forense (ISO/TS 37008)',
    clausula: 'ISO/TS 37008 & Cl. 8.10',
    categoria: 'Investigaciones Forenses',
    frecuencia: 'Por cada investigación iniciada',
    responsable: 'Investigador Forense Designado / Oficial de Cumplimiento',
    formato: `AUBASA S.A. — DIRECTRICES PARA INVESTIGACIONES INTERNAS (ISO/TS 37008:2023)
ACTA DE TÉRMINOS DE REFERENCIA Y CADENA DE CUSTODIA FORENSE

1. DATOS DE LA INVESTIGACIÓN:
• Expediente Pericial Nº: EXP-FOR-2026-______   Caso Vinculado: CASO-2026-______
• Investigador / Perito a Cargo: _________________________________________________________
• Objeto y Alcance: Esclarecimiento de hechos presuntamente constitutivos de soborno en BALP.

2. ACTA DE ENTREVISTA TESTIMONIAL / IMPUTADO:
• Persona Entrevistada: ____________________________________ Legajo: ___________________
• Fecha / Hora: _____/_____/202___ de ______ a ______ hs.   Lugar: _______________________
• Resumen de Declaraciones y Preguntas: ________________________________________________
_________________________________________________________________________________________

3. REGISTRO DE CADENA DE CUSTODIA DE EVIDENCIAS DIGITALES / DOCUMENTALES:
--------------------------------------------------------------------------------------------------
Ítem | Descripción del Elemento Recolectado | Origen / Ubicación     | Hash SHA-256 de Integridad
-----|--------------------------------------|------------------------|----------------------------
01   |                                      |                        |
02   |                                      |                        |
--------------------------------------------------------------------------------------------------

4. CONCLUSIÓN Y DICTAMEN PERICIAL (ISO/TS 37008):
[  ] HECHO PROBADO: Se recomienda sanción disciplinaria y formulación de denuncia penal.
[  ] HECHO NO PROBADO: No se obtuvieron evidencias concluyentes. Se recomienda cierre y archivo.

Firma Investigador Forense: ______________________    Firma Oficial Cumplimiento: ________________`
  },
  {
    id: 'REC-12',
    codigo: 'REC-OBJ-12',
    nombre: 'Matriz de Seguimiento de Objetivos Antisoborno y KPIs',
    clausula: 'Cl. 6.2',
    categoria: 'Planificación & Objetivos',
    frecuencia: 'Trimestral',
    responsable: 'Oficial de Cumplimiento & Gerencia General',
    formato: `AUBASA S.A. — SISTEMA DE GESTIÓN ANTISOBORNO (IRAM-ISO 37001)
TABLERO DE CONTROL Y SEGUIMIENTO DE OBJETIVOS ANTISOBORNO (Cl. 6.2)
Período: Año 2026 — Alcance Concesión BALP (50 km)

OBJETIVO 1: Capacitar al 100% del personal expuesto a riesgos de soborno en BALP.
• KPI: (% Personal Capacitado) = (Capacitados / Total Expuestos) * 100 | Meta: 100%
• Q1: ______%   Q2: ______%   Q3: ______%   Q4: ______%   | Estado: [  ] En meta   [  ] Desvío

OBJETIVO 2: Realizar Debida Diligencia al 100% de los contratistas adjudicados en traza BALP.
• KPI: (% Contratistas Evaluados) = (Evaluados / Adjudicados) * 100 | Meta: 100%
• Q1: ______%   Q2: ______%   Q3: ______%   Q4: ______%   | Estado: [  ] En meta   [  ] Desvío

OBJETIVO 3: Verificar el 100% de órdenes de pago a proveedores con principio de 4 ojos (doble firma electrónica) y conciliación previa.
• KPI: (% Pagos con Doble Firma y Conciliación Previa) | Meta: 100%
• Q1: ______%   Q2: ______%   Q3: ______%   Q4: ______%   | Estado: [  ] En meta   [  ] Desvío

OBJETIVO 4: Evaluar el 100% de las denuncias ingresadas al Canal Ético en un plazo <= 5 días hábiles.
• KPI: (% Denuncias Evaluadas en Plazo) | Meta: 100%
• Q1: ______%   Q2: ______%   Q3: ______%   Q4: ______%   | Estado: [  ] En meta   [  ] Desvío

Firma Oficial de Cumplimiento: _______________________    Firma Gerente General: _____________________`
  }
];

export default function BlankTemplatesViewer({
  onSelectTemplateToFill
}) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(BLANK_TEMPLATES_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['all', ...Array.from(new Set(BLANK_TEMPLATES_DATA.map(t => t.categoria)))];

  const filteredTemplates = BLANK_TEMPLATES_DATA.filter(t => {
    if (categoryFilter !== 'all' && t.categoria !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        t.nombre.toLowerCase().includes(q) ||
        t.codigo.toLowerCase().includes(q) ||
        t.clausula.toLowerCase().includes(q) ||
        t.categoria.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeTemplate = BLANK_TEMPLATES_DATA.find(t => t.id === selectedTemplateId) || BLANK_TEMPLATES_DATA[0];

  const handleCopyText = (template) => {
    navigator.clipboard.writeText(template.formato);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadTxt = (template) => {
    const element = document.createElement("a");
    const file = new Blob([template.formato], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `AUBASA_Plantilla_En_Blanco_${template.codigo}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrintTemplate = (template) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${template.nombre} - AUBASA SGAS</title>
          <style>
            body { font-family: monospace; font-size: 12px; padding: 25px; line-height: 1.4; color: #000; }
            pre { white-space: pre-wrap; font-family: inherit; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <pre>${template.formato}</pre>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Banner Informativo Superior */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0284c7] text-white">
                Cl. 7.5 Información Documentada
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                12 Plantillas Oficiales en Blanco
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Catálogo de Registros y Formularios en Blanco
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Consulte, copie o descargue las <strong>plantillas estandarizadas en blanco</strong> requeridas por la Norma IRAM-ISO 37001 para la Concesión BALP (50 km). Estos modelos oficiales están listos para imprimir, completar y archivar como evidencia de auditoría.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#0284c7] bg-white px-3 py-1.5 rounded-xl border border-sky-200 shadow-2xs">
              {BLANK_TEMPLATES_DATA.length} Modelos Disponibles
            </span>
          </div>
        </div>
      </div>

      {/* Buscador y Filtro de Categoría */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todos los Registros' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar plantilla por nombre, código..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7]"
          />
        </div>
      </div>

      {/* Grid Principal: Listado a la Izquierda y Visor de Plantilla a la Derecha */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Columna Izquierda: Lista de Plantillas (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
          {filteredTemplates.map((template) => {
            const isSelected = template.id === activeTemplate.id;
            return (
              <div
                key={template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-sky-50/90 border-[#0284c7] shadow-sm ring-1 ring-[#0284c7]/40'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="font-mono text-[10px] font-black text-[#0284c7] bg-white px-2 py-0.5 rounded border border-sky-200">
                    {template.codigo}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    {template.clausula}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                  {template.nombre}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                  <span className="text-[10px] text-slate-400">{template.categoria}</span>
                  <div className="flex items-center gap-1 text-[#0284c7] font-semibold text-[11px]">
                    <span>Ver modelo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Columna Derecha: Visor de Plantilla en Blanco (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          {/* Header del Visor */}
          <div className="p-4 sm:p-5 bg-slate-50/90 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-black bg-[#0284c7] text-white">
                  {activeTemplate.codigo}
                </span>
                <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {activeTemplate.clausula}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  • {activeTemplate.categoria}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {activeTemplate.nombre}
              </h3>
            </div>

            {/* Acciones de la Plantilla */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyText(activeTemplate)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-all shadow-2xs"
                title="Copiar texto de la plantilla al portapapeles"
              >
                {copiedId === activeTemplate.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copiar</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownloadTxt(activeTemplate)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-all shadow-2xs"
                title="Descargar plantilla en formato .txt"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Descargar</span>
              </button>

              <button
                onClick={() => handlePrintTemplate(activeTemplate)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                title="Imprimir plantilla en blanco"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir</span>
              </button>
            </div>
          </div>

          {/* Metadatos Rápidos del Registro */}
          <div className="px-5 py-3 bg-sky-50/50 border-b border-sky-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Frecuencia Obligatoria:</span>
              <p className="text-slate-700 font-medium text-[11px]">{activeTemplate.frecuencia}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Responsable de Emisión / Custodia:</span>
              <p className="text-slate-700 font-medium text-[11px]">{activeTemplate.responsable}</p>
            </div>
          </div>

          {/* Cuerpo de la Plantilla en Blanco (Estilo Hoja Membretada) */}
          <div className="p-5 sm:p-6 flex-1 overflow-x-auto bg-slate-50/30">
            <div className="bg-white border border-slate-300 rounded-xl p-6 font-mono text-xs text-slate-800 shadow-inner whitespace-pre-wrap leading-relaxed select-text">
              {activeTemplate.formato}
            </div>
          </div>

          {/* Footer Informativo */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>
              ℹ️ Utilice esta plantilla como documento estándar oficial de AUBASA S.A.
            </span>
            <span className="font-mono text-[11px] font-bold text-[#0284c7]">
              Norma IRAM-ISO 37001:2025
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
