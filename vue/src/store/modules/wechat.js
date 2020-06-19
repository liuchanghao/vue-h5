import { getWechatMemberInfo } from '@/api/wechat';

const state = {
    // merchantInfo: {}
}

const mutations = {
    // GET_MERCHANT_BY_APPID: (state, data) => {
    //     state.merchantInfo = data
    // }
}

const actions = {
    getWechatMemberInfo: async({ commit }, params) => {
        return getWechatMemberInfo(params);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}