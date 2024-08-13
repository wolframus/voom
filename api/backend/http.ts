const headers: Record<string, string> = {
  language: 'en',
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

abstract class HttpFactory {
  abstract createHttp(url: string): Http;
}

abstract class Http {
  abstract builtUrl: string;

  abstract get<T>(url: string, config?: RequestInit): Promise<T>;
  abstract delete<T>(url: string, config?: RequestInit): Promise<T>;
  abstract put<T>(url: string, data?: any, config?: RequestInit): Promise<T>;
  abstract post<T>(url: string, data?: any, config?: RequestInit): Promise<T>;
  abstract patch<T>(url: string, data?: any, config?: RequestInit): Promise<T>;

  protected buildPath(path: string, trailingPath: string) {
    return `${path}${trailingPath}`;
  }
}

// FetchHttpFactory class implementing HttpFactory
class FetchHttpFactory extends HttpFactory {
  createHttp(url?: string): Http {
    return new FetchHttp(url);
  }
}

// FetchHttp class extending Http and implementing fetch methods
class FetchHttp extends Http {
  builtUrl: string;
  headers = headers;
  baseUrl = 'https://the.voom.backend.api';

  constructor(mainUrl?: string) {
    super();
    this.builtUrl = `${this.baseUrl}/api${mainUrl}`;
  }

  private async handleResponse<T>(
    response: Response,
    config?: RequestInit
  ): Promise<T> {
    const data = await response.json();

    if (data.statusCode >= 400) {
      // TODO: display popover error with according message
    }

    return data;
  }

  async get<T>(url: string, config?: RequestInit): Promise<T> {
    const { ...requestConfig } = config ?? ({} as RequestInit);
    const response = await fetch(`${this.builtUrl}/${url}`, {
      method: 'GET',
      headers: { ...this.headers, ...(requestConfig.headers || {}) },
      ...requestConfig,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(url: string, data?: any, config?: RequestInit): Promise<T> {
    const { ...requestConfig } = config ?? ({} as RequestInit);
    const response = await fetch(`${this.builtUrl}${url}`, {
      method: 'POST',
      headers: { ...this.headers, ...(requestConfig.headers || {}) },
      body: JSON.stringify(data),
      ...requestConfig,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(url: string, data?: any, config?: RequestInit): Promise<T> {
    const { ...requestConfig } = config ?? ({} as RequestInit);
    const response = await fetch(`${this.builtUrl}${url}`, {
      method: 'PUT',
      headers: { ...this.headers, ...(requestConfig.headers || {}) },
      body: JSON.stringify(data),
      ...requestConfig,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(url: string, data?: any, config?: RequestInit): Promise<T> {
    const { ...requestConfig } = config ?? ({} as RequestInit);
    const response = await fetch(`${this.builtUrl}${url}`, {
      method: 'PATCH',
      headers: { ...this.headers, ...(requestConfig.headers || {}) },
      body: JSON.stringify(data),
      ...requestConfig,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(url: string, config?: RequestInit): Promise<T> {
    const { ...requestConfig } = config ?? ({} as RequestInit);
    const response = await fetch(`${this.builtUrl}${url}`, {
      method: 'DELETE',
      headers: { ...this.headers, ...(requestConfig.headers || {}) },
      ...requestConfig,
    });

    return this.handleResponse<T>(response);
  }
}

export { HttpFactory, FetchHttpFactory };
