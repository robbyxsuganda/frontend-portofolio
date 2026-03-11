import ENVIRONMENT from "@/app/config/environment";

interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  tags?: string[];
  revalidate?: number;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {},
  fallback?: T
): Promise<T> {
  const { body, tags, revalidate = 3600, ...init } = options;

  try {
    const res = await fetch(`${ENVIRONMENT.API_URL}${endpoint}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      next: { revalidate, tags },
    });

    if (!res.ok) {
      throw new ApiError(res.status, `API Error: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    // If fallback is provided, use it instead of throwing error
    if (fallback !== undefined) {
      console.warn(`[API] Error fetching ${endpoint}, using fallback data:`, error);
      return fallback;
    }
    throw error;
  }
}

export const api = {
  get: <T>(
    endpoint: string,
    options?: { tags?: string[]; revalidate?: number },
    fallback?: T
  ) => fetcher<T>(endpoint, options, fallback),

  post: <T>(endpoint: string, data: unknown) =>
    fetcher<T>(endpoint, { method: "POST", body: data }),

  put: <T>(endpoint: string, data: unknown) =>
    fetcher<T>(endpoint, { method: "PUT", body: data }),

  delete: <T>(endpoint: string) =>
    fetcher<T>(endpoint, { method: "DELETE" }),
};

export { ApiError };
