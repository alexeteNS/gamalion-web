import type { HomeWidget, GridWidget, SingleWidget, ListWidget, SliderWidget } from "../models/widget";

export const eliteComponentsWidget: GridWidget = {
    id: "elite-components",
    title: "Componentes de Elite",
    type: "grid",
    linkText: "Explorar todo →",
    linkUrl: "/categoria/componentes",
    items: [
        {
            id: "comp-mb",
            title: "MAINBOARDS",
            imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
            link: "/categoria/mainboards"
        },
        {
            id: "comp-gpu",
            title: "GPUS",
            imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80",
            link: "/categoria/tarjetas-de-video"
        },
        {
            id: "comp-cpu",
            title: "PROCESSORS",
            imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80",
            link: "/categoria/procesadores"
        },
        {
            id: "comp-ram",
            title: "MEMORY",
            imageUrl: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80",
            link: "/categoria/memoria-ram"
        }
    ]
};

export const notebooksGamerWidget: SingleWidget = {
    id: "notebooks-gamer",
    title: "Notebooks Gamer",
    type: "single",
    linkText: "Ver modelos →",
    linkUrl: "/categoria/laptops",
    item: {
        id: "laptop-rog-scar-18",
        title: "ASUS ROG Strix Scar 18",
        badge: "YA DISPONIBLE",
        imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
        link: "/producto/asus-rog-strix-scar-18"
    }
};

export const flashOffersWidget: ListWidget = {
    id: "flash-offers",
    title: "Ofertas Relámpago",
    type: "list",
    linkText: "Ver todas las ofertas →",
    linkUrl: "/ofertas",
    items: [
        {
            id: "deal-mouse",
            title: "Logitech G Pro X Superlight 2",
            price: 139.0,
            originalPrice: 180.0,
            formattedPrice: "$139.00",
            formattedOriginalPrice: "$180.00",
            imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=200&q=80",
            soldPercentage: 85,
            link: "/producto/logitech-g-pro-x-superlight-2"
        },
        {
            id: "deal-headset",
            title: "HyperX Cloud Alpha Wireless",
            price: 165.0,
            originalPrice: 199.0,
            formattedPrice: "$165.00",
            formattedOriginalPrice: "$199.00",
            imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=200&q=80",
            link: "/producto/hyperx-cloud-alpha-wireless"
        },
        {
            id: "deal-keyboard",
            title: "Razer Huntsman V3 Pro TKL",
            price: 219.0,
            originalPrice: 249.0,
            formattedPrice: "$219.00",
            formattedOriginalPrice: "$249.00",
            imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80",
            link: "/producto/razer-huntsman-v3-pro-tkl"
        }
    ]
};

export const accessoriesSliderWidget: SliderWidget = {
    id: "accessories-slider",
    title: "Periféricos Populares",
    type: "slider",
    linkText: "Ver catálogo completo →",
    linkUrl: "/categoria/perifericos",
    items: [
        {
            id: "acc-1",
            title: "Monitor 240Hz Fast IPS",
            price: 289.0,
            formattedPrice: "$289.00",
            imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80",
            link: "/producto/monitor-240hz"
        },
        {
            id: "acc-2",
            title: "Micrófono USB Pro RGB",
            price: 89.0,
            formattedPrice: "$89.00",
            imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80",
            link: "/producto/microfono-usb-pro"
        },
        {
            id: "acc-3",
            title: "Mousepad Speed XXL",
            price: 29.0,
            formattedPrice: "$29.00",
            imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=300&q=80",
            link: "/producto/mousepad-xxl"
        },
        {
            id: "acc-4",
            title: "Silla Gamer Ergonómica",
            price: 210.0,
            formattedPrice: "$210.00",
            imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=300&q=80",
            link: "/producto/silla-gamer"
        }
    ]
};

export const defaultHomeWidgets: HomeWidget[] = [
    eliteComponentsWidget,
    notebooksGamerWidget,
    flashOffersWidget,
];
