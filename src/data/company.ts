export const company = {
  nombre: "INVERSA",
  lema: "Tecnología en movimiento",
  sitioWeb: "https://www.inversati.com",
  cobertura: "Ciudad de México y área metropolitana",
  descripcion:
    "INVERSA es una empresa mexicana dedicada a la comercialización de productos tecnológicos y al desarrollo de soluciones digitales para empresas y organizaciones. Reunimos equipamiento de cómputo, periféricos, infraestructura de redes y servidores, junto con desarrollo de software, aplicaciones móviles, sitios web, comercio electrónico, mantenimiento y consultoría tecnológica. Operamos en la Ciudad de México y su área metropolitana.",
  nuestraEmpresa:
    "Somos una empresa mexicana de reciente creación que ya ha trabajado con clientes y participado en proyectos tecnológicos. Buscamos ser un punto de contacto único para adquirir tecnología y obtener soluciones digitales a medida.",
  mision:
    "Proporcionar productos y soluciones tecnológicas que contribuyan a mejorar la productividad, conectividad y eficiencia de nuestros clientes, mediante una atención profesional y servicios adaptados a sus necesidades.",
  vision:
    "Consolidarnos como una empresa mexicana reconocida por la calidad de sus soluciones tecnológicas, la confianza de sus clientes y su capacidad para integrar equipamiento, infraestructura y desarrollo digital.",
  valores: [
    "Compromiso",
    "Innovación",
    "Integridad",
    "Calidad",
    "Orientación al cliente",
    "Mejora continua",
  ],
  proceso: [
    "Diagnóstico de requerimientos",
    "Propuesta de solución",
    "Planeación y cotización",
    "Suministro o desarrollo",
    "Entrega, validación y seguimiento (garantía, soporte o mantenimiento)",
  ],
  sectores: ["Empresas privadas", "Instituciones públicas"],
  negocios: [
    {
      titulo: "Equipamiento e infraestructura",
      items: [
        "Cómputo y periféricos: computadoras, laptops, periféricos y accesorios para entornos profesionales.",
        "Redes y conectividad: equipos e infraestructura para habilitar o ampliar la conectividad.",
        "Servidores y otros equipos: especificaciones, marcas, entrega y garantías se definen mediante cotización.",
      ],
    },
    {
      titulo: "Soluciones digitales",
      items: [
        "Software a medida: sistemas de gestión y herramientas administrativas según los procesos de cada organización.",
        "Sitios web y comercio electrónico: sitios corporativos, catálogos y tiendas en línea.",
        "Aplicaciones móviles: funcionalidades y plataformas definidas en cada proyecto.",
        "Consultoría y mantenimiento: asesoría, soporte y mejora continua.",
      ],
    },
  ],
  casos: [null, null, null],
  razonSocial: null as string | null,
  rfc: null as string | null,
  domicilioFiscal: null as string | null,
  telefono: null as string | null,
  whatsapp: null as string | null,
  correoContacto: null as string | null,
  correoPrivacidad: null as string | null,
  correoFacturacion: null as string | null,
  correoSoporte: null as string | null,
  horario: null as string | null,
  responsableDatos: null as string | null,
  coberturaEnvios: null as string | null,
  diasEntrega: null as number | null,
  envioGratisDesde: null as number | null,
  diasReembolso: null as number | null,
  anticipoPct: null as number | null,
  avancePct: null as number | null,
  finalPct: null as number | null,
  rondasAjustes: null as number | null,
  diasRevision: null as number | null,
  diasGarantiaSoftware: null as number | null,
  diasAvisoMantenimiento: null as number | null,
  fechaConstitucion: null as string | null,
  representanteLegal: null as string | null,
  equipoTecnico: null as string | null,
  marcasComercializadas: null as string | null,
  garantiasSoporte: null as string | null,
  certificaciones: null as string | null,
  transferencias: null as string | null,
  enviosNacionales: null as string | null,
  perfilPdf: "/docs/INVERSA_Perfil_Corporativo_2026.pdf",
};
export const pending = "Información pendiente";
export function whatsappUrl(message: string) {
  const phone = company.whatsapp?.replace(/\D/g, "");
  return phone
    ? "https://wa.me/" + phone + "?text=" + encodeURIComponent(message)
    : null;
}
