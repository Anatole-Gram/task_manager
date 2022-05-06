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
            menu: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#f5f5f5" viewBox="0 0 448 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" /></svg>`,
            resize: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path d="M208 281.4c-12.5-12.5-32.76-12.5-45.26-.002l-78.06 78.07l-30.06-30.06c-6.125-6.125-14.31-9.367-22.63-9.367c-4.125 0-8.279 .7891-12.25 2.43c-11.97 4.953-19.75 16.62-19.75 29.56v135.1C.0013 501.3 10.75 512 24 512h136c12.94 0 24.63-7.797 29.56-19.75c4.969-11.97 2.219-25.72-6.938-34.87l-30.06-30.06l78.06-78.07c12.5-12.49 12.5-32.75 .002-45.25L208 281.4zM487.1 0h-136c-12.94 0-24.63 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.87l30.06 30.06l-78.06 78.07c-12.5 12.5-12.5 32.76 0 45.26l22.62 22.62c12.5 12.5 32.76 12.5 45.26 0l78.06-78.07l30.06 30.06c9.156 9.141 22.87 11.84 34.87 6.937C504.2 184.6 512 172.9 512 159.1V23.1C512 10.74 501.3 0 487.1 0z"/></svg>`,
            arrow: `<svg aria-hidden="true" focusable="false" data-prefix="fas" width="45" height="45" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>`,
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