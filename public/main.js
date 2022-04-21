
// local comp
import { componentHome } from "/components/local/home/homeComp.js";
import { componentUsers } from "/components/local/users/usersComp.js";
import { componentTodos } from "/components/local/todo/todosComp.js";
import { componentTasks } from "/components/local/task/tasksComp.js";

// global comp
import { componentAuth } from "/components/global/authComp.js";
import { componentHeader } from "/components/global/headerComp.js";
import { componentFooter } from "/components/global/footerComp.js";

// store
import { componentStore } from "/store/index.js";
const store = new Vuex.Store(componentStore);

// router
const routes = [
    {
        path: '/',
        component: componentHome,
        name: 'main',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users',
        component: componentUsers,
        name: 'users',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/todos',
        component: componentTodos,
        name: 'todos',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/tasks',
        component: componentTasks,
        name: 'tasks',
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: componentAuth,
        name: 'auth',
    },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['authModule/isLoggedIn']) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

//app
const app = Vue.createApp({
    created() { this.$store.dispatch("init") }
});

app.components = {
    "home": componentHome,
    "users": componentUsers,
    "todos": componentTodos,
    "tasks": componentTasks,
    "auth": componentAuth,
};

app.component("header-comp", componentHeader);
app.component("user-auth", componentAuth);
app.component("footer-comp", componentFooter);
app.use(store);
app.use(router);
app.mount("#app");
