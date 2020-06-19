import request from '@/utils/request';

export const getWechatMemberInfo = params => request.get('/wxapi/getWechatMemberInfo', params);