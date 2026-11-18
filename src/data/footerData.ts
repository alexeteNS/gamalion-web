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
            {
                id: "quienes-somos",
                label: "Quiénes somos",
                content:
                    "Gamalion Digital es una tienda especializada en hardware de alto rendimiento, equipos de cómputo, periféricos gamer y soluciones tecnológicas en México.\n\nNuestro equipo selecciona componentes originales de marcas líderes con garantía local, asesoría técnica real y transparencia en precios (MXN) y disponibilidad en tiempo real.",
            },
            {
                id: "nuestra-historia",
                label: "Nuestra historia",
                content:
                    "Nacimos en Mexicali, Baja California con el propósito de acercar tarjetas gráficas, procesadores, monitores y setups profesionales sin sobreprecios ni intermediarios opacos.\n\nLo que comenzó atendiendo ensambles personalizados hoy opera con un catálogo curado en línea, inventario verificado y envíos asegurados a todo México.",
            },
            {
                id: "mision",
                label: "Misión",
                content:
                    "Impulsar cada proyecto profesional, creativo o competitivo con hardware confiable, precios justos en pesos mexicanos y soporte humano de principio a fin.\n\nCreemos en recomendar exactamente el componente que necesitas para que tu inversión rinda al máximo desde el primer día.",
            },
        ],
    },
    {
        id: "ayuda-soporte",
        title: "Ayuda y soporte",
        links: [
            {
                id: "faq",
                label: "Preguntas frecuentes (FAQ)",
                content:
                    "¿Los precios mostrados ya están en pesos mexicanos (MXN)?\nSí, todo nuestro catálogo muestra precios vigentes en MXN y disponibilidad real de inventario.\n\n¿Cómo confirmo mi pedido?\nAl finalizar en el carrito registramos tu folio de orden en nuestra base de datos, apartamos tu inventario y generamos tu resumen listo para confirmar pago y envío por WhatsApp (+52 1 686 604 8668).\n\n¿Los productos son nuevos y tienen garantía?\nTodos los artículos son 100% nuevos, originales y cuentan con garantía directa contra defectos de fabricación.",
            },
            {
                id: "rastreo-pedidos",
                label: "Rastreo de pedidos",
                content:
                    "Al generar tu compra en Gamalion Digital recibes un código de pedido (por ejemplo, GML-202611-XXXXXX) con el estado de tu orden.\n\nEl módulo interactivo de rastreo en línea se encuentra en desarrollo. Mientras tanto, puedes consultar tu guía de paquetería y estatus en tiempo real escribiéndonos por WhatsApp al +52 1 686 604 8668 o a Gamaliondigital@gmail.com indicando tu folio.",
            },
            {
                id: "cambios-devoluciones",
                label: "Cambios y devoluciones",
                content:
                    "Si recibiste un producto con daño físico de paquetería o falla de fábrica dentro de los primeros 7 días naturales tras la entrega, contáctanos de inmediato a Gamaliondigital@gmail.com o por WhatsApp con tu número de pedido.\n\nPara agilizar cualquier cambio o garantía es indispensable conservar el empaque original completo, accesorios, manuales y número de serie legible.",
            },
        ],
    },
    {
        id: "textos-legales",
        title: "Legal",
        links: [
            {
                id: "terminos-condiciones",
                label: "Aviso legal y Términos y condiciones de compra",
                content:
                    "Todos los precios publicados en Gamalion Digital se expresan en Pesos Mexicanos (MXN) y están sujetos a disponibilidad de inventario al momento de confirmar el pedido.\n\nLa creación de un pedido reserva temporalmente el stock indicado y asigna un código de seguimiento único. Gamalion Digital se reserva el derecho de verificar disponibilidad y validar pagos antes del embarque.\n\nLas marcas registradas, fotografías e identificadores pertenecen a sus respectivos fabricantes y se utilizan únicamente con fines descriptivos.",
            },
            {
                id: "politica-privacidad",
                label: "Política de privacidad y protección de datos",
                content:
                    "Gamalion Digital protege tus datos personales conforme a la legislación aplicable en México.\n\nLa información que nos compartes al realizar un pedido (nombre, teléfono, correo electrónico y dirección de entrega) se utiliza exclusivamente para procesar tu compra, coordinar el envío y brindar soporte de garantía.\n\nNo vendemos ni compartimos tu información personal con terceros ajenos a la logística de entrega. Para ejercer tus derechos de acceso, rectificación o cancelación, escribe a Gamaliondigital@gmail.com.",
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
