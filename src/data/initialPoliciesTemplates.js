/**
 * Compendio Oficial de Políticas, Manual y Procedimientos Operativos Estándar (POEs) del SGAS AUBASA
 * Norma IRAM ISO 37001:2016 y Ley Nacional 27.401
 */

export const INITIAL_POLICY_TEMPLATES = [
  // 1. MANUAL DEL SISTEMA
  {
    id: 'MAN-SGAS-01',
    codigo: 'MAN-SGAS-01',
    clausulaIso: 'Cl. 4.1 a 10.2',
    titulo: 'Manual del Sistema de Gestión Antisoborno de AUBASA',
    categoria: 'Manual del Sistema',
    descripcion: 'Documento maestro que describe el alcance, contexto vial, liderazgo, política, mapa de procesos y gobernanza antisoborno de AUBASA.',
    contenidoMarkdown: `# MANUAL DEL SISTEMA DE GESTIÓN ANTISOBORNO (SGAS)
**Código:** MAN-SGAS-01 | **Versión:** 2.0 (Oficial) | **Aprobación:** Acta de Directorio Nº 418
**Norma:** IRAM ISO 37001:2016 | **Alcance:** Concesión Autopista Buenos Aires - La Plata (BALP - 50 km)

---

### 1. OBJETO Y CAMPO DE APLICACIÓN
El presente Manual describe la estructura, políticas y procesos del Sistema de Gestión Antisoborno de **Autopistas de Buenos Aires S.A. (AUBASA)**, conforme los requisitos de la Norma ISO 37001:2016 y el Régimen de Integridad de la Ley 27.401.

### 2. ALCANCE DEL SISTEMA
El SGAS aplica con carácter vinculante a todos los procesos directos e indirectos de:
1. **Contratación y Abastecimiento:** Licitaciones públicas, concursos y compras de insumos viales y sistemas de peaje.
2. **Pagos y Tesorería:** Recaudación en estaciones de peaje, fondos fijos, liquidación a proveedores y redeterminaciones de precios.
3. **Planificación y Ejecución de Obras Viales:** Proyectos de repavimentación, bacheo, señalización, obras civiles, ensayos técnicos de probetas y certificación de avance físico.

### 3. ESTRUCTURA DE GOBERNANZA ANTISOBORNO
- **Órgano de Gobierno y Alta Dirección (Cl. 5.1):** Directorio y Presidencia de AUBASA, responsables de aprobar políticas, asignar recursos y liderar con el ejemplo.
- **Función de Cumplimiento Antisoborno (Cl. 5.3):** Oficial de Cumplimiento independiente con acceso directo e irrestricto al Directorio y facultades de veto ético.
- **Comité de Integridad:** Órgano colegiado de consulta y triaje para casos complejos del Canal Ético.

### 4. MAPA DE INTERACCIÓN DE PROCESOS DEL SGAS
- **Estratégicos:** Gestión del Liderazgo (Cl. 5), Evaluación de Riesgos (Cl. 4.5 & 6.1), Revisión por la Dirección (Cl. 9.3).
- **Operativos:** Debida Diligencia (Cl. 8.2), Controles Financieros (Cl. 8.3), Controles de Obras (Cl. 8.4), Regalos y Cortesías (Cl. 8.7).
- **Soporte y Mejora:** Competencia y Capacitación (Cl. 7.2 & 7.3), Información Documentada (Cl. 7.5), Canal Ético (Cl. 8.9), Auditorías Internas (Cl. 9.2) y CAPA (Cl. 10.1).`
  },

  // 2. POLÍTICA INSTITUCIONAL ANTISOBORNO
  {
    id: 'POL-SGAS-01',
    codigo: 'POL-SGAS-01',
    clausulaIso: 'Cl. 5.2',
    titulo: 'Política Institucional Antisoborno de AUBASA',
    categoria: 'Gobernanza y Liderazgo',
    descripcion: 'Declaración pública de tolerancia cero al soborno, prohibición absoluta de pagos de facilitación y marco de gobernanza antisoborno.',
    contenidoMarkdown: `# POLÍTICA INSTITUCIONAL ANTISOBORNO DE AUBASA
**Código:** POL-SGAS-01 | **Versión:** 2.0 | **Aprobación:** Acta de Directorio Nº 412
**Norma:** ISO 37001:2016 (Cláusula 5.2) | **Marco Legal:** Ley 27.401, Ley 25.188

---

### 1. DECLARACIÓN DE COMPROMISO
**AUTOPISTAS DE BUENOS AIRES S.A. (AUBASA)**, empresa concesionaria responsable de la administración y mantenimiento de la red vial provincial, establece un compromiso absoluto e irrenunciable con la integridad, la transparencia y la ética pública.

AUBASA declara una política de **TOLERANCIA CERO** frente al soborno y a la corrupción en todas sus formas, directas o indirectas, ya sea en el sector público o en las relaciones con proveedores y contratistas privados.

### 2. PRINCIPIOS FUNDAMENTALES DEL SGAS
1. **Prohibición Total del Soborno:** Queda terminantemente prohibido ofrecer, prometer, entregar, autorizar, solicitar o aceptar, de manera directa o mediante intermediarios, cualquier ventaja indebida, pago, dádiva, regalo o favor con el propósito de obtener, retener o agilizar un negocio o ventaja comercial o administrativa.
2. **Prohibición de Pagos de Facilitación:** Queda expresamente prohibido realizar pagos informales para acelerar trámites administrativos, aprobaciones de certificaciones de obra o liquidaciones de pago.
3. **Cumplimiento Legal Estricto:** AUBASA y todos sus colaboradores cumplirán rigurosamente la Ley Nacional 27.401 de Responsabilidad Penal de las Personas Jurídicas, la Ley Provincial 6021 de Obras Públicas y el Código Penal de la Nación.
4. **Independencia de la Función de Cumplimiento:** La Dirección garantiza la autonomía funcional, operativa y jerárquica del **Oficial de Cumplimiento Antisoborno**, con acceso directo e irrestricto al Directorio.
5. **Protección al Denunciante (No Represalias):** Se garantiza la estricta confidencialidad y la protección absoluta contra cualquier tipo de represalia a quien denuncie de buena fe o sobre la base de una sospecha razonable cualquier hecho de soborno a través del Canal Ético.
6. **Mejora Continua:** AUBASA se compromete a revisar periódicamente su Matriz de Riesgos y los controles financieros y no financieros del SGAS para garantizar su eficacia.

### 3. CONSECUENCIAS DEL INCUMPLIMIENTO
Cualquier empleado, funcionario o contratista que infrinja esta Política estará sujeto a:
- Sanciones disciplinarias laborales que incluyen el despido con causa inmediata conforme LCT.
- Rescisión automática de los contratos comerciales u órdenes de compra sin derecho a indemnización.
- Denuncia penal inmediata ante el Ministerio Público Fiscal de la Provincia de Buenos Aires.

---
**Firma:** Directorio de AUBASA S.A. | **Fecha de Emisión:** 15 de Marzo de 2026`
  },

  // 3. POE-01: EVALUACIÓN DE RIESGOS
  {
    id: 'POE-SGAS-01',
    codigo: 'POE-SGAS-01',
    clausulaIso: 'Cl. 4.5 & 6.1',
    titulo: 'Procedimiento Operativo: Identificación y Evaluación de Riesgos de Soborno',
    categoria: 'Gestión de Riesgos',
    descripcion: 'Metodología oficial para la identificación, ponderación de probabilidad e impacto, cálculo de riesgo residual y planes de tratamiento.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: GESTIÓN DE RIESGOS DE SOBORNO
**Código:** POE-SGAS-01 | **Versión:** 1.4 | **Norma:** ISO 37001:2016 (Cl. 4.5 & 6.1)

---

### 1. OBJETIVO
Establecer la metodología sistemática para identificar, analizar, evaluar y tratar los riesgos de soborno en todos los procesos de AUBASA, determinando el nivel de riesgo residual aceptable.

### 2. ALCANCE
Aplica a todos los procesos gerenciales, operativos (Peajes, Obras, Contrataciones, Tesorería) y de soporte.

### 3. RESPONSABILIDADES
- **Líderes de Proceso:** Identificar escenarios de riesgo en sus áreas operativas y proponer controles preventivos.
- **Oficial de Cumplimiento:** Conducir los talleres anuales de riesgo, calibrar las matrices y monitorear la efectividad de los controles.
- **Directorio:** Aprobar la Matriz de Riesgos y el apetito de riesgo institucional.

### 4. ETAPAS DEL PROCEDIMIENTO
1. **Identificación de Escenarios:** Análisis de interacciones con funcionarios públicos, contratistas viales, inspectores y manejo de efectivo en peajes.
2. **Evaluación Inherente:** Calificación de Probabilidad (1 a 5) e Impacto (1 a 5) sin considerar controles existentes.
3. **Ponderación de Controles:** Evaluación del diseño y eficacia operativa de los controles preventivos y detectivos.
4. **Cálculo del Riesgo Residual:** Determinación del nivel final (Bajo, Medio, Alto, Crítico).
5. **Planes de Mitigación:** Obligatorios para todo riesgo residual Medio o Alto, con plazo máximo de implementación de 90 días.
6. **Actualización:** Frecuencia anual o extraordinaria ante cambios en la traza, nuevas licitaciones de gran envergadura o denuncias confirmadas.

### 5. REGISTROS ASOCIADOS (Cl. 7.5)
- Matriz Integral de Riesgos de Soborno (REG-SGAS-01).
- Informes de Seguimiento de Planes de Tratamiento.`
  },

  // 4. POE-02: DEBIDA DILIGENCIA
  {
    id: 'POE-SGAS-02',
    codigo: 'POE-SGAS-02',
    clausulaIso: 'Cl. 8.2',
    titulo: 'Procedimiento Operativo: Debida Diligencia de Socios Comerciales y Contratistas',
    categoria: 'Operación y Terceros',
    descripcion: 'Reglamento para la investigación de integridad, screening PEP/UBO, cuestionario de 15 puntos y clasificación de riesgo de oferentes y contratistas.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: DEBIDA DILIGENCIA DE TERCEROS
**Código:** POE-SGAS-02 | **Versión:** 2.0 | **Norma:** ISO 37001:2016 (Cl. 8.2)

---

### 1. OBJETIVO
Definir los pasos obligatorios para evaluar los antecedentes, solvencia ética y riesgos de soborno de contratistas de obra vial, proveedores de TelePASE y consultores antes de su contratación y durante la ejecución contractual.

### 2. ALCANCE
Aplica al 100% de las empresas que participen en Licitaciones Públicas, Concursos de Precios y Contrataciones Directas de AUBASA.

### 3. ETAPAS DEL PROCESO DE EVALUACIÓN
1. **Requerimiento del Cuestionario de Integridad:** El oferente debe presentar el Formulario de Debida Diligencia junto con la oferta técnica/económica.
2. **Verificación de Beneficiario Final (UBO):** Identificación de personas humanas con más del 10% de participación o control efectivo.
3. **Screening en Listas Restrictivas:** Cruce con registros de PEP (UIF Res. 35/2023), sanciones del Banco Mundial, BID, AFIP apócrifos y causas penales por corrupción.
4. **Ponderación de 5 Dimensiones:** Transparencia societaria, historial judicial, vínculos con funcionarios, solidez de su programa de integridad y antecedentes técnicos.
5. **Dictamen de Riesgo y Vigencia:**
   - **Bajo (85-100 pts):** Aprobación simplificada. Renovación cada 24 meses.
   - **Medio (65-84 pts):** Aprobación estándar con cláusula reforzada de auditoría. Renovación anual.
   - **Alto (<65 pts o PEP):** Dictamen Especial fundado y elevación al Directorio para autorización expresa.

### 4. REGISTROS ASOCIADOS (Cl. 7.5)
- Legajo Digital de Debida Diligencia y Certificado de Aptitud Ética (REG-SGAS-02).`
  },

  // 5. POE-03: CONFLICTOS DE INTERÉS
  {
    id: 'POE-SGAS-03',
    codigo: 'POE-SGAS-03',
    clausulaIso: 'Cl. 7.2',
    titulo: 'Procedimiento Operativo: Declaración y Gestión de Conflictos de Intereses',
    categoria: 'Conducta e Integridad',
    descripcion: 'Circuito de presentación de declaraciones juradas, detección de vínculos societarios o familiares y protocolo de abstención obligatoria.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: CONFLICTOS DE INTERESES
**Código:** POE-SGAS-03 | **Versión:** 1.3 | **Norma:** ISO 37001:2016 (Cl. 7.2)

---

### 1. OBJETIVO
Prevenir, identificar y resolver situaciones donde los intereses personales, económicos, laborales o familiares de los colaboradores de AUBASA colisionen con los intereses y la objetividad de la empresa.

### 2. ALCANCE
Directorio, Gerencias, personal de Compras, Comisiones Evaluadoras de Licitaciones, Inspectores de Obras y Jefes de Estaciones de Peaje.

### 3. TIPOLOGÍAS DE DECLARACIÓN
1. **Declaración Anual Preventiva:** Obligatoria en el mes de marzo para todo el personal alcanzado.
2. **Declaración Específica por Proceso Licitatorio:** Obligatoria para cada miembro de Comisión Evaluadora previo a la apertura de sobres.
3. **Declaración Sobrevenida:** Dentro de las 48 horas de acaecido un hecho que genere un potencial conflicto.

### 4. PROTOCOLO DE ABSTENCIÓN Y RESOLUCIÓN
- Quien declare un conflicto real o aparente quedará automáticamente **apartado e inhibido** de intervenir en la evaluación, adjudicación, inspección o pago vinculado.
- El Oficial de Cumplimiento registrará la abstención y designará al reemplazante correspondiente.

### 5. REGISTROS ASOCIADOS (Cl. 7.5)
- Registro Central de Declaraciones Juradas de Conflicto de Interés (REG-SGAS-03).`
  },

  // 6. POE-04: REGALOS Y HOSPITALIDAD
  {
    id: 'POE-SGAS-04',
    codigo: 'POE-SGAS-04',
    clausulaIso: 'Cl. 8.7',
    titulo: 'Procedimiento Operativo: Gestión de Regalos, Hospitalidad, Donaciones y Cortesías',
    categoria: 'Conducta e Integridad',
    descripcion: 'Reglas para el reporte, registro, evaluación y destino final de atenciones, presentes corporativos o invitaciones de terceros.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: REGALOS Y HOSPITALIDAD
**Código:** POE-SGAS-04 | **Versión:** 1.5 | **Norma:** ISO 37001:2016 (Cl. 8.7)

---

### 1. PRINCIPIO GENERAL
Ningún colaborador de AUBASA podrá solicitar ni recibir dinero, bienes, viajes, servicios gratuitos ni favores de proveedores o contratistas.

### 2. CORTESÍAS INSTITUCIONALES PERMITIDAS
Únicamente obsequios de cortesía comercial que cumplan simultáneamente:
- Valor comercial menor a **USD 50** (o su equivalente en ARS).
- Sean artículos promocionales corporativos (calendarios, bolígrafos, cuadernos con logo).
- No sean entregados durante licitaciones activas o procesos de fiscalización de obras.

### 3. CIRCUITO DE DECLARACIÓN
1. Todo regalo o invitación que supere los USD 20 debe declararse ante el Oficial de Cumplimiento en un plazo no mayor a **48 horas**.
2. **Dictamen del Oficial de Cumplimiento:**
   - *Aceptación Protocolar:* Si cumple los requisitos y no compromete la imparcialidad.
   - *Rechazo / Devolución:* Con nota formal de agradecimiento y copia de la política.
   - *Donación Institucional:* Para comestibles o artículos que no puedan ser devueltos, remitidos a comedores comunitarios o escuelas técnicas de la traza vial.

### 4. REGISTROS ASOCIADOS (Cl. 7.5)
- Libro Oficial de Registro de Regalos e Invitaciones (REG-SGAS-04).`
  },

  // 7. POE-05: CONTROLES FINANCIEROS
  {
    id: 'POE-SGAS-05',
    codigo: 'POE-SGAS-05',
    clausulaIso: 'Cl. 8.3',
    titulo: 'Procedimiento Operativo: Controles Financieros en Pagos, Desembolsos y Tesorería Central',
    categoria: 'Controles Financieros',
    descripcion: 'Reglas de segregación de funciones (4 Ojos), doble firma digital bancaria en pagos a contratistas, orden cronológico FIFO y validación previa de cuentas beneficiarias.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: CONTROLES FINANCIEROS
**Código:** POE-SGAS-05 | **Versión:** 2.1 | **Norma:** ISO 37001:2016 (Cl. 8.3)

---

### 1. OBJETIVO
Garantizar la transparencia, trazabilidad, segregación de funciones y control estricto en la aprobación y ejecución de pagos y transferencias bancarias a proveedores de bienes y obras viales de la Autopista BALP.

### 2. CIRCUITO DE PAGOS Y SEGREGACIÓN DE FUNCIONES (PRINCIPIO DE 4 OJOS)
1. **Área Solicitante:** Emite la solicitud acompañada del Certificado de Obra o Remito de Insumos conformado e informe de inspección.
2. **Contabilidad y Verificación:** Verifica la factura electrónica en AFIP, situación fiscal en ARBA, constancia de no retención y CBU declarado en el legajo de Debida Diligencia.
3. **Gerencia de Finanzas:** Confecciona la orden de pago bancaria conforme a orden cronológico estricto de vencimiento (criterio FIFO).
4. **Directorio / Gerencia General:** Autoriza y firma electrónicamente la transferencia con token de doble factor y doble firma mancomunada.

### 3. CONTROLES EN TRANSFERENCIAS Y CONCILIACIONES BANCARIAS
- Doble firma electrónica bancaria obligatoria para todos los desembolsos sin excepción.
- Validación cruzada de CBU y titularidad de cuenta bancaria contra el padrón de proveedores homologados (debida diligencia Cl. 8.2).
- Prohibición absoluta de pagos en efectivo o cheques al portador a contratistas o proveedores.
- Conciliación bancaria diaria y mensual automatizada supervisada por Auditoría Interna.

### 4. REGISTROS ASOCIADOS (Cl. 7.5)
- Actas de Control Financiero, Órdenes de Pago y Comprobantes de Transferencia Bancaria (REC-05 / REG-SGAS-05).`
  },

  // 8. POE-06: CONTROLES NO FINANCIEROS EN OBRAS
  {
    id: 'POE-SGAS-06',
    codigo: 'POE-SGAS-06',
    clausulaIso: 'Cl. 8.4',
    titulo: 'Procedimiento Operativo: Controles No Financieros en Licitaciones y Certificación de Obras Viales',
    categoria: 'Operación y Obras',
    descripcion: 'Protocolo de extracción y ensayo ciego de probetas de asfalto, cubicación métrica in situ y cláusulas de integridad en pliegos.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: CONTROLES NO FINANCIEROS EN OBRAS
**Código:** POE-SGAS-06 | **Versión:** 1.5 | **Norma:** ISO 37001:2016 (Cl. 8.4)

---

### 1. OBJETIVO
Evitar fraudes técnicos, adulteración de mezclas asfálticas o sobrecertificación de volúmenes de obra en la Autopista BsAs-La Plata (km 0 a km 50) y sus distribuidores.

### 2. PROTOCOLO DE EXTRACCIÓN Y ENSAYO DE PROBETAS DE ASFALTO
1. **Calado de Testigos:** La extracción de probetas cilíndricas en calzada se realiza en presencia de la Inspección de AUBASA y el Contratista.
2. **Rotulado Ciego con Código QR:** Las muestras se anonimizan sin membrete de la empresa para evitar sesgos en el laboratorio.
3. **Laboratorios Universitarios Certificados:** Las probetas se remiten a LEMIT (CIC), UNLP o UBA para ensayos de densidad Marshall, estabilidad y espesor de capa de rodamiento.
4. **Criterio de Rechazo:** Si el espesor medido es inferior a la tolerancia técnica del pliego (ej. < 4.75 cm para capa de 5.0 cm), el certificado queda **automáticamente bloqueado** y se exige la repavimentación del tramo a exclusivo costo del contratista.

### 3. COMISIONES EVALUADORAS DE LICITACIONES
- Integración multidisciplinaria (Técnica, Legal, Compras) de al menos 3 profesionales.
- Preevaluación a ciegas de las ofertas técnicas antes de la apertura del sobre económico.

### 4. REGISTROS ASOCIADOS (Cl. 7.5)
- Protocolos de Ensayos Técnicos de Calidad de Asfalto (REG-SGAS-06).`
  },

  // 9. POE-07: CANAL ÉTICO E INVESTIGACIONES
  {
    id: 'POE-SGAS-07',
    codigo: 'POE-SGAS-07',
    clausulaIso: 'Cl. 8.9 & 8.10',
    titulo: 'Procedimiento Operativo: Gestión del Canal Ético, Denuncias e Investigaciones Internas',
    categoria: 'Canal Ético y Sanciones',
    descripcion: 'Circuito de recepción anónima cifrada, triaje de admisibilidad en 5 días, investigación preliminar en 30 días y derivación penal.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: CANAL ÉTICO E INVESTIGACIONES
**Código:** POE-SGAS-07 | **Versión:** 2.0 | **Norma:** ISO 37001:2016 (Cl. 8.9 & 8.10)

---

### 1. OBJETIVO
Asegurar canales confidenciales y anónimos para la denuncia de conductas contrarias a la ética y establecer el método riguroso de investigación interna sin represalias.

### 2. CANALES HABILITADOS
- Portal Web Seguro con Token Cifrado.
- Correo electrónico directo: *canal.etico@aubasa.com.ar*.
- Teléfono gratuito de Integridad: *0800-INTEGRIDAD*.

### 3. ETAPAS Y PLAZOS DE LA INVESTIGACIÓN
1. **Admisión y Triaje (Máximo 5 días hábiles):** El Oficial de Cumplimiento califica la denuncia como admisible, requiere ampliación o la desestima fundadamente.
2. **Plan de Investigación (Máximo 30 días corridos):** Relevamiento de auditoría contable, revisión de correos corporativos autorizados y entrevistas confidenciales.
3. **Informe Final de Hallazgos y Dictamen:**
   - Si no se comprueban irregularidades: Archivo fundado del expediente.
   - Si se comprueba soborno o fraude: Remisión al Comité de Integridad y Directorio para despido con causa, rescisión contractual y formulación de **denuncia penal ante la Fiscalía de Delitos Complejos**.

### 4. GARANTÍA DE NO REPRESALIAS
AUBASA protege irrestrictamente al denunciante de buena fe contra traslados, sanciones o perjuicios laborales.

### 5. REGISTROS ASOCIADOS (Cl. 7.5)
- Expedientes del Canal Ético y Dictámenes de Cierre (REG-SGAS-07).`
  },

  // 10. POE-08: AUDITORÍAS INTERNAS
  {
    id: 'POE-SGAS-08',
    codigo: 'POE-SGAS-08',
    clausulaIso: 'Cl. 9.2 & 9.3',
    titulo: 'Procedimiento Operativo: Auditorías Internas Antisoborno y Revisiones por la Dirección',
    categoria: 'Auditoría y Revisión',
    descripcion: 'Pautas para el programa anual de auditorías internas, independencia de auditores, muestreo documental y revisión formal del Directorio.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: AUDITORÍAS INTERNAS Y REVISIÓN
**Código:** POE-SGAS-08 | **Versión:** 1.3 | **Norma:** ISO 37001:2016 (Cl. 9.2 & 9.3)

---

### 1. OBJETIVO
Verificar que el SGAS es conforme con los requisitos de la norma ISO 37001:2016, las políticas de AUBASA y se implementa y mantiene eficazmente.

### 2. PROGRAMA ANUAL DE AUDITORÍA
- Se auditarán todos los procesos de AUBASA al menos una vez cada 12 meses.
- Los auditores internos deben ser independientes del proceso auditado (un auditor no audita su propio trabajo).
- Enfoque basado en riesgos: Procesos de alto riesgo (Contrataciones y Obras) tendrán muestreo ampliado.

### 3. REVISIÓN POR LA DIRECCIÓN (CL. 9.3)
El Directorio de AUBASA sesionará al menos semestralmente para revisar:
- Estado de acciones de revisiones previas y cambios en riesgos.
- Desempeño del SGAS: No conformidades, resultados de auditorías y denuncias del Canal Ético.
- Eficacia de las capacitaciones y necesidad de recursos adicionales.
- Oportunidades de mejora continua.

### 4. REGISTROS ASOCIADOS (Cl. 7.5)
- Informes de Auditoría Interna y Actas de Revisión de la Dirección (REG-SGAS-08).`
  },

  // 11. POE-09: INFORMACIÓN DOCUMENTADA
  {
    id: 'POE-SGAS-09',
    codigo: 'POE-SGAS-09',
    clausulaIso: 'Cl. 7.5',
    titulo: 'Procedimiento Operativo: Control de Información Documentada y Custodia de Evidencias',
    categoria: 'Soporte y Control',
    descripcion: 'Reglas de codificación documental, control de cambios, retención mínima de 10 años y trazabilidad criptográfica SHA-256.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: INFORMACIÓN DOCUMENTADA
**Código:** POE-SGAS-09 | **Versión:** 1.2 | **Norma:** ISO 37001:2016 (Cl. 7.5)

---

### 1. OBJETIVO
Definir las pautas de creación, actualización, aprobación, distribución, archivo y protección de todos los documentos y registros del SGAS de AUBASA.

### 2. CODIFICACIÓN INSTITUCIONAL
- **MAN:** Manuales de Gestión.
- **POL:** Políticas Institucionales.
- **POE:** Procedimientos Operativos Estándar.
- **REG:** Registros y Formularios de Evidencia.
- **CLA:** Cláusulas Legales Tipo para Pliegos.

### 3. CUSTODIA Y TRAZABILIDAD CRIPTOGRÁFICA
- Todo registro de evidencia digital cargado en el sistema SGAS contará con cálculo de **Hash SHA-256** para evitar alteraciones posteriores.
- El plazo mínimo de retención de registros de obras viales, pagos y debida diligencia es de **10 años** (en concordancia con la prescripción penal).

### 4. REGISTROS ASOCIADOS (Cl. 7.5)
- Maestro de Documentos Controlados y Listado de Registros Auditables.`
  },

  // 12. POE-10: NO CONFORMIDADES Y CAPA
  {
    id: 'POE-SGAS-10',
    codigo: 'POE-SGAS-10',
    clausulaIso: 'Cl. 10.1 & 10.2',
    titulo: 'Procedimiento Operativo: No Conformidades, Causa Raíz y Acciones Correctivas (CAPA)',
    categoria: 'Mejora Continua',
    descripcion: 'Metodología de los 5 Porqués para investigar desvíos, implementar acciones correctivas inmediatas y evaluar eficacia a 60 días.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: NO CONFORMIDADES Y CAPA
**Código:** POE-SGAS-10 | **Versión:** 1.4 | **Norma:** ISO 37001:2016 (Cl. 10.1 & 10.2)

---

### 1. OBJETIVO
Tratar las no conformidades detectadas en auditorías o en la operación diaria, eliminar su causa raíz y asegurar que los desvíos no se repitan.

### 2. METODOLOGÍA DE ANÁLISIS DE CAUSA RAÍZ (5 PORQUÉS)
Ante cualquier No Conformidad o falla de control:
1. Reaccionar de inmediato para controlar y corregir las consecuencias (Acción Inmediata).
2. Investigar la causa raíz mediante el método de los **5 Porqués** o Diagrama de Ishikawa.
3. Diseñar e implementar un **Plan de Acción Correctiva** con responsable y plazo determinado (máximo 45 días).
4. **Verificación de Eficacia (60 días):** Auditoría de seguimiento para comprobar que la acción eliminó la causa del desvío.

### 3. REGISTROS ASOCIADOS (Cl. 7.5)
- Fichas de No Conformidad y Acción Correctiva (REG-SGAS-10).`
  },

  // 13. CLÁUSULA PLIEGOS VIALES
  {
    id: 'CLA-SGAS-01',
    codigo: 'CLA-SGAS-01',
    clausulaIso: 'Cl. 8.6',
    titulo: 'Cláusula Anticorrupción Tipo para Pliegos y Contratos de Obra Vial',
    categoria: 'Contrataciones y Pliegos',
    descripcion: 'Texto legal modelo de inserción obligatoria en pliegos de bases y condiciones de AUBASA.',
    contenidoMarkdown: `# CLÁUSULA ANTISOBORNO TIPO PARA PLIEGOS Y CONTRATOS DE OBRA
**Código:** CLA-SGAS-01 | **Norma:** ISO 37001:2016 (Cl. 8.6) | **Ley:** 27.401

---

**CLÁUSULA VIGÉSIMO PRIMERA: COMPROMISO ANTICORRUPCIÓN Y ANTISOBORNO (ISO 37001).**
1. **Compromiso de Integridad:** EL CONTRATISTA declara y garantiza que ni él, ni sus directores, accionistas, dependientes, subcontratistas o agentes han ofrecido, pagado, prometido o solicitado directa o indirectamente suma de dinero alguna, dádiva, beneficio indebido o comisión a funcionarios o empleados de AUBASA o del Estado Provincial.
2. **Prohibición de Soborno:** EL CONTRATISTA se compromete a abstenerse de realizar conductas tipificadas en los Arts. 256, 258 y 265 del Código Penal y en la Ley 27.401.
3. **Facultad de Auditoría:** AUBASA se reserva el derecho de auditar los libros contables, remitos de cantera y registros de subcontratación de EL CONTRATISTA ante sospechas fundadas de irregularidades.
4. **Rescisión con Causa y Penalidades:** El quebrantamiento de esta cláusula facultará a AUBASA a declarar la **RESCISIÓN INMEDIATA Y AUTOMÁTICA DEL CONTRATO POR CULPA EXCLUSIVA DEL CONTRATISTA**, con pérdida de la garantía de cumplimiento de contrato, inhabilitación por 5 años en el Registro de Proveedores y reclamo por los daños y perjuicios ocasionados a la red vial.`
  },

  // 14. CLÁUSULA PEAJES Y TELEPASE
  {
    id: 'CLA-SGAS-02',
    codigo: 'CLA-SGAS-02',
    clausulaIso: 'Cl. 8.6',
    titulo: 'Cláusula de Transparencia y Auditoría para Contratos de Peaje y TelePASE',
    categoria: 'Contrataciones y Pliegos',
    descripcion: 'Cláusula anticorrupción específica para proveedores de tecnología, software de peaje y medios de pago.',
    contenidoMarkdown: `# CLÁUSULA DE INTEGRIDAD PARA TECNOLOGÍA DE PEAJES Y TELEPASE
**Código:** CLA-SGAS-02 | **Norma:** ISO 37001:2016 (Cl. 8.6) | **Ley:** 27.401

---

**CLÁUSULA DÉCIMA SÉPTIMA: INTEGRIDAD EN SISTEMAS TRANSACCIONALES Y TELEPASE.**
1. **Trazabilidad de Transacciones:** EL PROVEEDOR garantiza que el software y hardware de peaje no posee puertas traseras ni rutinas que permitan omitir o alterar registros de tránsito o recaudación.
2. **Auditoría de Algoritmos:** AUBASA podrá someter el código y las bases de datos a peritajes informáticos de integridad sin previo aviso.
3. **Declaración PEP:** EL PROVEEDOR declara bajo juramento no poseer entre sus accionistas o personal clave a funcionarios públicos del área de transporte o vialidad.`
  },

  // 15. POLÍTICA DE REGALOS Y HOSPITALIDAD
  {
    id: 'POL-SGAS-02',
    codigo: 'POL-SGAS-02',
    clausulaIso: 'Cl. 8.7',
    titulo: 'Política de Regalos, Hospitalidad, Donaciones y Atenciones Comerciales',
    categoria: 'Conducta e Integridad',
    descripcion: 'Declaración institucional de umbrales, prohibiciones y circuito de declaración de obsequios, viajes, donaciones y cortesías de terceros.',
    contenidoMarkdown: `# POLÍTICA DE REGALOS, HOSPITALIDAD, DONACIONES Y ATENCIONES COMERCIALES
**Código:** POL-SGAS-02 | **Versión:** 1.0 | **Aprobación:** Acta de Directorio Nº 413
**Norma:** ISO 37001:2016 (Cláusula 8.7) | **Marco Legal:** Ley 27.401, Art. 256 y 258 C.P.

---

### 1. PRINCIPIO GENERAL DE PROHIBICIÓN
Ningún colaborador, directivo o agente de **AUBASA** podrá solicitar ni aceptar dinero en efectivo, tarjetas de regalo, transferencias, viajes, alojamiento, servicios gratuitos, comisiones ni ningún otro beneficio de proveedores, contratistas viales, oferentes o gestores.

### 2. UMBRALES Y EXCEPCIONES
- **Cortesías permitidas:** Únicamente artículos promocionales institucionales con logo (calendarios, bolígrafos, cuadernos) de valor comercial menor a **USD 20**.
- **Reporte obligatorio:** Todo obsequio o invitación que supere **USD 20** debe declararse ante el Oficial de Cumplimiento dentro de las **48 horas**.
- **Rechazo obligatorio:** Todo regalo, viaje u hospitalidad que supere **USD 50** o que provenga de un contratista bajo fiscalización activa o durante un proceso licitatorio o de certificación de obra.

### 3. CIRCUITO DE RESOLUCIÓN
1. **Declaración:** El colaborador completa el Formulario de Declaración de Regalos (REG-SGAS-04).
2. **Dictamen del Oficial de Cumplimiento:**
   - *Aceptación protocolar:* Si cumple los umbrales y no compromete la imparcialidad.
   - *Rechazo y devolución:* Con nota formal de agradecimiento y copia de la presente política.
   - *Donación institucional:* Para comestibles o artículos no devolubles, remitidos a comedores comunitarios o escuelas técnicas de la traza vial.

### 4. DONACIONES Y PATROCINIOS
Toda donación o patrocinio de AUBASA requiere aprobación expresa del Oficial de Cumplimiento y del Directorio, con identificación del destinatario final y prohibición de todo uso político-partidario.

---
**Firma:** Oficial de Cumplimiento & Directorio de AUBASA S.A.`
  },

  // 16. POLÍTICA DE PROTECCIÓN AL DENUNCIANTE
  {
    id: 'POL-SGAS-03',
    codigo: 'POL-SGAS-03',
    clausulaIso: 'Cl. 8.9',
    titulo: 'Política de Protección al Denunciante y No Represalias',
    categoria: 'Canal Ético y Sanciones',
    descripcion: 'Garantías de confidencialidad, anonimato y prohibición de represalias para quienes denuncien de buena fe hechos de soborno o fraude.',
    contenidoMarkdown: `# POLÍTICA DE PROTECCIÓN AL DENUNCIANTE Y NO REPRESALIAS
**Código:** POL-SGAS-03 | **Versión:** 1.0 | **Aprobación:** Acta de Directorio Nº 414
**Norma:** ISO 37001:2016 (Cláusula 8.9) | **Marco Legal:** Ley 27.401, Ley 25.188

---

### 1. OBJETO
Garantizar que toda persona física o jurídica que denuncie de buena fe o sobre la base de una sospecha razonable un hecho de soborno, fraude o incumplimiento del SGAS, sea protegida contra cualquier forma de represalia.

### 2. GARANTÍAS DEL DENUNCIANTE
1. **Confidencialidad absoluta:** La identidad del denunciante se resguarda bajo secreto y acceso restringido al Oficial de Cumplimiento.
2. **Anonimato opcional:** Se admite la denuncia 100% anónima con token cifrado de seguimiento.
3. **Tolerancia cero a represalias:** Quedan prohibidos los traslados, despidos, sanciones, hostigamiento o cualquier perjuicio laboral contra el denunciante.
4. **Presunción de buena fe:** Las denuncias de buena fe no generan responsabilidad, aun cuando la investigación concluya sin mérito.

### 3. CONSECUENCIAS DE LA REPRESALIA
Cualquier represalia contra un denunciante constituye **falta gravísima** sancionada con despido con causa inmediato y, en su caso, denuncia penal conforme la Ley 27.401.

### 4. FALSAS DENUNCIAS
Las denuncias maliciosas o manifiestamente falsas serán desestimadas fundadamente y podrán dar lugar a las acciones disciplinarias correspondientes contra el denunciante de mala fe.

---
**Firma:** Oficial de Cumplimiento & Directorio de AUBASA S.A.`
  },

  // 17. POE-11: OBJETIVOS Y PLANIFICACIÓN
  {
    id: 'POE-SGAS-11',
    codigo: 'POE-SGAS-11',
    clausulaIso: 'Cl. 6.2',
    titulo: 'Procedimiento Operativo: Establecimiento y Seguimiento de Objetivos Antisoborno',
    categoria: 'Planificación y Objetivos',
    descripcion: 'Método para definir objetivos medibles, indicadores (KPIs), metas anuales y planes de logro alineados con la política antisoborno.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: OBJETIVOS ANTISOBORNO Y PLANIFICACIÓN
**Código:** POE-SGAS-11 | **Versión:** 1.0 | **Norma:** ISO 37001:2016 (Cl. 6.2)

---

### 1. OBJETIVO
Establecer objetivos antisoborno medibles y coherentes con la Política Institucional (POL-SGAS-01), con indicadores, metas y responsables para su seguimiento.

### 2. OBJETIVOS INSTITUCIONALES DE REFERENCIA
1. **100%** de pliegos y contratos con cláusula antisoborno (CLA-SGAS-01) incorporada.
2. **95%** del personal en puestos de riesgo capacitado y certificado anualmente.
3. **100%** de contratistas críticos con debida diligencia vigente.
4. **100%** de pagos y transferencias a contratistas con doble firma electrónica (principio 4 ojos).

### 3. CICLO DE GESTIÓN
1. **Definición anual (enero):** Cada Gerencia propone sus objetivos y KPIs con el Oficial de Cumplimiento.
2. **Aprobación:** El Directorio aprueba el Tablero de Objetivos Antisoborno del ejercicio.
3. **Seguimiento trimestral:** Revisión de avance en el informe de indicadores (Cl. 9.1).
4. **Cierre anual:** Evaluación de logro, desvíos y lecciones aprendidas en la Revisión por la Dirección (Cl. 9.3).

### 4. REGISTROS ASOCIADOS (Cl. 7.5)
- Tablero de Objetivos y KPIs Antisoborno (REG-SGAS-11).`
  },

  // 18. POE-12: COMUNICACIÓN
  {
    id: 'POE-SGAS-12',
    codigo: 'POE-SGAS-12',
    clausulaIso: 'Cl. 7.4',
    titulo: 'Procedimiento Operativo: Comunicación Interna y Externa del SGAS',
    categoria: 'Soporte y Control',
    descripcion: 'Pautas de difusión de la política antisoborno, del Canal Ético y de los resultados del SGAS a personal, contratistas y partes interesadas.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: COMUNICACIÓN DEL SGAS
**Código:** POE-SGAS-12 | **Versión:** 1.0 | **Norma:** ISO 37001:2016 (Cl. 7.4)

---

### 1. OBJETIVO
Determinar qué, cuándo, a quién y cómo se comunican la política antisoborno, el Canal Ético y el desempeño del SGAS de AUBASA.

### 2. COMUNICACIÓN INTERNA
- Inducción obligatoria a todo nuevo ingreso sobre la Política POL-SGAS-01 y el Canal Ético.
- Cartelería de tolerancia cero en cabinas de peaje, oficinas y obradores.
- Publicación en intranet y recordatorio en recibos de sueldo con las vías de denuncia.

### 3. COMUNICACIÓN EXTERNA
- Carta de adhesión a la Política y Código de Conducta de Terceros para contratistas y proveedores.
- Publicación de la política en el sitio web institucional.
- Comunicación de resultados del SGAS a las partes interesadas (Ministerio de Infraestructura PBA) conforme requisitos legales.

### 4. CONTROL DE LA INFORMACIÓN
Toda comunicación del SGAS es revisada por el Oficial de Cumplimiento y, cuando corresponda, por Asuntos Jurídicos antes de su emisión.

### 5. REGISTROS ASOCIADOS (Cl. 7.5)
- Registro de Comunicaciones del SGAS y acuses de difusión (REG-SGAS-12).`
  },

  // 19. POE-13: EMPLEO Y DEBIDA DILIGENCIA DE PERSONAL
  {
    id: 'POE-SGAS-13',
    codigo: 'POE-SGAS-13',
    clausulaIso: 'Cl. 7.2',
    titulo: 'Procedimiento Operativo: Empleo, Competencia y Debida Diligencia del Personal en Puestos Expuestos',
    categoria: 'Conducta e Integridad',
    descripcion: 'Criterios de selección, declaraciones juradas y evaluación de antecedentes del personal en puestos de riesgo de soborno.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: EMPLEO Y DEBIDA DILIGENCIA DE PERSONAL
**Código:** POE-SGAS-13 | **Versión:** 1.0 | **Norma:** ISO 37001:2016 (Cl. 7.2)

---

### 1. OBJETIVO
Asegurar que el personal que ocupa puestos expuestos al riesgo de soborno (compradores, tesoreros, cajeros, inspectores de obra, comisiones evaluadoras) reúna competencia e integridad comprobadas.

### 2. PUESTOS EXPUESTOS
1. Gerentes y personal de Compras y Contrataciones.
2. Tesorería, pagos y supervisión de recaudación de peajes.
3. Inspectores de obra, directores técnicos y laboratorio.
4. Miembros de Comisiones Evaluadoras de Licitaciones.

### 3. CIRCUITO DE INCORPORACIÓN
1. **Selección:** Verificación de antecedentes penales, laborales y declaración jurada patrimonial previa a la designación.
2. **Declaraciones Juradas de Conflicto de Interés:** Anual obligatoria y específica por proceso (POE-SGAS-03).
3. **Formación y certificación:** Aprobación de los cursos obligatorios del puesto (Cl. 7.3).
4. **Evaluación de desempeño:** Incluye criterios de integridad y cumplimiento antisoborno.

### 4. MEDIDAS DISCIPLINARIAS
El incumplimiento de las normas de integridad habilita sumario, despido con causa y denuncia penal conforme POL-SGAS-01.

### 5. REGISTROS ASOCIADOS (Cl. 7.5)
- Legajo de Debida Diligencia del Personal y Declaraciones Juradas (REG-SGAS-03 y REG-SGAS-13).`
  },

  // 20. POE-14: SEGUIMIENTO, MEDICIÓN Y REVISIÓN DE CUMPLIMIENTO
  {
    id: 'POE-SGAS-14',
    codigo: 'POE-SGAS-14',
    clausulaIso: 'Cl. 9.1 & 9.4',
    titulo: 'Procedimiento Operativo: Seguimiento, Medición, Análisis y Revisión por la Función de Cumplimiento',
    categoria: 'Auditoría y Revisión',
    descripcion: 'Metodología de monitoreo de KPIs, encuestas de clima ético y revisión periódica del Oficial de Cumplimiento sobre la eficacia del SGAS.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: SEGUIMIENTO, MEDICIÓN Y REVISIÓN DE CUMPLIMIENTO
**Código:** POE-SGAS-14 | **Versión:** 1.0 | **Norma:** ISO 37001:2016 (Cl. 9.1 & 9.4)

---

### 1. OBJETIVO
Definir los mecanismos de seguimiento y medición del desempeño del SGAS y la revisión periódica de su eficacia por parte de la Función de Cumplimiento Antisoborno.

### 2. INDICADORES DE SEGUIMIENTO (Cl. 9.1)
- Cobertura de cláusula antisoborno en pliegos (%).
- Personal de riesgo capacitado y certificado (%).
- Debida diligencia de contratistas vigente (%).
- Denuncias recibidas, tiempos de triaje y tasa de confirmación.
- Cumplimiento de doble firma en pagos y resultados de auditorías internas.

### 3. HERRAMIENTAS DE MEDICIÓN
- Tablero trimestral de KPIs del SGAS.
- Encuesta anual de clima ético y percepción de integridad.
- Benchmarking con organismos viales y empresas del sector.

### 4. REVISIÓN POR LA FUNCIÓN DE CUMPLIMIENTO (Cl. 9.4)
El Oficial de Cumplimiento elaborará al menos semestralmente un informe que evalúe la idoneidad, adecuación y eficacia del SGAS, con recomendaciones elevadas al Directorio.

### 5. REGISTROS ASOCIADOS (Cl. 7.5)
- Informes de KPIs y del Oficial de Cumplimiento (REG-SGAS-14).`
  },

  // 21. POE-15: INSUFICIENCIA DE CONTROLES
  {
    id: 'POE-SGAS-15',
    codigo: 'POE-SGAS-15',
    clausulaIso: 'Cl. 8.8',
    titulo: 'Procedimiento Operativo: Gestión de la Insuficiencia de Controles Antisoborno',
    categoria: 'Mejora Continua',
    descripcion: 'Protocolo para detectar, reportar y compensar los controles antisoborno insuficientes o ausentes, con medidas temporales y plan de remediación.',
    contenidoMarkdown: `# PROCEDIMIENTO OPERATIVO ESTÁNDAR: GESTIÓN DE LA INSUFICIENCIA DE CONTROLES
**Código:** POE-SGAS-15 | **Versión:** 1.0 | **Norma:** ISO 37001:2016 (Cl. 8.8)

---

### 1. OBJETIVO
Asegurar que, ante un control antisoborno ausente, deficiente o superado, se adopten de inmediato medidas alternativas que mantengan el riesgo bajo control hasta su remediación definitiva.

### 2. DETECCIÓN
La insuficiencia de un control puede detectarse por: auditorías internas, denuncias del Canal Ético, resultados de indicadores (Cl. 9.1), revisiones de cumplimiento (Cl. 9.4) o incidentes operativos.

### 3. TRATAMIENTO INMEDIATO
1. **Contención:** Aplicar un control compensatorio transitorio (ej. doble autorización manual ante la caída del bloqueo automático en ERP).
2. **Evaluación de impacto:** Determinar los procesos, contratos o tramos de obra alcanzados.
3. **Remediación:** Diseñar el plan de corrección definitivo con responsable y plazo máximo de 45 días.
4. **Verificación de eficacia:** Auditoría de seguimiento a los 60 días (POE-SGAS-10).

### 4. REGISTROS ASOCIADOS (Cl. 7.5)
- Ficha de Insuficiencia de Control y Plan de Remediación (REG-SGAS-15).`
  }
];
