import { getUserByKey } from '@/api/user';

const state = {
    userDetail: {}
}

const mutations = {
    GET_USER_DETAIL: (state, data) => {
        state.userDetail = data;
    }
}

const actions = {
    getUserByKey: async({ commit }, params) => {
        const result = await getUserByKey(params);
        commit('GET_USER_DETAIL', result);
        return result;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}