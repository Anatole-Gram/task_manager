
const usersFilterGetters = {
    allSelected(state, getters, rootSate, rootGetters) {
        return state.selected.size === rootSate.users.length
    },

};
const usersGetters = {
    users(state, getters, rootSate, rootGetters) {
        return rootSate.users.filter(user => state.selected.has(user.id))
    },
};
const todosGetters = {
    //filtred by selected and condition
    todosFiltred(state, getters, rootState, rootGetters) {
        if (state.filterCondition !== "all") {
            return rootState.todos.for.filter(todo =>
                (todo.status === state.filterCondition) && state.selected.has(todo.sender));
        } else { return rootState.todos.for.filter(todo => state.selected.has(todo.sender)) };
    },
};
const mainGetters = {
    user: state => state.user,
    usrById: (state) => (id) => {
        return state.users.find(user => user.id === id)
    },
    taskWorkers(state) {
        return state.users.filter(user => state.taskCurent.from.has(user.id));
    },
    usrTodos: (state) => (id) => {
        return state.taskCurent.taskTodos.filter(todo => todo.destination === id);
    },
    tskById: (state) => (id) => { return state.tasks.from.find(task => task.id === id) },
    tasks: (state) => { return state.tasks.from },
}

export { mainGetters, usersFilterGetters, usersGetters, todosGetters };