import type { LoginRequest, AuthResponse } from '../types/auth';
import axios from 'axios';

// تنظیمات اولیه Axios
const api = axios.create({
    baseURL: '/api', // چون توی vite.config پروکسی ست کردیم، خودکار میره سمت 8080
    headers: {
        'Content-Type': 'application/json',
    },
});

// اینترسپتور: اگر توکن داشتیم، بذارش توی هدر تمام درخواست‌ها
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (data: LoginRequest) => {
        // درخواست POST به /auth/authenticate
        const response = await api.post<AuthResponse>('/auth/authenticate', data);
        if (response.data.token) {
            // ذخیره توکن در مرورگر
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
};

export default api;