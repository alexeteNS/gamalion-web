export const API_BASE_URL: string = (
    import.meta.env.VITE_API_URL || ""
).replace(/\/+$/, "");

export function isBackendConfigured(): boolean {
    return API_BASE_URL.length > 0;
}
