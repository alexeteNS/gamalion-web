import type { PromoBannerItem } from "../models/promoBanner";

export const defaultPromoBanners: PromoBannerItem[] = [
    {
        id: "promo-laptops",
        tag: "LAPTOPS GAMER & RTX",
        titleLine1: "HASTA 15%",
        titleLine2: "DE DESCUENTO",
        buttonText: "Ver más",
        category: "laptops",
        imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=80",
        imageBg: "#1e1b4b",
    },
    {
        id: "promo-perifericos",
        tag: "MONITORES & PERIFÉRICOS",
        titleLine1: "HASTA 20% EN",
        titleLine2: "EQUIPOS SELECCIONADOS",
        buttonText: "Ver más",
        category: "monitores",
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=80",
        imageBg: "#0f172a",
    },
];
