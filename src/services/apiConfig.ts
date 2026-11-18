const RAW_API_URL: string = (import.meta.env.VITE_API_URL || "")
    .trim()
    .replace(/\/+$/, "");

export const API_BASE_URL: string = RAW_API_URL;

const CLIENT_ID_STORAGE_KEY = "gamalion_client_id_v1";

export function isBackendConfigured(): boolean {
    return true;
}

export function apiUrl(path: string): string {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const apiPath = cleanPath.startsWith("/api/")
        ? cleanPath
        : cleanPath === "/api"
            ? "/api"
            : `/api${cleanPath}`;

    if (!RAW_API_URL) {
        return apiPath;
    }

    if (RAW_API_URL.endsWith("/api")) {
        const withoutApiPrefix = apiPath.replace(/^\/api/, "");
        return `${RAW_API_URL}${withoutApiPrefix}`;
    }

    return `${RAW_API_URL}${apiPath}`;
}

export function getClientId(): string {
    if (typeof window === "undefined") {
        return "ssr-client";
    }

    try {
        const existing = window.localStorage.getItem(CLIENT_ID_STORAGE_KEY);
        if (existing && existing.trim().length > 0) {
            return existing.trim();
        }
        const generated =
            typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
                ? `cli-${crypto.randomUUID()}`
                : `cli-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        window.localStorage.setItem(CLIENT_ID_STORAGE_KEY, generated);
        return generated;
    } catch {
        return "anon-client";
    }
}

export function apiHeaders(extra?: HeadersInit): Headers {
    const headers = new Headers(extra);
    if (!headers.has("Accept")) {
        headers.set("Accept", "application/json");
    }
    if (!headers.has("X-Client-Id")) {
        headers.set("X-Client-Id", getClientId());
    }
    return headers;
}

export class ApiRequestError extends Error {
    readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiRequestError";
        this.status = status;
    }
}

export async function apiFetch<T>(
    path: string,
    init: RequestInit = {},
): Promise<T> {
    const headers = apiHeaders(init.headers);
    if (init.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(apiUrl(path), {
        ...init,
        headers,
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    if (!response.ok) {
        let message = `Error del servidor (${response.status})`;
        if (isJson) {
            try {
                const payload = (await response.json()) as {
                    error?: string;
                    message?: string;
                };
                if (payload.error) {
                    message = payload.error;
                } else if (payload.message) {
                    message = payload.message;
                }
            } catch {
                // ignorar fallo al leer cuerpo de error
            }
        }
        throw new ApiRequestError(message, response.status);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return (await response.json()) as T;
}
