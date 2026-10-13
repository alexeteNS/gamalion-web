import type { ProductCardItem } from "../models/product";
import productsJson from "./products.json";

export interface CategorySliderConfig {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    products: ProductCardItem[];
    viewAllLink?: string;
    viewAllText?: string;
}

export const allProducts: ProductCardItem[] = productsJson as ProductCardItem[];

export const getProductsByCategory = (category: string): ProductCardItem[] => {
    return allProducts.filter((p) => p.category === category);
};

export const categorySlidersData: CategorySliderConfig[] = [
    {
        id: "laptops-slider",
        title: "Notebooks Gamer & Rendimiento",
        subtitle: "POTENCIA PORTÁTIL DE ÚLTIMA GENERACIÓN",
        category: "laptops",
        products: getProductsByCategory("laptops"),
        viewAllLink: "/categoria/laptops",
        viewAllText: "Ver todas las Laptops"
    },
    {
        id: "monitores-slider",
        title: "Monitores Gamer & Productividad",
        subtitle: "ALTA TASA DE REFRESCO Y COLOR OLED / FAST IPS",
        category: "monitores",
        products: getProductsByCategory("monitores"),
        viewAllLink: "/categoria/monitores",
        viewAllText: "Ver todos los Monitores"
    },
    {
        id: "componentes-slider",
        title: "Favoritos de la Comunidad",
        subtitle: "LO MÁS VENDIDO DE LA SEMANA",
        category: "componentes",
        products: getProductsByCategory("componentes"),
        viewAllLink: "/categoria/componentes",
        viewAllText: "Ver todos los Componentes"
    },
    {
        id: "perifericos-slider",
        title: "Periféricos & Setups Pro",
        subtitle: "EQUIPAMIENTO DE ALTA COMPETICIÓN",
        category: "perifericos",
        products: getProductsByCategory("perifericos"),
        viewAllLink: "/categoria/perifericos",
        viewAllText: "Ver todos los Periféricos"
    }
];
