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
        class="card objective card-slider">
                <h5 
                    class="text text__title">
                        {{ user }}
                </h5>
                <section 
                    class="objective__section ">
                        <span 
                            class="objective__sub-ttl text text--defining">
                                задание
                        </span>
                        <p 
                            class="objective__title row row--white text text__content text--central">
                                {{ item.title }}
                        </p>
                </section>
                    
                <section 
                    class="objective__section">
                        <span 
                            class="objective__sub-ttl text text--defining">
                                комментарий
                        </span>
                        <p class="objective__comment objective-wraper row--white text text__content">
                            {{ item.comment }}
                        </p>
                </section>
                <label 
                    :for="'check'+item.id"
                    class="btn btn--stn text--white row row--black ">
                        {{ item.status?"выполненно":"не выполненно" }}
                </label>
                <input 
                    v-model="item.status"
                    :id="'check'+item.id"
                    type="checkbox" 
                    cheked="item.status"  
                    @click="updStatus(item.id)" 
                    class="inp-check">
    </div>
    `
};

export { sliderItemTodos }