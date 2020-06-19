import request from '@/utils/request';

export const getMerchantInfoByAppid = params => request.get('/api/getMerchantInfoByAppid', params);