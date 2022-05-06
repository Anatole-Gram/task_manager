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


// <header
//         class="header">
//             <div 
//                 class="container">
//                     <div class="header__row">
//                         <div class="logo-wraper">
//                             <img src="/img/bg/pet.svg" alt="logo" class="logo">
//                         </div>
                
//                         <button 
//                             @click="logAut()"
//                             class="btn text--white">
//                                 сменить пользователя
//                         </button>
//                     </div>
//                     <div 
//                         class="header__row">
//                             <router-link to="/" 
//                                 class="header__link text--white">
//                                     главная
//                             </router-link>
//                             <router-link to="/users" 
//                                 class="header__link text--white">
//                                     пользователи
//                             </router-link>
//                             <router-link to="/todos"
//                                 class="header__link  text--white">
//                                     задания
//                             </router-link>
//                             <router-link to="/tasks"
//                                 class="header__link  text--white">
//                                     мои задачи
//                             </router-link>
//                 </div>
//             </div>
//     </header>