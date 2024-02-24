import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);

export const isAdmin = writable(false);

export const getUserId = () => {
	return Number(localStorage.getItem('userId'));
}

export function checkAuth() {
	const token = localStorage.getItem('token');
	isAuthenticated.set(!!token);

	const admin = localStorage.getItem('isAdmin') === 'true';
	isAdmin.set(admin);
}
