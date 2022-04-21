import { usersFilterMutations, sliderMutations } from "../muations.js";
import { usersFilterGetters, usersGetters } from "../getters.js";
import { usersFilterActions } from "../actions.js";

const usersModule = {
    namespaced: true,
    state: () => ({
        list: "работает",
        slider: false,
        itemIndex: 0,
        selected: new Set(),
    }),
    actions: {
        ...usersFilterActions,
    },
    mutations: {
        ...usersFilterMutations,
        ...sliderMutations,
    },
    getters: {
        ...usersFilterGetters,
        ...usersGetters,
    }
};

export { usersModule };
