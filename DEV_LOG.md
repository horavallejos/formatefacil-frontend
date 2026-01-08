# Bitácora de Desarrollo - FormateFacil.online

Este documento sirve para registrar el estado del proyecto, las tareas pendientes y los cambios realizados, facilitando retomar el trabajo en cualquier momento.

## 📌 Estado Actual
- **Base de Datos:** Definida en Supabase (`schema_supabase.sql`). Tablas listas: `courses`, `leads`, `purchases`.
- **Datos:** Catálogo de cursos preparado en `courses.json` listo para poblar la DB.
- **Frontend:** Desplegado en Vercel. Conectado a Supabase. Hero Slider implementado.

## 🎯 Próximos Pasos (Roadmap)
1. [x] **Configuración Supabase:** Cliente creado en `supabaseClient.ts`.
2. [x] **Migración de Datos:** Confirmado que los datos ya existen en Supabase.
3. [x] **Conexión Frontend:** `Home` y `CourseDetail` ahora leen de Supabase y mapean los datos correctamente.
4. [x] **Captura de Leads:** Creado componente `LeadForm` conectado a tabla `leads` e integrado en Home.
5. [x] **Integración Hotmart:** Implementado modal con iframe en `CourseDetail` para checkout sin salir del sitio.
6. [x] **Rediseño Hero:** Implementado Slider dinámico leyendo cursos destacados (`featured`) de Supabase.
7. [ ] **Backend Integration:** Integrar API Python (FastAPI/Flask) existente.
8. [x] **Herramientas Internas:** Creado generador de JSON para temarios en `/herramientas/generador-json`.

## 📝 Historial de Cambios

### [Sesión Actual - Parte 20]
- **Herramientas:** `JsonGenerator` actualizado a "Course Builder" completo. Ahora soporta todos los campos del esquema (`syllabus`, `features`, `benefits`, precios, marketing, etc.).
- **Estrategia:** Se confirmó la evolución de esta herramienta hacia un **Panel de Control (Admin)** conectado a Supabase para gestión directa de cursos sin tocar SQL.
- **I+D:** Investigación preliminar sobre "Function Calling" y "Tool Use" para futuros agentes de IA (Business Intelligence).

### [Sesión Actual - Parte 19]
- **Feature (Marketing):** Agregado contador regresivo de 15 minutos ("Urgencia") dentro del Modal de Oferta en `CourseDetail`.
- **UX:** El contador parpadea en rojo para llamar la atención visualmente.

### [Sesión Actual - Parte 18]
- **Feature (Chatbot):** Implementada detección de bucles en `CourseChatbot`. Si la IA repite la misma respuesta 3 veces, redirige automáticamente a WhatsApp.
- **UX:** Mensaje de fallback amigable cuando se activa la redirección por bucle.

### [Sesión Actual - Parte 17]
- **Bugfix Crítico:** Se agregó el import faltante de `Sparkles` en `CourseDetail.tsx` que causaba un crash al abrir el modal de oferta.
- **Mejora UI:** Se definió la animación `fade-in` en `index.html` para que los modales (y su blur) aparezcan y desaparezcan suavemente.
- **Resolución:** Con el crash arreglado, el modal de oferta ahora aparece centrado ("la tarjeta que sube"), eliminando la necesidad de scrollear.

### [Sesión Actual - Parte 16]
- **UX (CourseDetail):** Reemplazado el scroll automático al revelar precio por un **Modal de Oferta** ("la tarjeta que sube").
- **UI:** El modal tiene fondo `backdrop-blur-sm` ("el blurcito") y muestra el precio desbloqueado claramente.
- **Diagnóstico:** Se identificó que el error de iframe se debe a `X-Frame-Options` en enlaces de marketplace de Hotmart.

### [Sesión Actual - Parte 15 (Cierre)]
- **Hito:** Se completaron 14 acciones de mejora en una sola sesión.
- **Roadmap:** Se añadió el Panel Admin (CRUD) como paso futuro para eliminar la dependencia del desarrollador en la carga de datos.
- **Consultoría:** Asesoramiento sobre estructura JSON para temarios y caracteres especiales.
- **Bonus:** Se implementó `JsonGenerator.tsx` para facilitar la creación de temarios sin errores de sintaxis.
 
### [Sesión Actual - Parte 14]
- **Confirmación:** Flujo de captura de leads y checkout con iframe funcionando correctamente en local.
- **DB Schema:** Se proporcionó el SQL final para añadir `original_price_usd`, `featured` y `syllabus` a la tabla `courses`.
- **Limpieza de Código:** Eliminado el script `seedCourses.ts` y el botón de "Admin" del `Footer`, ya que eran temporales.

### [Sesión Actual - Parte 13]
- **Bugfix (Links):** Corregido el mapeo de `hotmart_link` (DB) a `hotmartLink` (Frontend) en `Home` y `CourseDetail`. ¡Ahora los botones funcionan!
- **Feature (Leads):** Implementada captura de email obligatoria ("Lead Gate") antes de mostrar el checkout. Los datos se guardan en la tabla `leads`.
- **Feature (Syllabus):** Agregada columna `syllabus` (jsonb) a la tabla `courses` y renderizado dinámico en `CourseDetail`.
- **UX (Checkout):** Mejorado el botón de fallback del iframe para que sea más visible y confiable ("Abrir Checkout Seguro").

### [Sesión Actual - Parte 12]
- **UX/UI (Responsive):** Ajuste de tamaño de fuente en `CourseDetail` para evitar desbordes en títulos largos (ej: Microsoldadura).
- **UX/UI (Visuals):** Fondo global mejorado con gradiente radial y tarjetas con efectos de hover más luminosos.
- **Feature (Checkout):** Implementación de Modal con Iframe para Hotmart en `CourseDetail`. Incluye fallback "Abrir en nueva ventana" por si Hotmart bloquea el iframe.

### [Sesión Actual - Parte 11]
- **Arquitectura:** Confirmación de despliegue exitoso (Vercel + Railway + Supabase).
- **Feature (Hero Slider):** Se reemplazó el Hero estático de `Home.tsx` por un Slider dinámico que muestra los cursos con `featured: true`.
- **UX:** El slider rota automáticamente cada 6 segundos y tiene controles manuales.

### [Sesión Actual - Parte 10]
- **DB Schema:** Se generó script SQL para agregar columna `featured` (boolean) a la tabla `courses` (detectado en Resumen Ejecutivo).
- **Gestión de Proyecto:** Se decidió integrar el backend existente al espacio de trabajo actual para facilitar la conexión Frontend-Backend.
- **Recuperación de Código:** Se verificó `time_machine/formatefacil-backend`. El backend FastAPI está **implementado y listo** (incluye endpoints de cursos, leads y webhooks).

### [Sesión Actual - Parte 9]
- **Feature (Estrategia de Precios):** Implementada la lógica de "revelar precio" en `CourseDetail.tsx`.
- **DB Schema:** Se añadió la columna `original_price_usd` a la tabla `courses` para soportar precios tachados.
- **DB Data:** Se ejecutaron sentencias `UPDATE` para actualizar los cursos de Celulares y Construcción con la nueva información.
- **UX/UI:** Se modificó `CourseCard` para ocultar el precio y mostrar un CTA más fuerte, incentivando el clic.

### [Sesión Actual - Parte 8]
- **Análisis de Requerimientos:** Se revisaron `Resumen ejecutivo`, `ACTUALIZACIONES` y `Genio...S.md`. Se identificaron faltantes en backend y estrategia de precios.
- **Feature (Moneda):** Implementación de `fetchExchangeRate` en `currencyUtils` usando API pública para obtener tasas de cambio reales en lugar de estimadas.
- **Mejora UX:** `App.tsx` ahora actualiza la tasa de cambio silenciosamente al cargar.

### [Sesión Actual - Parte 7]
- **Refactorización:** Se implementó la sugerencia de usar un array (mapa de keywords) en `AIRecommender` para mejorar la lógica de recomendación, haciéndola más escalable y limpia.
- **Análisis:** Se confirmó que la detección de moneda por `TimeZone` es el comportamiento esperado y no un error.
- **Estado:** La IA simulada ahora tiene una lógica de palabras clave más robusta y mantenible.

### [Sesión Actual - Parte 6]
- **Depuración:** Identificados conflictos de configuración en `index.html` (Tailwind CDN vs Build local).
- **Estado:** La aplicación arranca correctamente y conecta a Supabase.
- **Acción:** Se instruye limpieza de `index.html` para eliminar advertencias de consola.

### [Sesión Actual - Parte 5]
- **Hotfix:** Actualización de `utils/supabaseClient.ts` para soportar `VITE_SUPABASE_KEY` o `VITE_SUPABASE_ANON_KEY`.
- **Diagnóstico:** Se identificó que el error de conexión se debe probablemente a falta de reinicio del servidor tras crear `.env.local`.

### [Sesión Actual - Parte 4]
- Creación de `components/LeadForm.tsx` para capturar emails en la tabla `leads`.
- Actualización de `pages/Home.tsx` para incluir una sección de contacto híbrida (WhatsApp + Formulario).

### [Sesión Actual - Parte 3]
- Corrección crítica en `AIRecommender`: Eliminada dependencia de `constants.ts` vacío.
- Corrección crítica en `Home` y `CourseDetail`: Mapeo de `course_id` (slug) a `id` para mantener compatibilidad con íconos y URLs.

### [Sesión Actual - Parte 2]
- Confirmación de entorno de trabajo (Local).
- Aclaración sobre `VITE_GEMINI_API_KEY` (Futura integración real de IA).
- Creación de `supabaseClient.ts` para conexión con DB.
- **Corrección:** Se confirmó que los datos YA existen en Supabase. Se descarta script de seed.
- Refactorización de `AIRecommender`: Ahora recibe `courses` como prop desde `Home` para trabajar con datos vivos de la DB en lugar de `constants.ts`.

### [Sesión Actual]
- Revisión de `schema_supabase.sql` y `courses.json`.
- Creación de `DEV_LOG.md` para organización.
- Validación de estructura de datos:
  - `courses.json` coincide con la tabla `public.courses`.
  - Nota: `features` y `benefits` son `jsonb` en SQL y Arrays en JSON (Correcto).
  - Nota: `price_usd` y `rating` están como strings en el JSON, el motor SQL los convertirá a `numeric` automáticamente al insertar.

---

## 💡 Notas Técnicas
- **Stack:** React + Vite + Tailwind + Supabase.
- **Ruta Crítica:** `constants.ts` es la fuente de verdad actual, debe ser deprecada a favor de la DB.
- **Variables de Entorno:** Se necesitarán `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.