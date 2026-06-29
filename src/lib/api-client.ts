/**
 * OMDC API Client
 *
 * Production-ready HTTP client with:
 * - Automatic retry (exponential backoff)
 * - Offline support (request queue + sync when online)
 * - Request timeout
 * - Error normalization
 * - Auth token injection
 * - CSRF token handling
 *
 * Works for all platforms: Website, Mobile App, e-Kiosk, CMS.
 * Each platform configures its own API URL via environment.
 */

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  timeout?: number; // milliseconds
  retries?: number;
  cache?: RequestCache;
  signal?: AbortSignal;
}

export interface ApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

// ============ Configuration ============

const DEFAULT_TIMEOUT = 15_000; // 15s
const DEFAULT_RETRIES = 3;
const RETRY_DELAYS = [1000, 2000, 4000]; // exponential backoff

function getApiBaseUrl(): string {
  // Priority: env var > window location origin
  if (typeof window !== "undefined") {
    // In browser, use same origin (proxy handles routing)
    return window.location.origin;
  }
  // Server-side: use env var or default
  return process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  // Check multiple storage locations
  try {
    const token = localStorage.getItem("omdc-auth-token");
    if (token) return token;
  } catch {
    // localStorage might be blocked (private browsing)
  }
  return null;
}

// ============ Offline Queue ============

interface QueuedRequest {
  id: string;
  url: string;
  options: ApiRequestOptions;
  timestamp: number;
  resolve: (value: ApiResponse) => void;
  reject: (reason: Error) => void;
}

const requestQueue: QueuedRequest[] = [];
let isOnline = typeof navigator === "undefined" ? true : navigator.onLine;
let isSyncing = false;

// Listen to online/offline events (browser only)
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    isOnline = true;
    void flushQueue();
  });
  window.addEventListener("offline", () => {
    isOnline = false;
  });
}

async function flushQueue(): Promise<void> {
  if (isSyncing || requestQueue.length === 0) return;
  isSyncing = true;

  const queue = [...requestQueue];
  requestQueue.length = 0;

  for (const item of queue) {
    try {
      const result = await fetchWithRetry(item.url, item.options);
      item.resolve(result);
    } catch (err) {
      item.reject(err instanceof Error ? err : new Error("Unknown error"));
    }
  }

  isSyncing = false;
}

// ============ Core fetch with retry ============

async function fetchWithRetry(
  url: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse> {
  const {
    method = "GET",
    body,
    headers = {},
    timeout = DEFAULT_TIMEOUT,
    retries = DEFAULT_RETRIES,
    cache,
    signal,
  } = options;

  // Build request
  const fullUrl = url.startsWith("http") ? url : `${getApiBaseUrl()}${url}`;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "X-OMDC-Platform": getPlatformIdentifier(),
    ...headers,
  };

  // Inject auth token
  const authToken = getAuthToken();
  if (authToken) {
    requestHeaders["Authorization"] = `Bearer ${authToken}`;
  }

  // CSRF: same-origin requests include cookies automatically
  // For cross-origin, add X-Requested-With header
  requestHeaders["X-Requested-With"] = "XMLHttpRequest";

  const requestBody = body ? JSON.stringify(body) : undefined;

  // Retry loop
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    // Check offline before each attempt
    if (!isOnline && method !== "GET") {
      // Queue mutation requests for later sync
      return new Promise<ApiResponse>((resolve, reject) => {
        requestQueue.push({
          id: `${Date.now()}-${Math.random()}`,
          url,
          options,
          timestamp: Date.now(),
          resolve,
          reject,
        });
        // Return offline indicator
        resolve({
          ok: false,
          status: 0,
          error: "OFFLINE",
          message: "Anda sedang offline. Permintaan akan dikirim saat koneksi kembali.",
        });
      });
    }

    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      // Combine with external signal if provided
      if (signal) {
        signal.addEventListener("abort", () => controller.abort());
      }

      const response = await fetch(fullUrl, {
        method,
        headers: requestHeaders,
        body: requestBody,
        credentials: "same-origin",
        cache,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse response
      let data: unknown = null;
      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Success
      if (response.ok) {
        return {
          ok: true,
          data: data as Record<string, unknown>,
          status: response.status,
        };
      }

      // Rate limited — don't retry, return immediately
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        return {
          ok: false,
          status: 429,
          error: "RATE_LIMITED",
          message: `Terlalu banyak permintaan. Coba lagi dalam ${retryAfter ?? 60} detik.`,
          data: data as Record<string, unknown>,
        };
      }

      // Client error (4xx) — don't retry
      if (response.status >= 400 && response.status < 500) {
        return {
          ok: false,
          status: response.status,
          error: "CLIENT_ERROR",
          message: (data as { message?: string })?.message ?? "Permintaan tidak valid",
          data: data as Record<string, unknown>,
        };
      }

      // Server error (5xx) — retry
      lastError = new Error(`Server error: ${response.status}`);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        lastError = new Error("Request timeout");
      } else if (err instanceof TypeError) {
        // Network error
        lastError = new Error("Network error — periksa koneksi internet");
        isOnline = false;
      } else {
        lastError = err instanceof Error ? err : new Error("Unknown error");
      }
    }

    // Wait before retry (exponential backoff)
    if (attempt < retries) {
      const delay = RETRY_DELAYS[attempt] ?? RETRY_DELAYS[RETRY_DELAYS.length - 1];
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // All retries exhausted
  return {
    ok: false,
    status: 0,
    error: "REQUEST_FAILED",
    message: lastError?.message ?? "Permintaan gagal setelah beberapa percobaan",
  };
}

// ============ Platform identifier ============

function getPlatformIdentifier(): string {
  if (typeof window === "undefined") return "server";

  const pathname = window.location.pathname;
  if (pathname.startsWith("/kiosk")) return "kiosk";
  if (pathname.startsWith("/app")) return "mobile-app";
  if (pathname.startsWith("/cms")) return "cms";

  // Check if running in Capacitor (native app)
  if (typeof (window as unknown as { capacitor?: unknown }).capacitor !== "undefined") {
    return "capacitor-app";
  }

  // Check if running in standalone (PWA installed)
  if (window.matchMedia("(display-mode: standalone)").matches) {
    return "pwa-installed";
  }

  return "website";
}

// ============ Public API ============

export const apiClient = {
  get<T = unknown>(url: string, options?: Omit<ApiRequestOptions, "method" | "body">): Promise<ApiResponse<T>> {
    return fetchWithRetry(url, { ...options, method: "GET" }) as Promise<ApiResponse<T>>;
  },

  post<T = unknown>(url: string, body?: unknown, options?: Omit<ApiRequestOptions, "method" | "body">): Promise<ApiResponse<T>> {
    return fetchWithRetry(url, { ...options, method: "POST", body }) as Promise<ApiResponse<T>>;
  },

  put<T = unknown>(url: string, body?: unknown, options?: Omit<ApiRequestOptions, "method" | "body">): Promise<ApiResponse<T>> {
    return fetchWithRetry(url, { ...options, method: "PUT", body }) as Promise<ApiResponse<T>>;
  },

  patch<T = unknown>(url: string, body?: unknown, options?: Omit<ApiRequestOptions, "method" | "body">): Promise<ApiResponse<T>> {
    return fetchWithRetry(url, { ...options, method: "PATCH", body }) as Promise<ApiResponse<T>>;
  },

  delete<T = unknown>(url: string, options?: Omit<ApiRequestOptions, "method" | "body">): Promise<ApiResponse<T>> {
    return fetchWithRetry(url, { ...options, method: "DELETE" }) as Promise<ApiResponse<T>>;
  },

  /** Check if currently online */
  isOnline(): boolean {
    return isOnline;
  },

  /** Get count of queued (offline) requests */
  getQueuedCount(): number {
    return requestQueue.length;
  },

  /** Manually trigger queue flush (e.g., when user clicks "Sync now") */
  async syncNow(): Promise<void> {
    await flushQueue();
  },
};
