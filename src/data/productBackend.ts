import type { ProductDetailsModel, ProductCardItem } from "../models/product";
import type { CategoryProductItem } from "../models/categoryPage";
import type { ReviewItem, RatingBreakdown, RatingStats } from "../models/review";
import { allProducts } from "./productsData";
import { categoryProductsData } from "./categoryPageData";

export type { ProductDetailsModel } from "../models/product";
export type { ReviewItem, RatingBreakdown, RatingStats } from "../models/review";

const categoryNamesMap: Record<string, string> = {
    laptops: "Laptops",
    monitores: "Monitores",
    perifericos: "Periféricos",
    componentes: "Componentes",
    procesadores: "Procesadores",
    "tarjetas-de-video": "Tarjetas de Video",
    almacenamiento: "Almacenamiento",
    "armado-pc": "Armado de PC",
};

const formatCurrency = (val: number): string => {
    return `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

function extractTitleSpecs(title: string, brand: string, category: string): string[] {
    const parts = title
        .replace(new RegExp(`^${brand}\\s+`, "i"), "")
        .split(/\s+(?=[0-9]{2}"|RTX|GTX|RX|i[579]-|Ryzen|QHD|FHD|4K|UHD|OLED|IPS|DDR[45]|NVMe|PCIe|[0-9]+GB|[0-9]+TB|[0-9]+Hz|[0-9]+W)/i)
        .map(s => s.trim())
        .filter(Boolean);

    if (parts.length >= 2) {
        return parts;
    }

    return [
        `Marca oficial: ${brand}`,
        `Categoría: ${categoryNamesMap[category] || "Hardware"}`,
        `Modelo original verificado con garantía de fábrica`,
    ];
}

export function buildProductDetails(
    selected?: ProductCardItem | CategoryProductItem | null
): ProductDetailsModel {
    const targetId = selected ? String(selected.id) : String(allProducts[0].id);

    const categoryMatch = categoryProductsData.find(p => String(p.id) === targetId);
    const homeMatch = allProducts.find(p => String(p.id) === targetId);

    const base = selected || categoryMatch || homeMatch || allProducts[0];

    const id = String(base.id);
    const brand = base.brand || "GAMALION";
    const title = base.title;
    const category = base.category || categoryMatch?.category || homeMatch?.category || "laptops";
    const categoryLabel = categoryNamesMap[category] || "Catálogo";

    const sku =
        ("sku" in base && base.sku) ||
        categoryMatch?.sku ||
        `GML-${id.toUpperCase()}`;

    const model =
        ("model" in base && base.model) ||
        categoryMatch?.model ||
        `${brand.toUpperCase()}-${id.toUpperCase()}`;

    const specsList =
        ("specs" in base && Array.isArray(base.specs) && base.specs.length > 0
            ? base.specs
            : categoryMatch?.specs) || extractTitleSpecs(title, brand, category);

    const description =
        ("description" in base && base.description) ||
        `${title} de ${brand}. Equipo disponible en nuestro catálogo de ${categoryLabel.toLowerCase()} con garantía directa en Gamalion Digital. Características principales: ${specsList.join(" · ")}.`;

    const price = base.price;
    const originalPrice = base.originalPrice;
    const hasDiscount = Boolean(originalPrice && originalPrice > price);
    const discountSavings = hasDiscount && originalPrice ? originalPrice - price : 0;

    const sameCategoryImages = [
        ...allProducts.filter(p => p.category === category && String(p.id) !== id).map(p => p.imageUrl),
        ...categoryProductsData.filter(p => p.category === category && String(p.id) !== id).map(p => p.imageUrl),
    ];

    const uniqueExtraImages = Array.from(new Set(sameCategoryImages)).filter(
        url => url !== base.imageUrl
    );

    const images = [base.imageUrl, ...uniqueExtraImages.slice(0, 3)];

    const specsRecord: Record<string, (string | string[])[]> = {
        "Especificaciones técnicas": [
            `Ficha técnica de ${title} (${brand}):`,
            specsList,
            `SKU: ${sku} · Modelo: ${model}`,
        ],
        "Contenido de la caja": [
            `Incluye de fábrica en su empaque sellado:`,
            [
                title,
                "Cables y accesorios originales del fabricante",
                "Manual de usuario y póliza de garantía",
            ],
        ],
        "Entrega y garantía": [
            "Respaldo directo con Gamalion Digital:",
            [
                "Producto nuevo y original verificado",
                "Entrega local y envíos asegurados",
                "Garantía contra defectos de fábrica y soporte técnico directo",
            ],
        ],
    };

    return {
        id,
        sku,
        model,
        brand,
        category,
        categoryLabel,
        title,
        description,
        price,
        originalPrice,
        hasDiscount,
        discountSavings,
        formattedPrice: formatCurrency(price),
        formattedOriginalPrice: hasDiscount && originalPrice ? formatCurrency(originalPrice) : undefined,
        formattedSavings: hasDiscount ? formatCurrency(discountSavings) : undefined,
        colors: ["#0f172a", "#475569", "#cbd5e1"],
        images,
        specs: specsRecord,
        bannerImages: [],
    };
}

export function getRelatedProducts(
    currentId: string,
    category: string
): ProductCardItem[] {
    const fromHome = allProducts.filter(
        p => p.category === category && String(p.id) !== currentId
    );

    const fromCategory: ProductCardItem[] = categoryProductsData
        .filter(p => p.category === category && String(p.id) !== currentId)
        .map(item => ({
            id: item.id,
            sku: item.sku,
            model: item.model,
            title: item.title,
            brand: item.brand,
            specs: item.specs,
            price: item.price,
            originalPrice: item.originalPrice,
            rating: 4.8,
            reviewCount: 94,
            imageUrl: item.imageUrl,
            category: item.category,
        }));

    const combined = [...fromHome, ...fromCategory];
    const seen = new Set<string>();
    return combined.filter(item => {
        const key = String(item.id);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

export const productData: ProductDetailsModel = buildProductDetails(allProducts[0]);

export const initialReviews: ReviewItem[] = [
    {
        id: 1,
        author: "Jose Antonio Dorantes",
        rating: 5,
        title: "Excelente equipo y atención rápida",
        date: "22 de agosto de 2026",
        location: "Mexicali",
        variant: "Compra verificada",
        content:
            "Muy buena atención, el equipo llegó completamente sellado y rinde tal como esperaba para trabajo pesado y juegos. La entrega fue puntual.",
        helpfulCount: 7,
        verified: true,
    },
    {
        id: 2,
        author: "Mariana Silva R.",
        rating: 5,
        title: "Todo original y en perfecto estado",
        date: "15 de septiembre de 2026",
        location: "México",
        variant: "Compra verificada",
        content:
            "Excelente relación calidad-precio. Me resolvieron todas las dudas antes de comprar y el producto cumple al 100% con las especificaciones.",
        helpfulCount: 4,
        verified: true,
    },
    {
        id: 3,
        author: "Carlos E. Mendoza",
        rating: 4,
        title: "Muy buen rendimiento",
        date: "2 de octubre de 2026",
        location: "México",
        variant: "Compra verificada",
        content:
            "Las temperaturas y la velocidad son muy buenas desde el primer día. Recomendado comprar aquí por la confianza y garantía.",
        helpfulCount: 3,
        verified: true,
    },
];

export const calculateRatingStats = (reviews: ReviewItem[]): RatingStats => {
    if (reviews.length === 0) {
        return {
            averageRating: 0,
            totalReviews: 0,
            breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
            positivePercentage: 0,
        };
    }

    const breakdown: RatingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalScore = 0;
    let positiveCount = 0;

    reviews.forEach(review => {
        const star = Math.min(5, Math.max(1, Math.round(review.rating))) as 1 | 2 | 3 | 4 | 5;
        breakdown[star] = (breakdown[star] || 0) + 1;
        totalScore += review.rating;
        if (review.rating >= 4) {
            positiveCount++;
        }
    });

    const averageRating = Number((totalScore / reviews.length).toFixed(1));
    const positivePercentage = Math.round((positiveCount / reviews.length) * 100);

    return {
        averageRating,
        totalReviews: reviews.length,
        breakdown,
        positivePercentage,
    };
};

export const WHATSAPP_PHONE = "5216866048668";

export const createWhatsAppUrl = (productTitle: string, price: string, quantity: number): string => {
    const text = encodeURIComponent(
        `Hola Gamalion Digital, me interesa ${productTitle} (${quantity} unidad/es) por ${price}. ¿Tienen disponibilidad inmediata?`
    );
    return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
};
