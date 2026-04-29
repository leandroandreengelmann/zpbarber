import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZP Barber",
    short_name: "ZP Barber",
    description: "Gestão completa para barbearias",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#2970ff",
    lang: "pt-BR",
    dir: "ltr",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/symbol.png",
        sizes: "1000x1000",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/symbol.png",
        sizes: "1000x1000",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Agenda",
        short_name: "Agenda",
        url: "/app/agenda",
        description: "Ver agenda do dia",
      },
      {
        name: "Caixa",
        short_name: "Caixa",
        url: "/app/caixa",
        description: "Abrir caixa",
      },
      {
        name: "Clientes",
        short_name: "Clientes",
        url: "/app/clientes",
        description: "Lista de clientes",
      },
    ],
  };
}
