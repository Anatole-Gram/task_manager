
const authModule = {
    namespaced: true,

    state: () => ({
        id: localStorage.getItem('id') || 0,
    }),
    actions: {
        async auth({ dispatch, commit, rootState }, id) {
            if (id) {
                await dispatch('getUser', id, { root: true })
                    .then(localStorage.setItem('id', id), commit('setId', localStorage.getItem('id')));
                fetch(`${rootState.url}profile/login?id=${id}`)
            } else {
                commit('reset', null, { root: true })
                localStorage.removeItem('id');
                commit('setId', 0);
            }
        }
    },
    mutations: {
        setId(state, id) {
            state.id = id
        },
    },
    getters: {
        isLoggedIn(state) {
            return state.id;
        }
    },
};

export { authModule };