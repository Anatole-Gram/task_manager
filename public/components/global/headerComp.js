
const componentHeader = {
    methods: {
        logAut() {
            this.$router.push("/login");
        },

    },

    template: `
    <header
        class="header">
        <div 
            class="header__row container">
                <div 
                    class="logo">
                        <img src="/img/bg/pet.svg" alt="logo" class="logo__img">
                </div>
                <button 
                    @click="logAut()"
                    class="header__auth">
                        сменить пользователя
                </button>
        </div>
       
        <div 
            class="header__menu container">
                <router-link to="/" 
                    class="header__menu-link">
                        главная
                </router-link>
                <router-link to="/users" 
                    class="header__menu-link">
                        пользователи
                </router-link>
                <router-link to="/todos"
                    class="header__menu-link">
                        задания
                </router-link>
                <router-link to="/tasks"
                    class="header__menu-link">
                        мои задачи
                </router-link>
        </div>
    </header>
    `,
};

export { componentHeader }
