# 📌 Memoria y Punto de Control — PJ-DOCS (Corte Superior de Justicia de Lambayeque)
**Fecha y hora:** 15 de Noviembre de 2026, 17:54 (Local)
**Espacio de trabajo:** `C:\Users\LENOVO\Documents\Codex\2026-11-14\a\Stirling-PDF-source`

---

## 🔒 1. Regla Inquebrantable
* **EL BACKEND NO SE TOCA:** Cero modificaciones a código Java, Gradle, build, endpoints, servicios Spring Boot o base de datos.
* Todo cambio se realiza estrictamente en la capa `frontend/` (React, TypeScript, CSS).

---

## ⚙️ 2. Estado de Servidores y Entorno
1. **Backend (Spring Boot):**
   - Puerto: `http://localhost:8080/`
   - Estado: `UP` (versión 3.3.0) — intacto y sin alteraciones.
   - Si se reinicia la máquina, arranque con:
     ```powershell
     $env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-25.0.5.8-hotspot"
     $env:Path = "$env:JAVA_HOME\bin;" + $env:Path
     cd "C:\Users\LENOVO\Documents\Codex\2026-11-14\a\Stirling-PDF-source"
     .\gradlew.bat :stirling-pdf:bootRun
     ```
2. **Frontend (Vite Dev Server):**
   - Puerto: `http://localhost:5173/`
   - Estado: Activo con HMR (*Hot Module Replacement*) funcionando sin errores.
   - Si se reinicia la máquina, arranque con:
     ```powershell
     cd "C:\Users\LENOVO\Documents\Codex\2026-11-14\a\Stirling-PDF-source\frontend"
     npx vite --port 5173
     ```

---

## 🎨 3. Identidad Visual Institucional Establecida
- **Nombre de la Suite:** `PJ-DOCS`
- **Institución:** `Corte Superior de Justicia de Lambayeque` (Poder Judicial del Perú)
- **Lema oficial:** `Gestión al servicio de las personas`
- **Paleta de Colores:**
  - Guinda Institucional: `#8b1a2b` (hover: `#751b28`, claro: `#fdf2f3`)
  - Oro Institucional: `#b8924a` (claro: `#faf7ee`)
  - Superficie base: Limpia, estilo software de escritorio
- **Logotipo Oficial:**
  - `frontend/public/logo-pj-court-trans.webp` (1.2 KB, transparente, 4 cuadrantes provisto por el usuario).
  - Favicon e iconos PWA generados y enlazados en `frontend/public/` e `index.html`.

---

## ✅ 4. Cambios Realizados y Verificados (Sesión Actual)

### A. Cabecera y Jerarquía Visual (`QuickActionsHero.tsx` y `QuickActionsHero.css`)
- **Jerarquía ordenada:**
  1. `PJ-DOCS` en guinda institucional `#8b1a2b` con badge *"Suite Digital"*.
  2. `Corte Superior de Justicia de Lambayeque` debajo de PJ-DOCS.
  3. `Gestión al servicio de las personas` como subtítulo lema.
- **Eliminación del indicador:** Removida la píldora *"Red Segura CSJLA"*.
- **Muelle de carga:** Nombrado *"Procesamiento Rápido"* y adaptado responsive para móviles.
- **Tarjetas de herramientas:**
  - `min-height: 11rem` para uniformidad de filas.
  - `-webkit-line-clamp: 2` para evitar desalineaciones por descripciones extensas.
  - Drag & drop directo por tarjeta con resalte dorado.
- **Barra de categorías:** Convertida en `sticky top` con fondo adaptativo al hacer scroll.
- **Soporte Dark Mode:** Contrastes, bordes y fondos de la barra inferior de estado sincronizados.

### B. Reducción de Repetición de Logos
- **`SidebarHeader.tsx`:** Imagen del logo retirada. Ahora muestra un ícono formal de balanza judicial (`scale`) + `PJ-DOCS` + insignia `CSJLA`.
- El logo aparece únicamente en 2 lugares estratégicos: Hero principal y botón superior de navegación (Nav Rail).

### C. Erradicación Integral de Marcas y Enlaces de Stirling PDF
- **`Footer.tsx`:** Enlaces a Discord y GitHub cambiados a `pj.gob.pe` y `csjla.gob.pe`. Textos en español.
- **`LegalSection.tsx`:** URLs de fallback dirigidas al portal del Poder Judicial y etiquetas en español.
- **`FeedbackSection.tsx`:** Texto cambiado a *"equipo de soporte PJ-DOCS"*.
- **`SoftwareUpdatesCard.tsx`:** Menciones de *"Stirling-PDF"* cambiadas a *"PJ-DOCS"*.
- **`AdminSetupBanner.tsx`:** Enlace de documentación dirigido al portal del PJ.
- **`useLogoAssets.ts` y `useLogoPath.ts`:** Wordmarks SVG reemplazados por el logo oficial transparente WebP.
- **`index.html`:** `<noscript>` y metadatos actualizados en español.

### D. Estandarización y Armonización Visual (Continuación)
- **`QuickActionsHero.tsx`:** Botones de acción unificados a nivel global con la etiqueta única **"Abrir Herramienta"** (sustituyendo "Abrir módulo" y "Ejecutar").
- **`colors.css`:** Mapeo de tokens en tema oscuro (`[data-theme="dark"]`), reemplazando el azul genérico residual por el guinda institucional (`#8b1a2b` / hover `#a5283b`) y acento rubí accesible (`#efa0a9`).

### E. Depuración de Elementos Innecesarios y Purga Global de Inconsistencias
- **`QuickActionsHero.tsx` & `.css`:**
  - Retiro definitivo de la píldora decorativa *"Suite Digital"* al costado de `PJ-DOCS`, logrando una cabecera más sobria y directa.
  - Inserción de firma de autoría no invasiva al pie del portal: **"Creado por su equipo forense de Alejandro."** en gris suave (`--c-text-subtle`, opacidad 65%).
  - Retiro definitivo de la falsa barra de estado inferior (`app-system-status-bar`) que contenía textos quemados no verificados ("Off-Cloud", "Ley N° 29733") y duplicaba el pie institucional.
  - Supresión de las píldoras decorativas redundantes en las tarjetas de herramientas frecuentes (`tag: "Frecuente"`, `"Herramienta"`, etc.).
  - Retiro del rótulo estático en la barra de categorías (`app-tab-caption`), evitando el scroll forzado en pantallas medianas.
  - Renombrado de la pestaña inicial a **"Herramientas Principales"**.
  - Conexión de soporte para escáner móvil (`mobileUploadEnabled` y `onMobileUpload`) con botón secundario en el dock.
  - Corrección de la descripción de *"Firmar Documento"* precisando que es rúbrica/firma visual (evitando confusión con certificados digitales de `certSign`).
  - Incorporación de `aria-label="Buscar herramienta"` en el buscador.
- **`Footer.tsx`:**
  - Corrección del enlace institucional a **`https://csjla.pe`** (reemplazando el dominio inexistente `csjla.gob.pe`).
  - Inclusión de la firma discreta en gris suave: **"• Creado por su equipo forense de Alejandro."** al final de la línea institucional.
- **`FeedbackTag.tsx`:** Corrección de la etiqueta flotante en español: **"Sugerencias"** (en vez de "Feedback").
- **`styles/theme.css`:** Purga integral de más de 30 variables que usaban `--p-blue-500` / `--p-blue-400` / `--p-blue-700` en navegación modal, selecciones de texto PDF y botones, alineándolas al Guinda `#8b1a2b` y Oro `#b8924a`.
- **`SuperSearch.tsx` & `locales/es-ES/translation.toml`:**
  - `placeholder` de superbúsqueda cambiado a **"Buscar en PJ-DOCS"**.
  - Frases residuales actualizadas a **"Importar a PJ-DOCS"** y **"Validado mediante PJ-DOCS"**.

### F. Amplitud Espacial, Container Queries y Disponibilidad Dinámica
- **`Workbench.tsx`:** Supresión del buscador flotante (`WorkbenchFloatingSearch`) cuando se muestra `LandingPage`, evitando la doble barra de búsqueda en la portada.
- **`HomePage.tsx`:** Retracción inteligente del panel derecho (`RightSidebar`) mientras se está en la suite inicial sin archivos ni herramienta seleccionada (`hideToolPanel = isLandingSuite`). Esto libera más de 340 px de ancho útil en la portada. Se despliega automáticamente al seleccionar una herramienta.
- **`QuickActionsHero.css`:** Activación de CSS Container Queries (`container-type: inline-size`) para adaptar la cuadrícula de tarjetas de 1 a 3 columnas según el espacio real disponible en su caja, sin depender del tamaño de la ventana completa.
- **`QuickActionsHero.tsx`:** Vinculación directa con `toolAvailability` de `ToolWorkflowContext`. Si una herramienta está deshabilitada en el servidor, se atenúa visualmente (`opacity: 0.52`), se bloquea el clic y se muestra el distintivo *"No disponible"*.
- **`index.html`:** Priorización de precarga (`<link rel="preload">`) del diccionario institucional en español `locales/es-ES/translation.toml`.

### G. Usabilidad Universal y Enfoque Multidocumento (Sin Rigidez Formal)
- **`QuickActionsHero.tsx`:**
  - **Mapeo exhaustivo de sinónimos cotidianos (`TOOL_SEARCH_ALIASES`):** Soporta búsquedas en lenguaje natural para cualquier usuario y cualquier necesidad documental (ej. "juntar", "reducir tamaño", "bajar peso", "achicar", "foto a pdf", "word", "excel", "desbloquear", "quitar clave", "tachar", "borrar datos", "girar", "voltear", "extraer hojas", "foliar", etc.), sin exigir tecnicismos ni términos estrictamente judiciales.
  - **Buscador interactivo conversacional:** Placeholder amigable `¿Qué deseas hacer? (ej: unir, reducir tamaño, firmar, convertir)...`.
  - **Espacio de trabajo accesible:** Rótulos del muelle de carga simplificados a *"Espacio de Trabajo"* y *"Arrastra cualquier archivo aquí, o haz clic para abrirlo y comenzar a trabajar"*.
  - **Acciones claras e intuitivas:** Botón de subida cambiado a `"+ Seleccionar documento"` y botón móvil a `"Digitalizar con celular"` con tooltip explicativo.
  - **Pestaña de catálogo simplificada:** Renombrada a `"Todas las Herramientas"` (en vez del técnico *"Catálogo Completo (50+)"*).
  - **Microcopy de tarjetas humanizado:** Sustituido el término rígido *"Módulo operativo"* por el claro *"Listo para usar"*.
  - **Pantalla de búsqueda vacía con sugerencias útiles:** Indica palabras comunes de búsqueda para guiar al usuario si no encuentra lo que escribe.

### H. Implementación de Alternativa C: Modelo "Single-Sidebar Contextual" (Fin del Efecto Sándwich)
- **Resolución integral de la duplicidad de barras laterales:**
  1. **En la Portada / Inicio (`isLandingSuite`):** CERO sidebars abiertos (`hideToolPanel = true`, `shouldRenderFileSidebar = false`). Se corrigió la condición que dependía erróneamente de `"fileEditor"`, asegurando que en el inicio por defecto (`"viewer"`) la suite inicial de PJ-DOCS ocupe el 100% de la pantalla, limpia de extremo a extremo sin barra de archivos izquierda y sin panel derecho.
  2. **Al trabajar en un documento o herramienta:** Queda **UN SOLO sidebar activo**: el de Herramientas (`RightSidebar`), necesario para configurar parámetros (contraseñas, fojas a dividir, compresión, firmas, etc.).
  3. **Sidebar Izquierdo de Archivos (`FileSidebar`):**
     - Oculto por defecto en flujos individuales.
     - Se activa automáticamente en la biblioteca (`/files`) y en herramientas multiharchivo (`merge`, `compare`, `overlayPdfs`).
     - Para documentos individuales, se expone un botón flotante discreto `.app-floating-file-pill` (`"Archivos (N)"`) en la esquina superior izquierda si el usuario desea expandirlo voluntariamente, y un botón de cierre en la cabecera `SidebarHeader` para volver al modo limpio.
  4. **Supresión del buscador duplicado flotante:** `isLandingPage = !hasWorkbenchContent` en `Workbench.tsx` para evitar que aparezca la barra flotante encima del Hero.
- **Archivos adaptados:** `HomePage.tsx`, `HomePage.css`, `Workbench.tsx`, `FileSidebar.tsx`, `SidebarHeader.tsx`.

### I. Blindaje del Idioma Español y Armonización Visual Estilo Smallpdf
- **Blindaje total del idioma español:**
  - `frontend/index.html`: Etiqueta corregida a `<html lang="es-ES">` y script de saneamiento de `localStorage` para limpiar cualquier fallback a `en-US` o `es-PE` no soportado.
  - `frontend/src/editor/core/i18n.ts`: Forzado `lng: "es-ES"`, `fallbackLng: "es-ES"` y mapeo automático en `convertDetectedLanguage` de cualquier variante de español (`es`, `es-PE`, `es-419`) directamente a `"es-ES"`.
  - Retiro de `useSuppressQuickNavRail` de `HomePage.tsx` para evitar desmontar hooks de router y puente del host.
- **Armonización visual estilo Smallpdf respetando cabecera CSJLA:**
  - **Cabecera Intacta 100%:** Logo judicial transparente, `PJ-DOCS`, `Corte Superior de Justicia de Lambayeque` y lema `Gestión al servicio de las personas` rigurosamente preservados sin alteraciones.
  - **Muelle de carga Smallpdf:** Acción principal unificada con `+ Elegir archivos` y soporte de digitalización móvil.
  - **Firma no invasiva:** Preservada al pie: `Creado por su equipo forense de Alejandro.`.

### J. Diagnóstico de Carga y Resolución de Errores de Compilación Frontend
- **Diagnóstico del reporte "no veo los cambios, parece que no cargó":**
  1. **Discrepancia de Puertos de Acceso:**
     - En `http://localhost:8080/` corre el backend Spring Boot sirviendo únicamente endpoints API y su página estática base del servidor.
     - En **`http://localhost:5173/`** corre el servidor de desarrollo Vite con la aplicación React interactiva y todas las mejoras de diseño y funcionalidad. Si se consulta el puerto 8080 no se reflejarán los cambios.
  2. **Subsanación de Errores TypeScript en `QuickActionsHero.tsx`:**
     - El icono `device-mobile` fue reemplazado por el icono oficial soportado `phone`.
     - `extractText` fue removido de `TOOL_SEARCH_ALIASES` y sustituido por `pdfTextEditor` en las categorías ya que no existe como `ToolId` directo.
     - Tipado estricto `ToolRegistryEntry` importado de `@editor/data/toolsTaxonomy` para resolver los errores de acceso a propiedades en `allToolsList`.
     - Corrección de import relativo a alias `@editor/components/shared/QuickActionsHero.css`.
  3. **Limpieza en `HomePage.tsx`:**
     - Eliminada la variable no utilizada `i18n` para cumplir con las reglas estrictas del linter.
  4. **Estado de Compilación y Calidad:**
     - `npx tsc --noEmit --project src/editor/core/tsconfig.json`: **0 errores**.
     - `npx tsc --noEmit --project src/editor/proprietary/tsconfig.json`: **0 errores**.
     - `npx oxlint`: **0 warnings, 0 errores**.
     - Vite HMR: Actualizado y activo en tiempo real.

### K. Implementación Fiel de Tarjetas Smallpdf y Remoción de Barras Superiores
- **Remoción de Ambas Barras Intermedias:**
  - Se eliminó completamente la barra de *"Espacio de Trabajo"* (antigua franja punteada de muelle).
  - Se eliminó completamente la barra horizontal de pestañas de categorías (`app-category-bar`), dejando la pantalla completamente limpia y despejada entre la cabecera y el catálogo.
- **Rediseño Integral de Tarjetas Estilo Smallpdf (`smallpdf-tool-card`):**
  - **Anatomía de mosaico limpio:** Tarjetas blancas/neutras con esquinas redondeadas (`16px`), borde suave y micro-interacción flotante al pasar el ratón (`translateY(-4px)` con sombra difusa).
  - **Caja de icono con color temático:** Cada herramienta cuenta con su icono característico y fondo tintado suave (ej. Azul para Unir, Rojo/Coral para Comprimir, Naranja para Dividir, Verde para Convertidor, Púrpura para Firmar, Guinda CSJLA para Contraseña, etc.).
  - **Eliminación total de ruido visual interno:** Se removieron los textos de *"Listo para usar"*, los botones píldora de *"Abrir Herramienta"* y las insignias de estado. **Toda la tarjeta actúa como un único botón interactivo** y zona de soltado (*drag & drop*).
  - **Tipografía clara:** Título destacado en negrita y descripción sintetizada en 2 líneas en color gris legible.
- **Organización por Secciones Temáticas:**
  - Sin búsqueda: Se agrupan bajo títulos limpios (*Herramientas Más Usadas*, *Organizar y Gestionar Páginas*, *Convertir y Reconocimiento de Texto*, *Optimizar y Reparar*, *Seguridad y Firmas*).
  - Con búsqueda: Filtro instantáneo dinámico mediante el buscador de cabecera con contador de resultados y sugerencias amigables.
- **Cabecera Institucional y Firma Intactas:**
  - Logo transparente de la corte, título **`PJ-DOCS`**, líneas institucionales de la CSJLA, buscador y firma *"Creado por su equipo forense de Alejandro."* preservados al 100%.

### L. Configuración Personalizada de "Herramientas Más Usadas" (Top 8 Seleccionado)
- **Alineación a requerimiento directo del usuario:** La sección principal superior despliega ahora exactamente las 8 herramientas requeridas en formato de cuadrícula simétrica (2 filas x 4 columnas en escritorio):
  1. **Editar texto de PDF (`pdfTextEditor`):** Violeta vibrante `#7c3aed`, icono `file-pen`.
  2. **Comprimir PDF (`compress`):** Rojo/Coral `#e11d48`, icono `shrink`.
  3. **Dividir PDF (`split`):** Naranja `#ea580c`, icono `scissors`.
  4. **Convertir PDF (`convert`):** Esmeralda `#059669`, icono `file-convert`.
  5. **Unir PDFs (`merge`):** Azul `#2563eb`, icono `copy-plus`.
  6. **Extraer Páginas (`extractPages`):** Índigo `#4f46e5`, icono `download`.
  7. **Foliar y Numerar (`addPageNumbers`):** Oro institucional `#b8924a`, icono `file-digit`.
  8. **Eliminar Páginas (`removePages`):** Rojo `#dc2626`, icono `file-x`.
- **Búsqueda Instantánea:** Agregado alias directo para `pdfTextEditor` en `TOOL_SEARCH_ALIASES`.
- **Estado de Compilación:** `tsc` 0 errores, `oxlint` 0 errores, Vite Fast Refresh activo sin invalidaciones.

### M. Unificación Visual de la Cabecera (Fin del Cajón Aislado)
- **Desaparición del Cajón Flotante (`app-title-bar`):**
  - Se eliminó el fondo blanco de tarjeta, los bordes cerrados de 16px y la sombra flotante que hacían ver la cabecera como un recuadro aislado.
  - La cabecera se integra ahora de forma nativa e invisible con el fondo del portal, con una línea divisoria inferior muy sutil y limpia (`border-bottom: 1.5px solid var(--csjla-gray-200)`).
- **Emblema Judicial Integrado:**
  - Se removió el recuadro/cajita interior que encerraba al escudo. El isotipo transparente oficial se muestra con total libertad y presencia institucional sin marcos artificiales.
- **Acciones Estilo Píldora Moderna:**
  - El buscador y el botón de apertura rápida se convirtieron a píldoras redondeadas (`border-radius: 9999px`) armonizadas al estilo Smallpdf y Google Material.

### N. Cabecera Continua Full-Width Estilo Barra Superior de Portal (Arquitectura Seamless)
- **Superación Definitiva del "Cajón Separado":**
  - En `LandingPage.tsx`: Se removió el envoltorio rígido `<Container size="84rem">` que enclaustraba el portal en una caja estrecha con márgenes restrictivos, pasando a un contenedor nativo de ancho total fluido (`w-full h-full flex-col`).
  - En `QuickActionsHero.tsx` y `QuickActionsHero.css`: Se implementó la nueva arquitectura `.app-portal-layout` con:
    1. **`.app-unified-header` (Top Navbar Continua):** Barra superior de ancho completo (100%), adherida suavemente en la parte superior (`position: sticky; top: 0; z-index: 25;`), con fondo de superficie limpio y sutil línea divisoria inferior (`border-bottom: 1px solid var(--csjla-gray-200)`). El contenido interior se alinea simétricamente en un contenedor generoso (`max-width: 84rem`).
    2. **Identidad Institucional Completa:** El escudo transparente oficial (`/logo-pj-court-trans.webp`), el título `PJ-DOCS` (Guinda `#8b1a2b`), el texto `Corte Superior de Justicia de Lambayeque` y el lema `Gestión al servicio de las personas` se presentan con máxima legibilidad y elegancia.
    3. **Acciones en la Barra Superior:** El buscador en píldora (`¿Qué deseas hacer?...`) y el botón `Abrir archivo` se posicionan a la derecha de la barra superior.
    4. **`.app-portal-body`:** El catálogo de herramientas inicia de inmediato debajo de la barra continua, desplegando el Top 8 de "Herramientas Más Usadas" en tarjetas limpias estilo Smallpdf.
- **Validación:**
  - TypeScript: 0 errores en core y proprietary.
  - OxLint: 0 warnings, 0 errores.
  - Vite HMR: Hot reload completado exitosamente sin recargas totales de página.

### O. Portal Limpio Estilo Smallpdf (Supresión del Rail Izquierdo en Portada y Acciones en Barra Superior)
- **Ocultamiento del Rail Izquierdo en Portada:**
  - En `HomePage.tsx`: Se conectó el hook nativo `useSuppressQuickNavRail(isLandingSuite)`. Cuando el usuario se encuentra en el portal de inicio (sin archivos abiertos ni herramienta seleccionada), la barra lateral izquierda queda completamente suprimida (`chromeless`), otorgando el 100% del ancho de pantalla al portal de PJ-DOCS.
  - Cuando se carga un archivo o se ingresa a una herramienta, la mesa de trabajo restaura el rail contextualmente.
- **Enriquecimiento de la Cabecera Superior con Acciones Modernas:**
  - En `QuickActionsHero.tsx` y `QuickActionsHero.css`:
    1. **Botón Mis Archivos (`.app-header-secondary-btn`):** Píldora moderna con icono `folder` para acceder a la biblioteca de documentos guardados (`/files`).
    2. **Botón Configuración (`.app-header-settings-btn`):** Botón circular con icono de tuerca `settings` y micro-rotación al pasar el ratón, para ingresar a ajustes (`/settings`) y cambiar tema/idioma.
    3. **Icono QR (`qr-code`):** Sustituyó al antiguo icono de teléfono para escanear y subir desde el móvil.
    4. **Buscador y Abrir Archivo:** Preservados y armonizados en la barra superior unificada.
- **Limpieza de la Barra Lateral en Área de Trabajo (`QuickNavRailHost.tsx`):**
  - Removido el icono técnico de *Automatizar* (`git-branch`).
  - Removido el enlace externo a la *Documentación* en inglés (`circle-question-mark`).
  - Removidas campana de notificaciones e invitaciones innecesarias, dejando el rail limpio y centrado exclusivamente en el trabajo judicial.
- **Validación:**
  - TypeScript: 0 errores en core y proprietary (`npx tsc --noEmit`).
  - OxLint: 0 warnings, 0 errores (`npx oxlint`).
  - Vite HMR: Activo en `http://localhost:5173/`.

---

## 📋 5. Próximas Tareas Inmediatas al Retomar

1. **Verificación visual interactiva con el usuario** en `http://localhost:5173/`.
2. **Evaluación de favoritos personalizados** o atajos adicionales según flujo del usuario.
