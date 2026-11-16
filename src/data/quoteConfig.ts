export interface QuoteOption {
  id: string;
  label: string;
  description: string;
  price: number;
  days: number;
  icon: string;
  requires?: string[];
  monthly?: number;
  timeFactor?: number;
  surcharge?: number;
}
export interface QuoteStep {
  id: string;
  title: string;
  question: string;
  type: "single" | "multiple" | "text" | "style" | "summary";
  required?: boolean;
  options?: QuoteOption[];
  otherInput?: boolean;
}
const option = (
  id: string,
  label: string,
  price = 0,
  days = 0,
  description = "Se define de acuerdo con los requerimientos.",
  requires?: string[],
  icon = "◇",
): QuoteOption => ({ id, label, price, days, description, requires, icon });
export const quoteConfig: {
  base: QuoteOption;
  vat: number;
  validityDays: number;
  legend: string;
  stack: string[];
  colors: string[];
  steps: QuoteStep[];
} = {
  base: option(
    "base",
    "Creación de la página",
    3800,
    3,
    "Diseño y estructura base de tu proyecto.",
    undefined,
    "▣",
  ),
  vat: 0.16,
  validityDays: 15,
  legend:
    "Estimación de referencia. El precio final se confirma tras revisar los requerimientos.",
  stack: ["PHP", "JavaScript", "Bootstrap", "HTML", "AJAX", "MySQL"],
  colors: ["#06b6d4", "#2563eb", "#7c3aed", "#059669", "#e11d48", "#d97706"],
  steps: [
    {
      id: "type",
      title: "Tipo de proyecto",
      question: "¿Qué vamos a construir?",
      type: "single",
      required: true,
      options: [
        option(
          "corporate",
          "Sitio web corporativo",
          0,
          0,
          "Presenta tu empresa y sus servicios.",
          undefined,
          "▣",
        ),
        option(
          "admin",
          "Sistema administrativo",
          0,
          0,
          "Organiza los procesos de tu empresa.",
          undefined,
          "▦",
        ),
        option(
          "store",
          "Catálogo / tienda",
          0,
          0,
          "Muestra tus productos y facilita las compras.",
          undefined,
          "▤",
        ),
        option(
          "portal",
          "Portal de clientes",
          0,
          0,
          "Un espacio para atender a tus clientes.",
          undefined,
          "◎",
        ),
        option(
          "custom",
          "Sistema a la medida",
          0,
          0,
          "Una solución para un proceso específico.",
          undefined,
          "⌘",
        ),
      ],
    },
    {
      id: "industry",
      title: "Giro",
      question: "¿En qué sector trabajas?",
      type: "single",
      required: true,
      otherInput: true,
      options: [
        option("health", "Salud"),
        option("education", "Educación"),
        option("food", "Restaurante / alimentos"),
        option("professional", "Despacho / servicios profesionales"),
        option("retail", "Comercio / retail"),
        option("industry", "Industria"),
        option("government", "Gobierno"),
        option("other", "Otro"),
      ],
    },
    {
      id: "name",
      title: "Nombre del proyecto",
      question: "¿Cómo se llama tu proyecto?",
      type: "text",
    },
    {
      id: "style",
      title: "Estilo visual",
      question: "¿Qué personalidad tendrá?",
      type: "style",
      required: true,
      options: [
        option(
          "minimal",
          "Minimalista corporativo",
          0,
          0,
          "Espacios amplios y tipografía limpia.",
        ),
        option(
          "tech",
          "Tech oscuro",
          0,
          0,
          "Contrastes oscuros y acentos luminosos.",
        ),
        option(
          "premium",
          "Elegante premium",
          0,
          0,
          "Tipografía serif y detalles sobrios.",
        ),
        option(
          "colorful",
          "Moderno colorido",
          0,
          0,
          "Bloques vivos y formas suaves.",
        ),
        option(
          "institutional",
          "Institucional",
          0,
          0,
          "Una estructura clara y formal.",
        ),
      ],
    },
    {
      id: "pages",
      title: "Páginas y secciones",
      question: "¿Qué secciones necesitas?",
      type: "multiple",
      otherInput: true,
      options: [
        option("home", "Inicio", 0, 0, "Incluida en la base."),
        ...[
          "Nosotros",
          "Servicios",
          "Productos",
          "Galería",
          "Blog/Noticias",
          "Preguntas frecuentes",
          "Contacto",
          "Aviso de privacidad",
          "Otra",
        ].map((l, i) =>
          option(
            i === 8 ? "other-page" : "page-" + i,
            l,
            450,
            0.5,
            "Página adicional de tu sitio.",
          ),
        ),
      ],
    },
    {
      id: "php",
      title: "Programación en PHP",
      question: "¿Qué procesos quieres digitalizar?",
      type: "multiple",
      options: [
        option(
          "ajax",
          "Formularios con AJAX",
          2500,
          2,
          "Envío de información sin recargar la página.",
        ),
        option(
          "panel",
          "Panel administrativo",
          2500,
          2,
          "Gestiona los contenidos y datos.",
        ),
        option(
          "logic",
          "Procesos/lógica a la medida",
          2500,
          2,
          "Automatiza las tareas de tu organización.",
        ),
        option(
          "apis",
          "Integración con APIs",
          2500,
          2,
          "Conecta servicios y plataformas.",
        ),
      ],
    },
    {
      id: "data",
      title: "Base de datos y datos",
      question: "¿Cómo manejarás tu información?",
      type: "multiple",
      options: [
        option(
          "mysql",
          "Base de datos MySQL",
          1800,
          2,
          "Almacenamiento estructurado de información.",
        ),
        option(
          "datatable",
          "Tablas DataTable",
          1200,
          1,
          "Búsqueda, filtros y paginación.",
          ["mysql"],
        ),
        option(
          "excel",
          "Exportar a Excel",
          1200,
          1,
          "Descarga tus datos en una hoja de cálculo.",
          ["mysql"],
        ),
      ],
    },
    {
      id: "security",
      title: "Usuarios y seguridad",
      question: "¿Quién usará tu sistema?",
      type: "multiple",
      options: [
        option(
          "users",
          "Usuarios con login",
          2500,
          2,
          "Acceso con una cuenta personal.",
        ),
        option(
          "roles",
          "Roles y permisos",
          1500,
          1,
          "Permisos según el perfil de cada usuario.",
          ["users"],
        ),
        option(
          "activity",
          "Bitácora de actividad de usuarios",
          1500,
          1,
          "Registro de las acciones realizadas.",
          ["users"],
        ),
      ],
    },
    {
      id: "documents",
      title: "Documentos",
      question: "¿Qué documentos generarás?",
      type: "multiple",
      options: [
        option(
          "pdf",
          "PDFs personalizados",
          1500,
          1,
          "Documentos con el diseño de tu empresa.",
        ),
        option(
          "word",
          "Words personalizados",
          1500,
          1,
          "Archivos editables con tu formato.",
        ),
        option(
          "qr",
          "Generador de códigos QR",
          800,
          0.5,
          "Comparte información mediante un código.",
        ),
      ],
    },
    {
      id: "tools",
      title: "Herramientas",
      question: "¿Qué herramientas te ayudarán?",
      type: "multiple",
      options: [
        option(
          "charts",
          "Gráficas/dashboards",
          1500,
          1,
          "Visualiza tus indicadores.",
        ),
        option(
          "calendar",
          "Calendario/agenda",
          1800,
          2,
          "Organiza eventos y citas.",
        ),
        option(
          "alerts",
          "Alertas personalizadas",
          1000,
          1,
          "Avisos claros dentro del sistema.",
        ),
        option(
          "email",
          "Correos personalizados",
          1200,
          1,
          "Notificaciones con tu identidad.",
        ),
        option(
          "chatbot",
          "Chatbot de respuestas predefinidas",
          2000,
          2,
          "Sin IA, por menú y reglas.",
        ),
      ],
    },
    {
      id: "appearance",
      title: "Apariencia",
      question: "¿Qué controles de apariencia quieres?",
      type: "multiple",
      options: [
        option(
          "dark",
          "Modo oscuro",
          800,
          0.5,
          "Permite alternar entre claro y oscuro.",
        ),
        option(
          "personalize",
          "Panel de personalización",
          2000,
          1.5,
          "Colores y apariencia elegidos por el usuario.",
        ),
      ],
    },
    {
      id: "delivery",
      title: "Entrega",
      question: "¿Qué ritmo de entrega necesitas?",
      type: "single",
      required: true,
      options: [
        {
          ...option("standard", "Estándar", 0, 0, "Sin recargo."),
          timeFactor: 1,
          surcharge: 0,
        },
        {
          ...option(
            "express",
            "Express",
            0,
            0,
            "−35% de tiempo, +20% del subtotal.",
          ),
          timeFactor: 0.65,
          surcharge: 0.2,
        },
        {
          ...option(
            "priority",
            "Prioritaria",
            0,
            0,
            "−50% de tiempo, +35% del subtotal.",
          ),
          timeFactor: 0.5,
          surcharge: 0.35,
        },
      ],
    },
    {
      id: "maintenance",
      title: "Mantenimiento mensual",
      question: "¿Te acompañamos después de entregar?",
      type: "single",
      required: true,
      options: [
        {
          ...option(
            "no-maintenance",
            "Sin mantenimiento",
            0,
            0,
            "Sin contratación mensual.",
          ),
          monthly: 0,
        },
        {
          ...option(
            "basic",
            "Básico",
            0,
            0,
            "Alcance por confirmar en propuesta formal.",
          ),
          monthly: 800,
        },
        {
          ...option(
            "plus",
            "Plus",
            0,
            0,
            "Alcance por confirmar en propuesta formal.",
          ),
          monthly: 1500,
        },
        {
          ...option(
            "premium-maintenance",
            "Premium",
            0,
            0,
            "Alcance por confirmar en propuesta formal.",
          ),
          monthly: 3000,
        },
      ],
    },
    {
      id: "summary",
      title: "Resumen final",
      question: "Tu proyecto empieza aquí.",
      type: "summary",
    },
  ],
};
export type QuoteAnswers = Record<string, string[]>;
export const initialAnswers: QuoteAnswers = { pages: ["home"] };
export function allOptions() {
  return quoteConfig.steps.flatMap((s) => s.options ?? []);
}
export function resolveSelection(
  answers: QuoteAnswers,
  step: string,
  id: string,
): { answers: QuoteAnswers; notice: string } {
  const current = answers[step] ?? [];
  const options = allOptions();
  const spec = quoteConfig.steps.find((s) => s.id === step)!;
  if (id === "home")
    return { answers, notice: "Inicio está incluido en la base." };
  let next = {
    ...answers,
    [step]:
      spec.type === "multiple"
        ? current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id]
        : [id],
  };
  let added: string[] = [];
  // Si se quita un requisito, se eliminan sus dependientes en cascada.
  if (current.includes(id) && spec.type === "multiple") {
    let removed = [id];
    let changed = true;
    while (changed) {
      changed = false;
      for (const o of options) {
        if (
          o.requires?.some((r) => removed.includes(r)) &&
          !removed.includes(o.id)
        ) {
          removed.push(o.id);
          changed = true;
        }
      }
    }
    next = Object.fromEntries(
      Object.entries(next).map(([k, v]) => [
        k,
        v.filter((x) => !removed.includes(x)),
      ]),
    );
  } else {
    function addRequirements(optionId: string) {
      for (const req of options.find((o) => o.id === optionId)?.requires ??
        []) {
        const s = quoteConfig.steps.find((s) =>
          s.options?.some((o) => o.id === req),
        )!;
        if (!next[s.id]?.includes(req)) {
          next[s.id] = [...(next[s.id] ?? []), req];
          added.push(options.find((o) => o.id === req)!.label);
          addRequirements(req);
        }
      }
    }
    addRequirements(id);
  }
  return {
    answers: next,
    notice:
      (current.includes(id) && spec.type === "multiple"
        ? "Quitado: "
        : "✓ Agregado: ") +
      (options.find((o) => o.id === id)?.label ?? id) +
      (added.length ? ". Requisito agregado: " + added.join(", ") : ""),
  };
}
export function calculateQuote(answers: QuoteAnswers) {
  const selected = allOptions().filter((o) =>
    Object.values(answers).flat().includes(o.id),
  );
  const base =
    quoteConfig.base.price + selected.reduce((s, o) => s + o.price, 0);
  const delivery = selected.find((o) => o.surcharge !== undefined);
  const surcharge = Math.round(base * (delivery?.surcharge ?? 0) * 100) / 100;
  const subtotal = base + surcharge;
  const vat = Math.round(subtotal * quoteConfig.vat * 100) / 100;
  return {
    selected,
    base,
    surcharge,
    subtotal,
    vat,
    total: subtotal + vat,
    days: Math.ceil(
      (quoteConfig.base.days + selected.reduce((s, o) => s + o.days, 0)) *
        (delivery?.timeFactor ?? 1),
    ),
    monthly: selected.find((o) => o.monthly !== undefined)?.monthly ?? 0,
  };
}
