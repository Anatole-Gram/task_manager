
import { taskMutations } from "../muations.js";
import { taskActions } from "../actions.js";

const tasksModule = {
    namespaced: true,
    state: () => ({
        selected: 0,
        index: null,
        creator: false,
        editor: false,

    }),
    actions: {
        ...taskActions,
    },
    mutations: {
        ...taskMutations,
    },
    getters: {

    }
};
export { tasksModule }