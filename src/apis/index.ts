import ky, { KyInstance, Options } from 'ky';

// Custom error class for API errors
export class ApiError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message);
		this.name = 'ApiError';
	}
}

// Ky instance with global settings
const kyInstance: KyInstance = ky.create({
	prefixUrl: `${process.env.NEXT_PUBLIC_API_HOST}/${process.env.NEXT_PUBLIC_API_AUTH_KEY}/json`,
	hooks: {
		afterResponse: [
			async (_request, _options, response) => {
				if (!response.ok) {
					const errorData = (await response.json()) as { statusCode?: number; message?: string };
					throw new ApiError(
						errorData.statusCode || response.status,
						errorData.message || 'Unknown error'
					);
				}
			},
		],
	},
	retry: {
		limit: 2,
		backoffLimit: 1000,
	},
});

// Generic request function
const request = async <T>(method: string, url: string, options: Options = {}): Promise<T> => {
	return kyInstance(url, { method, ...options }).json<T>();
};

// Supported HTTP methods
type APIMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

// API client with dynamic method handling
type APIClient = {
	[Method in APIMethod]: <T>(url: string, options?: Options) => Promise<T>;
};

// Proxy to handle API calls dynamically
export const kyApi: APIClient = new Proxy({} as APIClient, {
	get: (_, method: string) => {
		if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase())) {
			throw new Error(`Invalid method: ${method}`);
		}

		return <T>(url: string, options?: Options) => request<T>(method.toUpperCase(), url, options);
	},
});
