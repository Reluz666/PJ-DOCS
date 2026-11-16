# Estado del diseño PJ-DOCS

Revisión de Codex: 2026-11-15. Documento de comprensión y diagnóstico; no autoriza implementaciones.

## Alcance estricto

Solo diseño del frontend. El backend no se toca: código, configuración, dependencias, endpoints, seguridad, procesamiento e infraestructura quedan fuera del alcance. Tampoco se deben alterar los flujos funcionales del frontend para conseguir un cambio visual.

## Qué es el proyecto

Personalización de la interfaz de Stirling-PDF con la identidad PJ-DOCS de la Corte Superior de Justicia de Lambayeque. La portada institucional se integra en el editor existente; no es una aplicación independiente.

- `frontend/`: React, TypeScript, Vite, Mantine y Tailwind; contiene editor y processor.
- `frontend/src/editor/core/`: interfaz base y componentes compartidos. Las capas desktop, proprietary, cloud y saas pueden sustituir módulos a través de los imports `@editor/*`.
- `app/`: backend Java/Spring, organizado en common, core, proprietary y saas. Fuera del alcance de escritura.
- `engine/`: motor Python. Fuera del alcance de escritura.
- `docker/`, Gradle y scripts: infraestructura y herramientas; no deben cambiarse para las tareas actuales.

## Cómo se conecta la portada

`App.tsx` monta rutas, proveedores y estructura de la aplicación. `HomePage.tsx` compone navegación y espacio de trabajo. `Workbench.tsx` muestra `LandingPage` cuando no hay archivos activos (exceptuando vistas especiales y estados de carga). `LandingPage` monta el nuevo `QuickActionsHero`.

La nueva portada tiene identidad institucional, buscador, carga de documentos, categorías, seis acciones frecuentes, catálogo y pie informativo. Las acciones frecuentes son unir, comprimir, convertir, dividir, firmar y proteger con contraseña.

`QuickActionsHero` consulta el catálogo de `ToolWorkflowContext`. `LandingPage` selecciona una herramienta mediante `handleToolSelect`, abre el selector de archivos y añade los archivos con `useFileHandler`, que delega en `FileContext`. Las operaciones PDF siguen en la arquitectura existente.

## Trabajo acumulado observado

La comparación contra HEAD mostró 21 archivos rastreados modificados, todos en frontend, además de componentes y recursos gráficos nuevos sin seguimiento. Git no permite atribuir cada cambio a una persona o agente. No había cambios locales visibles en app, engine, docker ni en los archivos Gradle comprobados.

| Área | Archivos principales | Cambio observado |
|---|---|---|
| Portada | `QuickActionsHero.tsx`, `QuickActionsHero.css`, `LandingPage.tsx` | Sustitución de la bienvenida original por una suite institucional con categorías y búsqueda |
| Identidad compartida | `Logo.tsx`, `BrandMark.tsx`, `SidebarHeader.tsx`, `QuickNavBrand.tsx` | Escudo, PJ-DOCS, CSJLA y nombres institucionales |
| Colores y tipografía | `styles/index.css`, `styles/theme.css`, `theme/colors.css`, `QuickNavRail.css` | Guinda, dorado, Inter y Plus Jakarta Sans |
| Navegador y metadatos | `index.html`, `manifest.json`, `HomePage.tsx`, `useDocumentMeta.ts`, `useLogoAssets.ts` | Título PJ-DOCS, favicons y descripciones institucionales |
| Idioma | `i18n.ts`, `index.html` | Fallback español y declaración es-PE; textos nuevos escritos directamente en español |
| Detalles de marca | `Tooltip.tsx`, `FeedbackTag.tsx` | Reemplazo del logotipo o icono original |
| Recursos | `frontend/public/` y assets de marca | Varias versiones PNG, ICO y WebP del escudo y logotipos |

Los textos solicitados ya constan en el código: «Gestión al servicio de las personas» y «Procesamiento Rápido».

## Hallazgos para una revisión posterior

Estos hallazgos proceden del código; no se han aplicado correcciones.

1. **Disponibilidad de herramientas:** la portada enumera el registro sin reflejar `toolAvailability`. El selector existente sí bloquea herramientas deshabilitadas, pero `LandingPage` abre el selector de archivos después de solicitar la selección. Puede dar la impresión de que una herramienta no disponible está operativa. Revisar la presentación conservando la protección existente.
2. **Acceso al escáner móvil:** `LandingPage` pasa `mobileUploadEnabled` y `onMobileUpload`, pero `QuickActionsHero` no los consume. La nueva portada no ofrece el acceso que antes proporcionaba `LandingActions`.
3. **Texto de firma:** la tarjeta `sign` promete certificado o firma digital. El catálogo distingue `sign` (dibujo, texto o imagen) de `certSign` (certificado). Corregir la descripción visual sería distinto de cambiar la implementación de firma.
4. **Sistema de colores:** se añadieron valores literales en `theme/colors.css`, `styles/theme.css` y el CSS de la portada. La guía exige centralizar la paleta en `theme/primitives.css`. Las definiciones globales y excepciones oscuras requieren una revisión de coherencia.
5. **Pantallas pequeñas:** la cuadrícula tiene un mínimo de 290 px por tarjeta, el buscador 260 px y la zona de carga conserva una fila sin adaptación explícita. Existe riesgo de recortes con paneles laterales o ventanas estrechas; pendiente de medición visual.
6. **Accesibilidad:** tarjetas y área de carga implementan botones mediante elementos con `role=button`; el área contiene otro botón. El teclado y la propagación de eventos requieren comprobación. El buscador tiene placeholder pero no etiqueta accesible explícita.
7. **Rutas de recursos:** varios logos y favicons usan rutas absolutas desde `/`, mientras el proyecto contempla despliegues bajo una ruta base. Es un riesgo para esos despliegues, no un fallo demostrado en localhost.
8. **Contadores y categorías:** aparece «50+» y un fallback de 50; otros contadores usan listas estáticas. Conviene que los textos reflejen el catálogo efectivamente mostrado. Algunas etiquetas muestran identificadores de categoría directamente.
9. **Mensajes de estado:** «Red Local Segura», «Off-Cloud» y cumplimiento de la Ley N.º 29733 son textos fijos, no resultados de una comprobación en este componente. No interpretar estos rótulos como validación técnica o legal. El HTML también carga fuentes desde Google; el texto sobre funcionamiento local merece precisión.
10. **Recursos y marca:** existen múltiples variantes de logotipo. Falta identificar cuáles se usan antes de proponer una consolidación. No eliminar archivos por su nombre o apariencia.

## Límites de esta revisión

Se revisaron arquitectura documentada, instrucciones, cambios locales, componentes nuevos y conexiones relevantes del frontend. No equivale a una auditoría línea por línea de todo Stirling-PDF ni de su historia anterior.

La ventana del portal fue localizada, pero el control del equipo devolvió «window is minimized» incluso después del intento de activación; no se obtuvo captura del diseño. Los hallazgos visuales potenciales siguen pendientes de comprobación en navegador.

No se modificó código de aplicación, no se ejecutaron operaciones PDF ni se arrancaron o reiniciaron servicios. No se ejecutó la batería de pruebas: esta fase es de comprensión y documentación. La entrega de Antigravity y sus comprobaciones todavía deben revisarse.
