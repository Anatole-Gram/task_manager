import { homeMutations } from "../muations.js";

const homeModule = {
    namespaced: true,

    state: () => ({
        editor: false,
        avaEditor: false,
        modified: {
            img: '',
            file: null,
        },
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