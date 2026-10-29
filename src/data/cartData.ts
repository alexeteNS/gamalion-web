import type { CartItem } from "../models/cart";

export const initialCartItems: CartItem[] = [
    {
        id: "cart-hp-prostudio",
        sku: "588117",
        model: "E26N5AT#ABM",
        brand: "HP",
        title: "PC All In One HP ProStudio 2 G2a",
        description:
            'PC All In One HP ProStudio 2 G2a: Procesador AMD Ryzen AI 7 445 (hasta 4.6 GHz), Memoria de 16GB DDR5, SSD de 512GB, Pantalla de 23.8" LED, Video Radeon 840M, S.O. Windows 11 Pro.',
        imageUrl:
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80",
        price: 26099,
        originalPrice: 27999,
        quantity: 1,
        category: "laptops",
    },
    {
        id: "lap-hp-255r-512",
        sku: "576173",
        model: "CZ1P1LT#ABM",
        brand: "HP",
        title: "Laptop HP 255R",
        description:
            'Laptop HP 255R: Procesador AMD Ryzen 5 7520U (hasta 4.3 GHz), Memoria de 16GB LPDDR5, SSD de 512GB, Pantalla de 15.6" LED HD (1366 x 768), Video Radeon Graphics, S.O. Windows 11 Home (Teclado en Español).',
        imageUrl:
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80",
        price: 10999,
        originalPrice: 11499,
        quantity: 1,
        category: "laptops",
    },
];
