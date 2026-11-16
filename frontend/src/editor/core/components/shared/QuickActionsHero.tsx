import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, type IconName } from "@editor/ui/Icon";
import { useToolWorkflow } from "@editor/contexts/ToolWorkflowContext";
import type { ToolId } from "@editor/types/toolId";
import "@editor/components/shared/QuickActionsHero.css";

interface SmallpdfToolItem {
  id: ToolId;
  iconName: IconName;
  title: string;
  desc: string;
  color: string;
  bg: string;
}

// ── 1. HERRAMIENTAS MÁS POPULARES (CABECERA SMALLPDF) ───────
const POPULAR_TOOLS: SmallpdfToolItem[] = [
  {
    id: "pdfTextEditor",
    iconName: "file-pen",
    title: "Editar Texto de PDF",
    desc: "Modifica, corrige o añade texto directamente sobre las páginas de tu archivo.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    id: "compress",
    iconName: "shrink",
    title: "Comprimir PDF",
    desc: "Reduce el peso de tu archivo al máximo para enviarlo fácil por correo o web.",
    color: "#e11d48",
    bg: "#fff1f2",
  },
  {
    id: "split",
    iconName: "scissors",
    title: "Dividir PDF",
    desc: "Separa páginas, extrae hojas individuales o divide documentos grandes.",
    color: "#ea580c",
    bg: "#fff7ed",
  },
  {
    id: "convert",
    iconName: "file-convert",
    title: "Convertir PDF",
    desc: "Transforma a Word, Excel, PowerPoint, imágenes o pasa fotos a PDF.",
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    id: "merge",
    iconName: "copy-plus",
    title: "Unir PDFs",
    desc: "Combina varios archivos o imágenes en un solo documento en el orden que desees.",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    id: "extractPages",
    iconName: "download",
    title: "Extraer Páginas",
    desc: "Guarda páginas o rangos de fojas seleccionadas en un nuevo archivo independiente.",
    color: "#4f46e5",
    bg: "#eef2ff",
  },
  {
    id: "addPageNumbers",
    iconName: "file-digit",
    title: "Foliar y Numerar",
    desc: "Inserta numeración correlativa o foliación oficial en el encabezado o pie de página.",
    color: "#b8924a",
    bg: "#faf7ee",
  },
  {
    id: "removePages",
    iconName: "file-x",
    title: "Eliminar Páginas",
    desc: "Suprime hojas en blanco, fojas erróneas o páginas que ya no utilices.",
    color: "#dc2626",
    bg: "#fef2f2",
  },
];

// ── 2. SECCIONES TEMÁTICAS ORGANIZADAS (ESTILO SMALLPDF) ───
interface ToolSection {
  id: string;
  title: string;
  tools: SmallpdfToolItem[];
}

const TOOL_SECTIONS: ToolSection[] = [
  {
    id: "popular",
    title: "Herramientas Más Usadas",
    tools: POPULAR_TOOLS,
  },
  {
    id: "organize",
    title: "Organizar y Gestionar Páginas",
    tools: [
      {
        id: "merge",
        iconName: "copy-plus",
        title: "Unir PDFs",
        desc: "Junta varios documentos PDF en un solo archivo organizado.",
        color: "#2563eb",
        bg: "#eff6ff",
      },
      {
        id: "split",
        iconName: "scissors",
        title: "Dividir PDF",
        desc: "Separa páginas o extrae rangos de fojas en archivos nuevos.",
        color: "#ea580c",
        bg: "#fff7ed",
      },
      {
        id: "extractPages",
        iconName: "download",
        title: "Extraer Páginas",
        desc: "Guarda páginas seleccionadas en un documento independiente.",
        color: "#4f46e5",
        bg: "#eef2ff",
      },
      {
        id: "rotate",
        iconName: "rotate-cw",
        title: "Rotar Páginas",
        desc: "Gira páginas en 90°, 180° o ajusta su orientación horizontal y vertical.",
        color: "#0d9488",
        bg: "#f0fdfa",
      },
      {
        id: "crop",
        iconName: "crop",
        title: "Recortar Márgenes",
        desc: "Elimina bordes en blanco o ajusta el encuadre visible de las páginas.",
        color: "#0891b2",
        bg: "#ecfeff",
      },
      {
        id: "removePages",
        iconName: "file-x",
        title: "Eliminar Páginas",
        desc: "Suprime hojas en blanco, errores o páginas que no necesites.",
        color: "#dc2626",
        bg: "#fef2f2",
      },
      {
        id: "addPageNumbers",
        iconName: "file-digit",
        title: "Foliar y Numerar",
        desc: "Inserta numeración correlativa o foliación en el encabezado o pie.",
        color: "#b8924a",
        bg: "#faf7ee",
      },
      {
        id: "flatten",
        iconName: "layers",
        title: "Aplanar PDF",
        desc: "Bloquea formularios y unifica capas para evitar modificaciones.",
        color: "#475569",
        bg: "#f1f5f9",
      },
    ],
  },
  {
    id: "convert",
    title: "Convertir y Reconocimiento de Texto",
    tools: [
      {
        id: "convert",
        iconName: "file-convert",
        title: "Convertidor Universal",
        desc: "Convierte entre PDF y Word, Excel, PowerPoint o imágenes.",
        color: "#059669",
        bg: "#ecfdf5",
      },
      {
        id: "ocr",
        iconName: "scan-text",
        title: "Reconocimiento OCR",
        desc: "Transforma escaneos e imágenes en texto buscable y copiable.",
        color: "#0284c7",
        bg: "#f0f9ff",
      },
      {
        id: "extractImages",
        iconName: "image",
        title: "Extraer Imágenes",
        desc: "Exporta todas las fotografías e ilustraciones contenidas en el PDF.",
        color: "#db2777",
        bg: "#fdf2f8",
      },
      {
        id: "pdfTextEditor",
        iconName: "file-pen",
        title: "Editar Texto en PDF",
        desc: "Modifica o agrega texto directamente en las páginas del documento.",
        color: "#7c3aed",
        bg: "#f5f3ff",
      },
    ],
  },
  {
    id: "optimize",
    title: "Optimizar y Reparar",
    tools: [
      {
        id: "compress",
        iconName: "shrink",
        title: "Comprimir PDF",
        desc: "Reduce el peso del archivo para subirlo o enviarlo rápidamente.",
        color: "#e11d48",
        bg: "#fff1f2",
      },
      {
        id: "adjustContrast",
        iconName: "sun",
        title: "Mejorar Contraste",
        desc: "Aclara fondos oscuros y mejora la legibilidad de documentos escaneados.",
        color: "#d97706",
        bg: "#fffbeb",
      },
      {
        id: "repair",
        iconName: "wrench",
        title: "Reparar Documento",
        desc: "Recupera y reconstruye archivos PDF dañados o corruptos que no abren.",
        color: "#2563eb",
        bg: "#eff6ff",
      },
      {
        id: "sanitize",
        iconName: "shield-check",
        title: "Limpiar Metadatos",
        desc: "Remueve información oculta, historial y datos sensibles para mayor seguridad.",
        color: "#16a34a",
        bg: "#f0fdf4",
      },
    ],
  },
  {
    id: "security",
    title: "Seguridad y Firmas",
    tools: [
      {
        id: "sign",
        iconName: "signature",
        title: "Firmar Documento",
        desc: "Dibuja tu firma a mano alzada o coloca tu rúbrica en cualquier página.",
        color: "#7c3aed",
        bg: "#f5f3ff",
      },
      {
        id: "certSign",
        iconName: "award",
        title: "Firma Digital (Token/DNIe)",
        desc: "Firma con certificado digital o token con plena validez legal.",
        color: "#1d4ed8",
        bg: "#eff6ff",
      },
      {
        id: "addPassword",
        iconName: "lock",
        title: "Proteger con Clave",
        desc: "Cifra tu PDF con contraseña para proteger tu información.",
        color: "#8b1a2b",
        bg: "#fdf2f3",
      },
      {
        id: "removePassword",
        iconName: "lock-open",
        title: "Desbloquear PDF",
        desc: "Remueve la contraseña de un archivo protegido si posees autorización.",
        color: "#ef4444",
        bg: "#fef2f2",
      },
      {
        id: "validateSignature",
        iconName: "badge-check",
        title: "Validar Firmas",
        desc: "Verifica la autenticidad e integridad de firmas digitales existentes.",
        color: "#059669",
        bg: "#ecfdf5",
      },
      {
        id: "redact",
        iconName: "eye-off",
        title: "Tachar y Censurar",
        desc: "Oculta permanentemente información privada o confidencial en el PDF.",
        color: "#334155",
        bg: "#f1f5f9",
      },
      {
        id: "watermark",
        iconName: "stamp",
        title: "Marca de Agua",
        desc: "Agrega sellos institucionales, membretes o marcas de confidencialidad.",
        color: "#0891b2",
        bg: "#ecfeff",
      },
    ],
  },
];

// Diccionario exhaustivo de sinónimos para búsqueda natural
const TOOL_SEARCH_ALIASES: Partial<Record<ToolId, string[]>> = {
  merge: ["juntar", "combinar", "unir", "pegar", "armar", "mezclar", "anexar", "juntar hojas", "consolidar", "expediente", "anexos", "documentos", "varios pdfs"],
  split: ["partir", "separar", "cortar", "dividir", "desglosar", "extraer hojas", "sacar hojas", "paginas", "quitar hojas", "fraccionar", "hojas"],
  compress: ["reducir", "bajar peso", "peso", "comprimir", "optimizar", "tamano", "liviano", "achicar", "menos megas", "mb", "correo", "enviar", "whatsapp", "sinoe"],
  convert: ["word", "excel", "powerpoint", "imagen", "jpg", "png", "convertir", "transformar", "doc", "docx", "xls", "xlsx", "ppt", "formato", "pasar a", "foto a pdf"],
  sign: ["firmar", "rubrica", "trazar", "dibujar firma", "visar", "firma visual", "estampa", "mano alzada", "sign", "firma manuscrita"],
  certSign: ["certificado", "firma digital", "token", "dnie", "certificado digital", "validez legal", "pfx", "p12", "firmar con token"],
  validateSignature: ["verificar firma", "validar", "comprobar firma", "autenticidad", "integridad"],
  addPageNumbers: ["foliar", "foliatura", "numerar", "paginar", "numero de pagina", "pie de pagina", "encabezado", "hojas", "fojas", "orden"],
  addPassword: ["proteger", "bloquear", "clave", "contrasena", "seguridad", "cifrar", "candado", "privacidad", "restringir"],
  removePassword: ["quitar clave", "desbloquear", "desproteger", "quitar contrasena", "abrir pdf protegido", "remover seguridad"],
  ocr: ["reconocer texto", "escanear", "texto editable", "hacer buscable", "copiar texto de imagen", "ocr", "reconocimiento optico", "leer imagen"],
  watermark: ["marca de agua", "sello", "membrete", "borrador", "confidencial", "logo", "estampado"],
  redact: ["tachar", "censurar", "anonimizar", "ocultar", "borrar datos", "ocultar texto", "cubrir", "blackout", "blanquear"],
  rotate: ["girar", "rotar", "voltear", "enderezar", "orientacion", "vertical", "horizontal"],
  autoRotate: ["auto rotar", "girar", "enderezar automatico", "rotar", "alinear"],
  crop: ["recortar", "cortar bordes", "ajustar margenes", "encuadrar"],
  extractPages: ["extraer", "sacar hojas", "separar paginas", "guardar paginas", "extraer fojas"],
  extractImages: ["sacar fotos", "extraer imagenes", "guardar fotos", "exportar imagenes", "jpg", "png"],
  repair: ["reparar", "arreglar", "recuperar", "archivo danado", "corrupto", "solucionar"],
  adjustContrast: ["aclarar", "oscurecer", "mejorar escaneo", "contraste", "limpiar fondo", "nitidez", "blanquear fondo"],
  sanitize: ["limpiar", "desinfectar", "quitar metadatos", "anonimizar", "seguro"],
  flatten: ["aplanar", "fijar campos", "fijar anotaciones", "unificar capas", "convertir formularios"],
  removePages: ["borrar paginas", "eliminar hojas", "quitar hojas", "suprimir paginas"],
  removeBlanks: ["quitar hojas en blanco", "eliminar paginas vacias", "limpiar blancos"],
  removeAnnotations: ["quitar comentarios", "borrar notas", "limpiar marcas"],
  removeImage: ["quitar fotos", "borrar imagenes"],
  addImage: ["insertar foto", "poner imagen", "pegar imagen", "foto"],
  pdfTextEditor: ["editar", "modificar", "cambiar texto", "escribir en pdf", "corregir", "editar texto", "agregar texto"],
  addText: ["escribir", "agregar texto", "poner notas", "escribir en pdf"],
  annotate: ["comentar", "resaltar", "subrayar", "anotaciones", "marcar"],
  compare: ["comparar", "diferencias", "ver cambios", "cotejar"],
  multiTool: ["todo en uno", "editor avanzado", "multiherramienta", "combinar todo"],
  autoRename: ["renombrar automatico", "cambiar nombre", "clasificar", "organizar nombres"],
  formFill: ["llenar formulario", "completar datos", "rellenar campos"],
  autoFormDetection: ["detectar campos", "crear formulario"],
  scannerImageSplit: ["separar escaneos", "dividir fotos escaneadas", "cortar escaneo"],
};

interface QuickActionsHeroProps {
  onActionClick: (toolId: ToolId, droppedFiles?: File[]) => void;
  onGeneralUpload: () => void;
  onFilesDropped?: (files: File[]) => void;
  mobileUploadEnabled?: boolean;
  onMobileUpload?: () => void;
}

export function QuickActionsHero({
  onActionClick,
  onGeneralUpload,
  onFilesDropped: _onFilesDropped,
  mobileUploadEnabled,
  onMobileUpload,
}: QuickActionsHeroProps) {
  const navigate = useNavigate();
  const { toolAvailability } = useToolWorkflow();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [draggedOverCardId, setDraggedOverCardId] = useState<string | null>(null);

  // Comprobar disponibilidad real de una herramienta según el entorno
  const isToolAvailable = (toolId: ToolId) => {
    if (!toolAvailability) return true;
    const info = toolAvailability[toolId];
    return info ? info.available !== false : true;
  };

  // Lista total de herramientas únicas para búsqueda
  const allUniqueTools = useMemo(() => {
    const map = new Map<string, SmallpdfToolItem>();
    TOOL_SECTIONS.forEach((section) => {
      section.tools.forEach((tool) => {
        if (!map.has(tool.id)) {
          map.set(tool.id, tool);
        }
      });
    });
    return Array.from(map.values());
  }, []);

  // Lista filtrada para búsqueda en tiempo real
  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];

    return allUniqueTools.filter((tool) => {
      const name = tool.title.toLowerCase();
      const desc = tool.desc.toLowerCase();
      const aliases = (TOOL_SEARCH_ALIASES[tool.id] || []).join(" ").toLowerCase();
      return name.includes(term) || desc.includes(term) || aliases.includes(term);
    });
  }, [searchTerm, allUniqueTools]);

  // Manejo de Drag & Drop directo por tarjeta de herramienta
  const handleCardDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverCardId(id);
  };

  const handleCardDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverCardId(null);
  };

  const handleCardDrop = (e: React.DragEvent, toolId: ToolId) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedOverCardId(null);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      onActionClick(toolId, files);
    } else {
      onActionClick(toolId);
    }
  };

  // Renderizador de tarjeta Smallpdf limpia y moderna
  const renderSmallpdfCard = (item: SmallpdfToolItem) => {
    const available = isToolAvailable(item.id);
    const isDraggedOver = draggedOverCardId === item.id;

    return (
      <article
        key={item.id}
        className={`smallpdf-tool-card ${isDraggedOver ? "smallpdf-tool-card--dragover" : ""} ${!available ? "smallpdf-tool-card--disabled" : ""}`}
        style={
          {
            "--tool-color": item.color,
            "--tool-bg": item.bg,
          } as React.CSSProperties
        }
        onClick={() => {
          if (available) onActionClick(item.id);
        }}
        onDragOver={(e) => {
          if (available) handleCardDragOver(e, item.id);
        }}
        onDragLeave={handleCardDragLeave}
        onDrop={(e) => {
          if (available) handleCardDrop(e, item.id);
        }}
        role="button"
        tabIndex={available ? 0 : -1}
        aria-disabled={!available}
        onKeyDown={(e) => {
          if (available && (e.key === "Enter" || e.key === " ")) {
            onActionClick(item.id);
          }
        }}
      >
        <div className="smallpdf-card-icon-box">
          <Icon name={item.iconName} size="1.65rem" />
        </div>

        <div className="smallpdf-card-text">
          <h3 className="smallpdf-card-title">{item.title}</h3>
          <p className="smallpdf-card-desc">{item.desc}</p>
        </div>

        {isDraggedOver && (
          <div className="smallpdf-card-drop-badge">
            <Icon name="file-plus" size="1.05rem" />
            <span>Soltar archivo aquí</span>
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="app-portal-layout">
      {/* ── 1. CABECERA INSTITUCIONAL UNIFICADA Y CONTINUA (SIN CAJÓN SEPARADO) ── */}
      <header className="app-unified-header">
        <div className="app-unified-header-inner">
          {/* 1. LADO IZQUIERDO: MARCA OFICIAL PJ-DOCS */}
          <div className="app-pjdocs-brand">
            <img
              src="/logo-pjdocs.webp"
              alt="PJ-DOCS Logo"
              className="app-pjdocs-logo"
            />
            <span className="app-pjdocs-title">PJ-DOCS</span>
          </div>

          {/* 2. CENTRO: BUSCADOR INTERACTIVO */}
          <div className="app-search-box">
            <Icon name="search" size="1.05rem" className="app-search-icon" />
            <input
              type="text"
              className="app-search-input"
              aria-label="Buscar herramienta"
              placeholder="¿Qué deseas hacer? (ej: unir, comprimir, firmar, convertir)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="app-search-clear"
                onClick={() => setSearchTerm("")}
                title="Borrar búsqueda"
              >
                <Icon name="x" size="0.9rem" />
              </button>
            )}
          </div>

          {/* 3. LADO DERECHO: ACCIONES DIRECTAS + ESCUDO OFICIAL CSJLA */}
          <div className="app-header-right-group">
            <div className="app-header-actions">
              <button
                type="button"
                className="app-header-open-btn"
                onClick={onGeneralUpload}
                title="Abrir cualquier archivo directamente"
              >
                <Icon name="folder-open" size="1.05rem" />
                <span>Abrir archivo</span>
              </button>

              {mobileUploadEnabled && onMobileUpload && (
                <button
                  type="button"
                  className="app-header-mobile-btn"
                  onClick={onMobileUpload}
                  title="Escanear código QR para digitalizar desde tu celular"
                  aria-label="Escanear código QR para conectar tu celular"
                >
                  <Icon name="qr-code" size="1.15rem" />
                </button>
              )}

              <button
                type="button"
                className="app-header-settings-btn"
                onClick={() => navigate("/settings")}
                title="Ajustes y configuración del sistema"
                aria-label="Configuración"
              >
                <Icon name="settings" size="1.15rem" />
              </button>
            </div>

            <div className="app-header-court-divider" aria-hidden="true" />

            <div
              className="app-court-logo-container"
              title="Corte Superior de Justicia de Lambayeque"
            >
              <img
                src="/logo-csjla-header.webp"
                alt="Corte Superior de Justicia de Lambayeque"
                className="app-court-logo"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. CUERPO DEL PORTAL: CATÁLOGO DE TARJETAS SMALLPDF ── */}
      <div className="app-portal-body">
        <main className="smallpdf-catalog-container">
          {/* CASO A: BÚSQUEDA ACTIVA */}
          {searchTerm ? (
            <section className="smallpdf-search-section">
              <div className="smallpdf-section-header">
                <h2 className="smallpdf-section-title">
                  Resultados de búsqueda
                </h2>
                <span className="smallpdf-section-badge">
                  {searchResults.length} herramientas encontradas
                </span>
              </div>

              {searchResults.length > 0 ? (
                <div className="smallpdf-tools-grid">
                  {searchResults.map((tool) => renderSmallpdfCard(tool))}
                </div>
              ) : (
                <div className="smallpdf-empty-results">
                  <Icon name="search" size="2.5rem" />
                  <h3>No encontramos herramientas para &ldquo;{searchTerm}&rdquo;</h3>
                  <p>
                    Prueba con términos sencillos como: <em>unir, comprimir, firmar, convertir, separar o contraseña</em>.
                  </p>
                  <button
                    type="button"
                    className="smallpdf-clear-btn"
                    onClick={() => setSearchTerm("")}
                  >
                    Ver todas las herramientas
                  </button>
                </div>
              )}
            </section>
          ) : (
            /* CASO B: PORTAL PRINCIPAL ORGANIZADO POR SECCIONES (ESTILO SMALLPDF) */
            TOOL_SECTIONS.map((section) => (
              <section key={section.id} className="smallpdf-section">
                <div className="smallpdf-section-header">
                  <h2 className="smallpdf-section-title">{section.title}</h2>
                </div>
                <div className="smallpdf-tools-grid">
                  {section.tools.map((tool) => renderSmallpdfCard(tool))}
                </div>
              </section>
            ))
          )}
        </main>

        {/* ── 3. FIRMA INSTITUCIONAL INFORMÁTICA - CSJLA ── */}
        <footer className="app-portal-signature">
          <div className="portal-footer-signature-content">
            <img
              src="/oid-tec.webp"
              alt="Informática - CSJLA"
              className="portal-footer-oid-logo"
            />
            <span className="portal-footer-signature-text">
              Informática - CSJLA | Alejandro R.M
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
