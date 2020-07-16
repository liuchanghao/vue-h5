import request from '@/utils/request';

export const getUserByKey = params => request.get('/api/getUserByKey', params);