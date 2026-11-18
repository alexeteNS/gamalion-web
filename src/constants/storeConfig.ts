export const WHATSAPP_PHONE = "5216866048668";

const IGNORED_FUTURE_CATEGORY_SLUGS = new Set([
    "armado-pc",
    "ofertas",
    "rastreo",
]);

export function isVisibleCategorySlug(slug: string): boolean {
    return !IGNORED_FUTURE_CATEGORY_SLUGS.has(slug.trim().toLowerCase());
}

export function formatCurrencyMXN(amount: number): string {
    return `$${amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}
