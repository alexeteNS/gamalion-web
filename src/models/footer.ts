export interface FooterLinkItem {
    id: string;
    label: string;
    content: string;
}

export interface FooterColumn {
    id: string;
    title: string;
    links: FooterLinkItem[];
}

export interface FooterContactInfo {
    email: string;
    phoneDisplay: string;
    whatsappNumber: string;
}

export interface FooterSocialLink {
    id: "instagram" | "facebook";
    label: string;
    url: string;
}
