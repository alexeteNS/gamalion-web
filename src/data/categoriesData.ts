import type { CategoryItem } from "../models/category";

export const featuredCategories: CategoryItem[] = [
    {
        id: "procesadores",
        name: "Procesadores",
        icon: "cpu",
        link: "/categoria/procesadores"
    },
    {
        id: "tarjetas-de-video",
        name: "Tarjetas de Video",
        icon: "gpu",
        link: "/categoria/tarjetas-de-video"
    },
    {
        id: "laptops",
        name: "Laptops",
        icon: "laptop",
        link: "/categoria/laptops"
    },
    {
        id: "almacenamiento",
        name: "Almacenamiento",
        icon: "storage",
        link: "/categoria/almacenamiento"
    }
];
