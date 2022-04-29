async function getJson(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};


const usersFilterActions = {
    selectAll({ commit, rootState }, condition) {
        if (condition) {
            rootState.users.forEach(user => commit("addToSelected", user.id));
        } else {
            commit("rstSelected")
        }
    }
};
const taskActions = {
    select({ commit, state }, payload) {
        state.selected === payload.id ? commit("reset") : commit("reset", payload)
    },
    taskCreated({ commit }, id) {
        commit("setSelected", id);
        commit("setEditor", true);
    },
};

const mainActions = {
    async init({ dispatch, getters }) {
        await dispatch("getUsers")
        if (getters['authModule/isLoggedIn']) {
            await dispatch("getUser", localStorage.id)
        }
    },
    //user
    async getUser({ state, commit, }, id) {
        const data = await getJson(`${state.url}user?id=${id}`, { method: "GET" })
        commit("setUser", data)
    },
    //users
    async getUsers({ state, commit }) {
        const data = await getJson(`${state.url}users`, { method: "GET" });
        commit("setUsers", data);
    },
    //todos
    async getTaskTodos({ state, commit }, payload) {
        const data = await getJson(`${state.url}task/todos?id=${payload}`, { method: "GET" });
        commit("setTaskCurent", data)
    },
    async getTodos({ commit, state }, id) {
        const response = await fetch(`${state.url}todos?id=${id}&last=${state.todos.lastUpd}`, { method: "GET" });
        if (response.status !== 304) {
            const data = await response.json();
            commit("setTodos", data)
        }
    },
    async sendTodo({ state, commit }, payload) {
        const response = await fetch(`${state.url}sendTodo?id=${payload.id}`, payload.data);
        if (response.status === 200) {
            const data = await response.json();
            commit("updTodos", data)
        }
    },
    delTodo({ commit }, payload) {
        if (payload.response.ok) {
            payload.response.status === 205 ?
                commit("updTaskTodos", { id: payload.id, destination: payload.destination }) :
                commit("updTaskTodos", { id: payload.id });
        }
    },
    async updStatus({ state }, id) {
        await fetch(`${state.url}updStatus?id=${id}`, { method: "PUT" })
            .catch(err => console.log(`что то пошло не так: ${err}`))
    },
    //tasks
    async addTask({ state, commit }, payload) {
        const data = await getJson(`${state.url}addtask?id=${state.user.id}`, payload);
        commit("updTasks", data)
        return data.id
    },
    async updTask({ state }, payload) {
        await getJson(`${state.url}updtask?id=${payload.id}`, payload.data);
    },
    async getTasks({ commit, state }, id) {
        const response = await fetch(`${state.url}tasks?id=${id}&last=${state.tasks.lastUpd}`, { method: "GET" });
        if (response.status !== 304) {
            const data = await response.json();
            commit("setTasks", data)
        }
    },

    // #
    async delTask({ state, commit }, payload) {
        let url = `${state.url}deltask?id=${payload.id}`
        const response = await fetch(url, { method: "DELETE" })
        if (response.ok) {
            commit("rmTskByIdx", payload.index)
        } else { alert('задача не удалена') }
    }

};
export { mainActions, usersFilterActions, taskActions }