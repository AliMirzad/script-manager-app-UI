import api from './api';
// ✅ تغییر مهم: اضافه کردن 'type' بعد از import
import type { Script, UpdateContentCmd } from '../types/script';

export const scriptService = {
    getAll: async () => {
        const response = await api.get<Script[]>('/scripts');
        return response.data;
    },

    create: async (data: UpdateContentCmd) => {
        // چون متد create در جاوا Long برمیگردونه
        const response = await api.post<number>('/scripts', data);
        return response.data;
    }
};