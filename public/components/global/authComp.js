const mapState = Vuex.mapState;
const mapActions = Vuex.mapActions;
const mapGetters = Vuex.mapGetters;

const componentAuth = {
    data() {
        return {
            selected: 0,
        }
    },
    methods: {
        async login(id) {
            await this.auth(id)
            this.$router.push("/")
        },
        ...mapActions('authModule', [
            "auth",
        ]),
    },
    computed: {
        ...mapState([
            "users",
        ]),
        ...mapGetters('authModule', [
            "isLoggedIn",
        ]),
    },
    created() {
        this.auth(0)
    },
    template: `
    <div class="container container__main">
        <form @submit.prevent="" class="auth">
            <label for="log"
                class="lbl">
                    пользователь
            </label>
            
            <select v-model="selected"
                id="log"
                class="auth__item text text__content">
                    <option 
                        disabled
                        value="0"
                        class="text--red">
                            выберите пользователя
                    </option>

                    <option v-for="user of users"
                        :value="user.id">
                        {{user.name}} {{user.surname}}
                    </option>
            </select>

            <label for="pass"
                class="lbl">
                    пароль
            </label>
            <input 
                id="pass"
                type="password" 
                readonly value="123123" 
                class="auth__item text text__content">
            <button 
                @click=login(selected) 
                class="auth__btn auth__item">
                    войти
            </button>
            
        </form>

    </div>
    `,
};

export { componentAuth }