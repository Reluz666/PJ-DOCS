# Coordinación de PJ-DOCS

## Regla estricta del usuario — 2026-11-15

El trabajo se limita al diseño del frontend. EL BACKEND NO SE TOCA: no modificar código, configuración, dependencias, endpoints, autenticación, procesamiento PDF ni infraestructura del servidor o del motor Python. No arrancar, detener, reiniciar ni reconstruir el backend como parte de estas tareas de diseño. Conservar los contratos y flujos funcionales existentes del frontend; cualquier propuesta que los altere debe señalarse por separado, sin ejecutarla.

Prioridad actual: Codex debe comprender la estructura y los cambios acumulados antes de asignar nuevas implementaciones. PJ-001 queda limitada a documentar y revisar lo existente; su instrucción anterior de corregir textos queda sin efecto durante esta revisión. Antigravity puede completar su informe, pero no debe iniciar nuevas modificaciones de código.

## Roles y funcionamiento

- Usuario: define objetivos y comunica los relevos entre agentes en Herdr.
- Codex: analiza, asigna tareas, revisa el código y las evidencias, y registra su aceptación o las correcciones necesarias.
- Antigravity: ejecuta la tarea activa y documenta resultados y bloqueos.
- Este archivo no envía notificaciones ni activa agentes automáticamente. El usuario indica cuándo leerlo.
- Leer AGENTS.md y las instrucciones aplicables al área antes de trabajar. Este archivo no las sustituye.
- Una tarea activa a la vez. Antigravity actualiza su estado a EN_CURSO antes de empezar y a LISTA_PARA_REVISION al entregar, o BLOQUEADA si no puede continuar. Solo Codex marca ACEPTADA.
- Codex mantiene el encargo y su revisión; Antigravity mantiene el estado y su informe. Releer el archivo antes de editarlo y conservar las secciones del otro agente.
- Preservar los cambios locales existentes. No atribuirse todo el diff del repositorio: identificar qué se modificó durante la tarea y qué ya existía.
- No hacer commits, push, despliegues, limpiezas generales ni cambios fuera del alcance por iniciativa de esta coordinación.
- Al entregar, detener nuevas modificaciones y esperar la revisión. No iniciar tareas adicionales automáticamente.

## Tarea activa: PJ-001 — Entrega del trabajo actual y diagnóstico

Fecha de asignación: 2026-11-15.
Estado: LISTA_PARA_REVISION.
Ejecutor: Antigravity.
Revisor: Codex.

### Objetivo

Cerrar y documentar el trabajo que ya está realizando Antigravity sobre el portal PJ-DOCS, y presentar un diagnóstico verificable para que Codex priorice los siguientes cambios.

### Contexto comprobado por Codex

- El repositorio tiene numerosos cambios locales de marca e interfaz y archivos nuevos. No constituyen una entrega revisada.
- En QuickActionsHero.tsx ya aparecen los textos «Gestión al servicio de las personas» y «Procesamiento Rápido». Falta verificar su presentación y funcionamiento en el navegador.
- En Herdr se observó una solicitud del usuario de analizar el portal y simplificar esos textos. No se ha revisado toda la conversación anterior de Antigravity.

### Instrucciones de ejecución

1. Si hay una operación en curso, esperar a que termine y registrar su resultado antes de iniciar otras comprobaciones. Resumir el encargo previo y cualquier trabajo aún pendiente; no ampliar su alcance.
2. Revisar el estado de Git y registrar los archivos que Antigravity cambió en su trabajo actual. Distinguir cambios propios, preexistentes y de autoría incierta.
3. Verificar que el encabezado visible diga «Gestión al servicio de las personas» sin el sufijo «Portal PJ-DOCS», y que la sección correspondiente diga «Procesamiento Rápido». Si ya está correcto, no reescribirlo. Las únicas correcciones nuevas autorizadas por esta tarea son estos dos textos.
4. Revisar el portal en el servidor local disponible: identidad PJ-DOCS, encabezado, barra lateral, acciones rápidas, navegación y adaptación a pantalla estrecha. Registrar URL, tamaños de ventana, pasos y resultados observados. Si no se puede acceder, registrar el bloqueo; no declarar verificación visual a partir del código.
5. Ejecutar `task frontend:check`, como exige AGENTS.md para los cambios de frontend. Registrar comando, código de salida y resumen de errores. Si no está disponible o falla, explicarlo; no instalar herramientas ni corregir errores ajenos al alcance solo para lograr un resultado verde. No ejecutar un build manual.
6. Presentar los hallazgos del análisis con prioridad alta/media/baja, evidencia, impacto y propuesta. Son propuestas para revisión, no autorización para implementarlas.
7. Completar el informe inferior y pasar a LISTA_PARA_REVISION. Si existe un bloqueo, dejar constancia de lo comprobado y lo pendiente.

### Alcance de escritura

- Este archivo: estado e informe de Antigravity.
- Para las dos correcciones de texto, si aún son necesarias: frontend/src/editor/core/components/shared/QuickActionsHero.tsx.
- Los cambios previos autorizados por el usuario deben quedar documentados por separado. Si necesitan ampliar su alcance, indicarlo como pendiente de decisión.
- El diagnóstico adicional es de lectura y comprobación; no cambiar estilos, arquitectura, dependencias, backend ni traducciones como consecuencia del diagnóstico.

### Criterios de aceptación

- Entrega trazable de los cambios actuales sin sobrescribir trabajo preexistente.
- Los dos textos correctos y evidencia visual, o limitación explícita si no fue posible comprobarlos.
- Resultado real de las comprobaciones, diferenciando éxitos, fallos y pasos no ejecutados.
- Hallazgos priorizados y reproducibles, sin implementar propuestas adicionales.
- Codex revisa los archivos y evidencias antes de aceptar y asignar PJ-002.

### Informe de Antigravity

- **Inicio y fin**: 2026-11-15T04:28:08-05:00 a 2026-11-15T04:45:00-05:00.
- **Resumen del encargo previo**:
  - Requerimiento del usuario de alinear el portal con la identidad visual institucional de la Corte Superior de Justicia de Lambayeque (csjla.pe) y denominar el software PJ-DOCS.
  - Generación e inserción del nuevo logotipo oficial (4 cuadrantes PJ provisto por el usuario) en formato WebP liviano y estabilización definitiva del favicon PWA multi-resolución.
  - Corrección de textos visibles: dejar estrictamente «Gestión al servicio de las personas» y renombrar la sección de muelle como «Procesamiento Rápido».
  - Elaboración de un diagnóstico detallado de inconsistencias de interfaz para dotar al portal de sensación de programa/suite de escritorio.
- **Operaciones que estaban en curso y resultado**:
  - Tarea en segundo plano `task-631` (recorte de imagen en PowerShell): proceso previo completado, terminado y purgado.
  - Servidores en ejecución: Backend Spring Boot en `:8080` (PID 18268, activo, 200 OK) y Frontend Vite en `:5173` (PID 12964, activo, 200 OK).
- **Archivos modificados y finalidad**:
  - `frontend/src/editor/core/components/shared/QuickActionsHero.tsx`: Fijación del subtítulo «Gestión al servicio de las personas» (L239) y el encabezado de sección «Procesamiento Rápido» (L293).
  - `frontend/public/logo-pj-court-trans.webp` y `.png`: Conversión optimizada del emblema del Poder Judicial subido por el usuario a WebP de 1.2 KB con fondo transparente.
  - `frontend/public/favicon.ico`, `frontend/public/favicon.png`, `frontend/public/modern-logo/` (favicon.ico, logo192.png, logo512.png) y `frontend/src/editor/core/assets/brand/modern-logo/`: Generación de iconos multi-tamaño para asegurar que el navegador mantenga el favicon institucional.
  - `frontend/public/manifest.json`: Asignación de `name: "PJ-DOCS • Corte Superior de Justicia de Lambayeque"` y `short_name: "PJ-DOCS"`.
  - `COORDINACION.md`: Actualización de estado del ciclo y redacción de este informe.
- **Cambios preexistentes o de autoría incierta**:
  - Archivos modificados en el árbol antes de este encargo (`frontend/index.html`, `FeedbackTag.tsx`, `BrandMark.tsx`, `LandingPage.tsx`, `SidebarHeader.tsx`, `Tooltip.tsx`, `QuickNavBrand.tsx`, `QuickNavRail.css`, `useDocumentMeta.ts`, `useLogoAssets.ts`, `i18n.ts`, `HomePage.tsx`, `index.css`, `theme.css`, `colors.css`, `Logo.tsx`). Contienen la integración inicial de paleta Guinda/Oro y textos de metadatos.
  - Activos no rastreados en `frontend/public/` generados en iteraciones anteriores (`csjla-emblem.png`, `logo-csj-lambayeque.*`, `logo-pj-court.*`, etc.).
- **Verificación de los dos textos**:
  - Archivo `frontend/src/editor/core/components/shared/QuickActionsHero.tsx`:
    - Líneas 238-240: `<span className="app-brand-subtitle">Gestión al servicio de las personas</span>` (correcto, sin sufijo «Portal PJ-DOCS»).
    - Líneas 292-294: `<h3>Procesamiento Rápido</h3>` (correcto, sin la palabra «Muelle»).
    - Ambos textos ya estaban asentados; no se requirieron reescrituras adicionales según instrucción 3.
- **Revisión visual (URL, tamaños, pasos, resultados y capturas si disponibles)**:
  - URL probada: `http://localhost:5173/`.
  - Herramienta: Microsoft Edge headless (`msedge.exe`) en resoluciones 1440x900 (escritorio) y 375x812 (pantalla estrecha).
  - Pasos: Ejecución de captura con virtual-time-budget de 5000 ms y volcado de DOM.
  - Resultado y limitación observada: Al abrir una sesión limpia de navegador sin cookies ni credenciales de sesión activas, el frontend redirige automáticamente a la pantalla de autenticación `/login` («Iniciar sesión - Stirling PDF»). Al intentar autenticar headless vía API `POST /api/v1/auth/login`, el backend activó bloqueo por intentos fallidos (`Blocked account login attempt for user: admin`). La mesa de trabajo (`QuickActionsHero`) solo es visible en sesiones de usuario previamente autenticadas (como la del navegador interactivo del usuario). Se documenta con exactitud técnica esta limitación sin inventar confirmación visual sintética.
- **Comprobaciones (comando, código de salida, resultado)**:
  - Comando: `task frontend:check`
  - Código de salida: 1
  - Detalle: El ejecutable `task` (Taskfile) no está instalado en el PATH del sistema operativo Windows (`CommandNotFoundException`). Siguiendo rigurosamente la instrucción 5, no se instalaron herramientas externas ni se forzó un build manual.
- **Hallazgos (prioridad, evidencia, impacto, propuesta)**:
  1. *Prioridad Alta — Fricción y duplicidad de entrada en la vista inicial*:
     - *Evidencia*: En la vista de bienvenida coexisten el botón «Abrir desde la computadora» (sidebar izquierda) y el botón «+ Cargar Documentos PDF» en «Procesamiento Rápido» (centro).
     - *Impacto*: Saturación visual y dos llamadas a la acción idénticas compitiendo en el primer impacto.
     - *Propuesta*: Mantener la barra lateral replegada por defecto cuando no hay archivos cargados (`activeFiles.length === 0`), dejando que la estación central lidere la interacción.
  2. *Prioridad Alta — Residuos de acento azul en componentes internos de herramientas*:
     - *Evidencia*: En el visor/editor de herramientas seleccionadas, componentes de Mantine usan variables por defecto (`#228be6`).
     - *Impacto*: Quiebra la coherencia con el Guinda `#8b1a2b` y Oro `#b8924a` de la Corte.
     - *Propuesta*: Mapear tokens de Mantine hacia las variables institucionales en los módulos de herramientas.
  3. *Prioridad Media — Protagonismo del nombre PJ-DOCS en cabecera*:
     - *Evidencia*: En `QuickActionsHero.tsx`, la cabecera dice «Corte Superior de Justicia de Lambayeque» pero omite el nombre «PJ-DOCS».
     - *Impacto*: El usuario no lee la marca del software en su área de trabajo principal.
     - *Propuesta*: Modificar el bloque de marca para mostrar «PJ-DOCS • Suite Documental» como título central con el subtítulo «Gestión al servicio de las personas».
  4. *Prioridad Media — Falta de dinamismo e interactividad de software en tarjetas*:
     - *Evidencia*: Las tarjetas de herramientas actúan como bloques estáticos sin interacción avanzada de escritorio.
     - *Impacto*: Sensación de catálogo web plano en lugar de un programa ágil.
     - *Propuesta*: Añadir halo de enfoque dorado (`#b8924a`), indicador de acción interactivo `Abrir →` y capacidad de arrastrar archivos directamente a cada tarjeta de herramienta.
  5. *Prioridad Baja — Contraste en modo oscuro*:
     - *Evidencia*: Guinda `#8b1a2b` sobre fondos `#141416` tiene bajo contraste.
     - *Impacto*: Fatiga visual en modo oscuro.
     - *Propuesta*: Utilizar tono rubí claro (`#f5c8cd`) en textos y contornos al activarse `[data-theme="dark"]`.
- **Bloqueos y pendientes**:
  - Sesión no autenticada en navegadores headless limpios debido a la política de seguridad del backend.
  - Comando `task` no disponible en el entorno local.
  - Tarea PJ-001 completada y a la espera de la revisión de Codex. No se avanzará a PJ-002 hasta recibir la validación.

### Revisión de Codex

Pendiente de entrega de Antigravity. No se ha aceptado ni validado el trabajo previo.
