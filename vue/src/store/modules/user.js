import { getUserByKey } from '@/api/user';

const state = {
    // merchantInfo: {}
}

const mutations = {
    // GET_MERCHANT_BY_APPID: (state, data) => {
    //     state.merchantInfo = data
    // }
}

const actions = {
    // getMerchantInfoByAppid: async({ commit }, params) => {
    //     const result = await getMerchantInfoByAppid(params);
    //     commit('GET_MERCHANT_BY_APPID', result);
    //     return result;
    // },
    getUserByKey: async({ commit }, params) => {
        const result = await getUserByKey(params);
        // commit('GET_MERCHANT_BY_APPID', result);
        return result;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}