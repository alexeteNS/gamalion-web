import type {
    FooterColumn,
    FooterContactInfo,
    FooterSocialLink,
} from "../models/footer";

export const footerContactInfo: FooterContactInfo = {
    email: "Gamaliondigital@gmail.com",
    phoneDisplay: "5216866048668",
    whatsappNumber: "5216866048668",
};

export const footerSocialLinks: FooterSocialLink[] = [
    {
        id: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/",
    },
    {
        id: "facebook",
        label: "Facebook",
        url: "https://www.facebook.com/",
    },
];

export const footerColumnsData: FooterColumn[] = [
    {
        id: "sobre-nosotros",
        title: "Sobre nosotros",
        links: [
            { id: "quienes-somos", label: "Quiénes somos", content: "" },
            { id: "nuestra-historia", label: "Nuestra historia", content: "" },
            { id: "mision", label: "Misión", content: "" },
        ],
    },
    {
        id: "ayuda-soporte",
        title: "Ayuda y soporte",
        links: [
            { id: "faq", label: "Preguntas frecuentes (FAQ)", content: "" },
            { id: "rastreo-pedidos", label: "Rastreo de pedidos", content: "" },
            { id: "cambios-devoluciones", label: "Cambios y devoluciones", content: "" },
        ],
    },
    {
        id: "textos-legales",
        title: "Legal",
        links: [
            {
                id: "terminos-condiciones",
                label: "Aviso legal y Términos y condiciones de compra",
                content: "",
            },
            {
                id: "politica-privacidad",
                label: "Política de privacidad y protección de datos",
                content: "",
            },
            {
                id: "politica-cookies",
                label: "Política de cookies",
                content:
                    "En Gamalion Digital utilizamos cookies propias de carácter técnico para que el sitio funcione correctamente, conservar los productos agregados a tu carrito de compras y recordar los artículos que viste recientemente durante tu visita.\n\nEstas cookies no almacenan datos personales sensibles ni información de pago, y no se comparten con terceros.\n\nPuedes borrar o bloquear las cookies en cualquier momento desde la configuración de tu navegador. Si tienes alguna duda, contáctanos en Gamaliondigital@gmail.com.",
            },
        ],
    },
];

export const paymentMethodsList: string[] = [
    "Visa",
    "Mastercard",
    "PayPal",
    "Mercado Pago",
];
