const usersFilterMutations = {
    updSelected(state, id) {
        state.selected.has(id) ? state.selected.delete(id) : state.selected.add(id);
    },
    rstSelected: state => state.selected = new Set(),
    addToSelected(state, id) { state.selected.add(id) },
};
const conditionFilterMutations = {
    setCondition(state, condition) {
        state.filterCondition = condition;
    },
};
const sliderMutations = {
    sliderActive(state) {
        state.slider = !state.slider;
    },
    setSliderIdx(state, idx) {
        state.itemIndex = idx;
    },
    idxIncrease(state) {
        state.itemIndex++;
    },
    idxDecrease(state) {
        state.itemIndex--
    }
};
const taskMutations = {
    setSelected(state, id) {
        state.selected = id;
    },
    setIndex(state, idx) {
        state.index = idx;
    },
    setCreator(state, status) {
        state.creator = status;
    },
    setEditor(state, status) {
        state.editor = status;
    },
    reset(state, payload = { id: 0, idx: null }) {
        state.selected = payload.id;
        state.index = payload.idx;
        state.creator = false;
        state.editor = false;
    }
};
const homeMutations = {
    setEditor(state, status) {
        state.editor = status;
    },
    editorAva(state, status) {
        state.avaEditor = status;
    },
    modifiedImg(state, payload) {
        state.modified.img = payload.dataUrl;
        state.modified.file = payload.blob
    },
    reset(state) {
        state.editor = false;
        state.avaEditor = false;
        state.modified = { img: '', file: null, }
    }

};
const mainMutations = {
    // users
    setUsers(state, payload) {
        state.users = payload;
    },

    // user
    setUser(state, payload) { state.user = payload },

    // todos
    setTodos(state, payload) { state.todos = payload },
    updTodos(state, payload) {
        if (payload.createdAt) {
            state.taskCurent.taskTodos.push(payload);
            state.taskCurent.from.add(payload.destination);
        } else {
            console.log(payload)
            Object.assign(state.taskCurent.taskTodos.find(el => el.id === payload.id), payload)
        }
    },
    // tasks
    setTasks(state, payload) { state.tasks = payload },
    updTasks(state, payload) { state.tasks.from.push(payload); state.tasks.lastUpd = payload.lastUpd },
    rmTskByIdx(state, index) { state.tasks.from.splice(index, 1); },
    // task
    setTaskCurent(state, payload) {
        state.taskCurent.taskTodos = payload.taskTodos;
        state.taskCurent.from = new Set(payload.from)
    },
    updTaskTodos(state, payload) {
        const idx = state.taskCurent.taskTodos.findIndex(todo => todo.id === payload.id)
        state.taskCurent.taskTodos.splice(idx, 1);
        if (payload.destination) {
            state.taskCurent.from.delete(payload.destination)
        }

    },
    // #
    reset(state) {
        state.todos = { for: [], from: [], lastUpd: '' };
        state.tasks = { from: [], lastUpd: '' };
        state.taskCurent = { taskTodos: [], from: new Set() };
    }
}

export { mainMutations, usersFilterMutations, conditionFilterMutations, sliderMutations, taskMutations, homeMutations }