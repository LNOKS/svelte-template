import { apiCall } from '$lib/api/index';
import { checkAuth } from '$lib/stores/auth';

export const login = async (username: string, password: string) => {
	const data  = await apiCall(`${import.meta.env.VITE_API_URL}/auth/login`, {
		method: 'POST',
		body: JSON.stringify({ username, password }),
	});

	localStorage.setItem('token', data.token);
	localStorage.setItem('userId', data.userId);
	localStorage.setItem('isAdmin', data.isAdmin);
	checkAuth();

	return data;
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('isAdmin');
	checkAuth();
}
