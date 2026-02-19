import { ApiError, ApiErrorType } from './apiErrors';
import { networkService } from './networkService';
import { authStorage } from './authStorage';

const BASE_URL = 'https://dummyjson.com'; // ✅ single source of truth
const TIMEOUT = 15000;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean; 
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const connected = await networkService.isConnected();
    if (!connected) {
      throw new ApiError(ApiErrorType.NETWORK, 'No internet connection');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    try {
      const url = `${BASE_URL}${endpoint}`; // ✅ endpoint only
      const token = await authStorage.getAccessToken();

      // 4️⃣ Build headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      };
      
      // 5️⃣ Attach token if available
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method: options.method ?? 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        credentials: 'include', // ✅ required for auth cookies
        signal: controller.signal,
      });

      if (!response.ok) {
        await this.handleErrorResponse(response);
      }

      return (await response.json()) as T;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new ApiError(ApiErrorType.TIMEOUT, 'Request timed out');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let message = 'Something went wrong';
  
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        message = errorBody.message; // ✅ backend message
      }
    } catch {
      // ignore JSON parsing errors
    }
  
    switch (response.status) {
      case 400:
        throw new ApiError(ApiErrorType.BAD_REQUEST, message, 400);
      case 401:
        throw new ApiError(ApiErrorType.UNAUTHORIZED, message, 401);
      case 403:
        throw new ApiError(ApiErrorType.FORBIDDEN, message, 403);
      case 404:
        throw new ApiError(ApiErrorType.NOT_FOUND, message, 404);
      case 500:
        throw new ApiError(ApiErrorType.SERVER, 'Server error', 500);
      default:
        throw new ApiError(ApiErrorType.UNKNOWN, message, response.status);
    }
  }
  

  // 🔽 Public helpers

  get<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body,
    });
  }

  put<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body,
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
