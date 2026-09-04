# AUBASA SGAS - Sistema de Gestión Antisoborno ISO 37001

Sistema integral y especialista para la implementación, operación y certificación del **Sistema de Gestión Antisoborno (SGAS)** bajo la norma **ISO 37001:2016/2025**, articulado con la **Trilogía de Integridad Corporativa**:
- **ISO 37001:2025**: Sistemas de Gestión Antisoborno (Requisitos y Control Operacional).
- **UNE-ISO 37002:2021**: Sistemas de Gestión de la Denuncia de Irregularidades (Canal Ético y Protección al Denunciante).
- **ISO/TS 37008:2023**: Investigaciones Internas en Organizaciones (Protocolos de Triaje y Evidencia Forense).

---

## 🛣️ Alcance del Sistema (Concesión BALP - 50 km)

El alcance del SGAS está estrictamente delimitado a la **Autopista Buenos Aires - La Plata (km 0 al km 50)** sobre tres pilares operativos de alto impacto:

1. **Contrataciones y Compras:**
   - Pliegos técnicos neutrales y comisiones evaluadoras interdisciplinarias.
   - Debida diligencia obligatoria en proveedores y contratistas (Cl. 8.2).
   - Inclusión universal de la Cláusula Antisoborno (`CLA-SGAS-01`).

2. **Pagos y Tesorería Central (Cl. 8.3):**
   - Principio de 4 ojos con doble firma electrónica bancaria mediante token en transferencias.
   - Orden cronológico estricto de pago (criterio FIFO).
   - Verificación de titularidad de CBU homologado contra legajos de debida diligencia.
   - Prohibición absoluta de desembolsos en efectivo a contratistas.

3. **Planificación y Ejecución de Obras Viales (Cl. 8.4):**
   - Control de avance, cubicación métrica e inspección in situ de calzada y banquinas.
   - Ensayos de laboratorio externos e independientes de probetas de asfalto y hormigón (**LEMIT / CIC PBA / UNLP**).

---

## 🚀 Tecnologías Utilizadas

- **Frontend:** React 19, Vite 8, Tailwind CSS v4.
- **Iconografía:** Lucide React.
- **Base de Datos & Auth:** Supabase PostgreSQL con sincronización Cloud bidireccional (Push / Pull) y autenticación multiusuario.
- **Despliegue:** Optimizado para Vercel con `vercel.json` configurado para SPA.

---

## ⚙️ Instalación y Uso Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/SerM182/Implementacion-ISO37001.git
   cd Implementacion-ISO37001
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno (`.env`):**
   ```env
   VITE_SUPABASE_URL=https://pjjoulwltioxqbgukoti.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anon_supabase
   ```

4. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 🌐 Despliegue en Vercel

1. Importar el repositorio desde [Vercel](https://vercel.com).
2. Configurar las variables de entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en los ajustes de Vercel.
3. El proyecto se desplegará automáticamente.
