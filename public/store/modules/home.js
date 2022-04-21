import { homeMutations } from "../muations.js";

const homeModule = {
    namespaced: true,

    state: () => ({
        editor: false,
    }),
    actions: {

    },
    mutations: {
        ...homeMutations,
    },
    getters: {

    },
};

export { homeModule };