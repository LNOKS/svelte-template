import { goto } from '$app/navigation';

interface Options {
	headers?: {
		[key: string]: string;
	};
	credentials?: RequestCredentials;
	[key: string]: any;
}

export const apiCall = async (url: string, options: Options = {}) => {
	const defaultHeaders = {
		'Content-Type': 'application/json',
	};

	const mergedOptions = {
		...options,
		headers: {
			...defaultHeaders,
			...options.headers,
		},
		credentials: options.credentials || 'include',
	}

	const res = await fetch(url, mergedOptions);

	if (res.status === 401 || res.status === 403) {
		localStorage.removeItem('token');
		await goto('/login');
	}

	if (!res.ok) {
		throw new Error(res.statusText);
	}
	const text = await res.text();

	if (!text || text === '') {
		return null;
	}

	return JSON.parse(text);
}
