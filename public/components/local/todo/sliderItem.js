const mapGetters = Vuex.mapGetters;
const mapActions = Vuex.mapActions;

const sliderItemTodos = {
    props: ["item"],
    methods: {
        ...mapActions([
            "updStatus",
        ])
    },
    computed: {
        user() {
            const user = this.usrById(this.item.sender)
            return user.name + " " + user.surname
        },
        ...mapGetters([
            "usrById",
        ])
    },
    template: `
    <div
        class="todo">
                <h5 
                    class="text text__title">
                        {{ user }}
                </h5>
                <section 
                    class="todo__section">
                        <span 
                            class="todo__section-sub-ttl text text_defining">
                                задание
                        </span>
                        <div class="todo__text-wraper  todo__title row row_white">
                            <p 
                                class="text text__content">
                                    {{ item.title }}
                            </p>
                        </div>
                </section>
                    
                <section 
                    class="todo__section">

                        <span 
                            class="todo__section-sub-ttl text text_defining">
                                комментарий
                        </span>

                        <div class="todo__text-wraper todo__comment row row_white">
                            <p class="text">
                                {{ item.comment }}
                            </p>
                        </div>

                    <label 
                        :for="'check'+item.id"
                        class="btn todo__btn todo__check text_white row row_black ">
                            {{ item.status?"выполненно":"не выполненно" }}
                    </label>

                    <input 
                        v-model="item.status"
                        :id="'check'+item.id"
                        type="checkbox" 
                        cheked="item.status"  
                        @click="updStatus(item.id)" 
                        class="inp-check">

                </section>

    </div>
    `
};

export { sliderItemTodos }

