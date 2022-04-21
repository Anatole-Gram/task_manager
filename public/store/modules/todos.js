import { usersFilterMutations, conditionFilterMutations, sliderMutations } from "../muations.js";
import { usersFilterGetters, usersGetters, todosGetters } from "../getters.js";
import { usersFilterActions, } from "../actions.js";



const todosModule = {
    namespaced: true,
    state: () => ({
        list: "работает",
        slider: false,
        itemIndex: 0,
        selected: new Set(),
        filterCondition: "all",
    }),
    actions: {
        ...usersFilterActions,
    },
    mutations: {
        ...usersFilterMutations,
        ...conditionFilterMutations,
        ...sliderMutations,
    },
    getters: {
        ...usersFilterGetters,
        ...usersGetters,
        ...todosGetters,
    }
};

export { todosModule };