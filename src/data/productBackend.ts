import type { ProductDetailsModel } from "../models/product";
import type { ReviewItem, RatingBreakdown, RatingStats } from "../models/review";

export type { ProductDetailsModel } from "../models/product";
export type { ReviewItem, RatingBreakdown, RatingStats } from "../models/review";

const rawProduct = {
    id: "iphone-14-pro-max",
    brand: "Apple",
    title: "Apple iPhone 14 Pro Max",
    description: "The Apple iPhone 14 Pro Max is a premium smartphone that offers cutting-edge technology, a stunning display, and an advanced camera system. With its sleek design and powerful performance, it is perfect for those who demand the best in mobile technology.",
    price: 1099,
    originalPrice: 1299,
    colors: ["#0f172a", "#64748b", "#cbd5e1"],
    images: [
        "https://picsum.photos/400/400?random=1",
        "https://picsum.photos/400/400?random=2",
        "https://picsum.photos/400/400?random=3",
        "https://picsum.photos/400/400?random=4",
    ],
    specs: {
        "Technical Spec Details": [
            "Super Retina XDR display with ProMotion technology and Always-On display.",
            [
                "A16 Bionic chip with 6-core CPU and 5-core GPU",
                "48MP Main camera with advanced quad-pixel sensor",
                "All-day battery life with up to 29 hours of video playback",
                "Emergency SOS via satellite and Crash Detection"
            ],
            "Designed for durability with Ceramic Shield front and surgical-grade stainless steel."
        ],
        "What's in the Box": [
            "Inside the package you will find:",
            [
                "iPhone 14 Pro Max",
                "USB-C to Lightning Cable",
                "Documentation and SIM ejector tool"
            ],
            "Note: Power adapter and EarPods are sold separately."
        ],
        "Shipping & Returns Policy": [
            "Fast and reliable delivery options:",
            [
                "Free standard two-day delivery on all orders",
                "14-day return window from delivery date",
                "Free returns online or at any official store"
            ],
            "Items must be in original condition with all accessories included."
        ]
    },
    bannerImages: [
        "https://picsum.photos/1000/450?random=10",
        "https://picsum.photos/1000/450?random=11",
    ]
};

const formatCurrency = (val: number): string => {
    return `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const hasDiscount = Boolean(rawProduct.originalPrice && rawProduct.originalPrice > rawProduct.price);
const discountSavings = hasDiscount ? (rawProduct.originalPrice - rawProduct.price) : 0;

export const productData: ProductDetailsModel = {
    ...rawProduct,
    hasDiscount,
    discountSavings,
    formattedPrice: formatCurrency(rawProduct.price),
    formattedOriginalPrice: hasDiscount ? formatCurrency(rawProduct.originalPrice) : undefined,
    formattedSavings: hasDiscount ? formatCurrency(discountSavings) : undefined,
};

export const initialReviews: ReviewItem[] = [
    {
        id: 1,
        author: "Jose Antonio Dorantes Ponce",
        rating: 5,
        title: "Excelente compra",
        date: "22 de agosto de 2026",
        location: "México",
        variant: "Modelo 2026 con NPU",
        content: "Después de comparar varias opciones, me decidí por esta ASUS y hasta ahora ha sido una muy buena compra. Es bastante ligera y funciona muy bien para mis actividades diarias: puedo trabajar con varias pestañas, hacer videollamadas y usar diferentes programas al mismo tiempo sin notar que se vuelva lenta. También me ha gustado mucho la duración de la batería.\n\nLa recomiendo para quienes buscan una laptop práctica, rápida y fácil de llevar a cualquier lugar.",
        helpfulCount: 7,
        verified: true,
    },
    {
        id: 2,
        author: "Mariana Silva R.",
        rating: 4,
        title: "Muy buena calidad y acabados premium",
        date: "15 de septiembre de 2026",
        location: "México",
        variant: "Space Gray · 256GB",
        content: "El diseño y la construcción son de primer nivel. El sonido es envolvente y la cancelación de ruido activa es sorprendente. El único detalle a considerar es el peso en sesiones muy prolongadas, pero en general vale totalmente la pena.",
        helpfulCount: 3,
        verified: true,
    },
    {
        id: 3,
        author: "Carlos E. Mendoza",
        rating: 5,
        title: "Superó completamente mis expectativas",
        date: "2 de octubre de 2026",
        location: "España",
        variant: "Silver · 512GB",
        content: "La pantalla y el rendimiento no tienen comparación. La batería dura fácilmente más de un día con uso intenso de trabajo y multimedia. 100% recomendado.",
        helpfulCount: 5,
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

export const createWhatsAppUrl = (productTitle: string, price: string, quantity: number): string => {
    const text = encodeURIComponent(
        `Hola Gamalion Digital, me interesa ${productTitle} (${quantity} unidad/es) por ${price}. ¿Tienen disponibilidad inmediata?`
    );
    return `https://wa.me/?text=${text}`;
};
