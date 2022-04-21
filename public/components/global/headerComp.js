const mapActions = Vuex.mapActions;

const componentHeader = {
    methods: {
        logAut() {
            this.auth(0);
            this.$router.push("/login");
        },
        ...mapActions('authModule', [
            "auth",
        ])
    },
    template: `
    <header
        class="header">
            <div 
                class="container">
                    <div class="header__row">
                        <div class="logo-wraper">
                            <img src="/img/bg/pet.svg" alt="logo" class="logo">
                        </div>
                
                        <button 
                            @click="logAut()"
                            class="btn text--white">
                                сменить пользователя
                        </button>
                    </div>
                    <div 
                        class="header__row">
                            <router-link to="/" 
                                class="header__link text--white">
                                    главная
                            </router-link>
                            <router-link to="/users" 
                                class="header__link text--white">
                                    пользователи
                            </router-link>
                            <router-link to="/todos"
                                class="header__link  text--white">
                                    задания
                            </router-link>
                            <router-link to="/tasks"
                                class="header__link  text--white">
                                    мои задачи
                            </router-link>
                </div>
            </div>
    </header>
    `,
};

export { componentHeader }