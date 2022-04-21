import { authModule } from "./modules/autch.js";
import { mainActions } from "./actions.js";
import { mainMutations } from "./muations.js";
import { mainGetters } from "./getters.js";
import { homeModule } from "./modules/home.js";
import { usersModule } from "./modules/users.js";
import { todosModule } from "./modules/todos.js";
import { tasksModule } from "./modules/tasks.js";


const componentStore = {
    modules: {
        authModule,
        homeModule,
        usersModule,
        todosModule,
        tasksModule,
    },
    state: {
        user: {},
        users: [],
        todos: { for: [], from: [], lastUpd: '' },
        tasks: { from: [], lastUpd: '' },
        taskCurent: { taskTodos: [], from: new Set() },
        exp: {
            phone: /(?<a>^\s?\+\s?)(?<b>\s?7\s?)(?<c>\d{3}\s?)(?<d>\d{3}\s?)(?<e>\d{2}\s?)(?<f>\d{2}\s?$)/,
            name: /^(?<name>([a-z]{2,})|([ёа-я]{2,}))/i,
            mail: /^(?<mail>[a-z]{1,}[-\w]{1,}@[a-z]{1,}\.[a-z]{2,})$/,
        },
        url: "http://localhost:3000/api/",
        svg: {
            arrow: `<svg aria-hidden="true" focusable="false" data-prefix="fas" class="card-slider__img" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>`,
            close: `<svg xmlns="http://www.w3.org/2000/svg" fill="#333333" viewBox="0 0 448 512" width="50" height="50"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM143 208.1L190.1 255.1L143 303C133.7 312.4 133.7 327.6 143 336.1C152.4 346.3 167.6 346.3 176.1 336.1L223.1 289.9L271 336.1C280.4 346.3 295.6 346.3 304.1 336.1C314.3 327.6 314.3 312.4 304.1 303L257.9 255.1L304.1 208.1C314.3 199.6 314.3 184.4 304.1 175C295.6 165.7 280.4 165.7 271 175L223.1 222.1L176.1 175C167.6 165.7 152.4 165.7 143 175C133.7 184.4 133.7 199.6 143 208.1V208.1z"/></svg>`,
            collapse: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"/></svg>`,
        }
    },
    actions: {
        ...mainActions,
    },
    mutations: {
        ...mainMutations,
    },

    getters: {
        ...mainGetters,
    },
};

export { componentStore };