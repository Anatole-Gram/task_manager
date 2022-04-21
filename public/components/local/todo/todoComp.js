
const mapState = Vuex.mapState;
const mapMutations = Vuex.mapMutations;
const mapActions = Vuex.mapActions;
const mapGetters = Vuex.mapGetters;


const componentTodo = {
    props: ['item', "index"],
    computed: {
        crtdAt() {
            const date = this.item.createdAt.match(/\d{4}-\d{2}-\d{2}/)[0];
            const time = this.item.createdAt.match(/\d{2}:\d{2}:\d{2}/)[0];
            return `<span>${date}  ${time}</span>`;
        },
        user() {
            const user = this.usrById(this.item.destination);
            return `${user.name} ${user.surname}`
        },
        ...mapGetters([
            "usrById"
        ]),
        ...mapState([
            "users"
        ]),
    },
    methods: {
        ...mapMutations("todosModule", [
            "sliderActive",
            "setSliderIdx",
        ]),
        ...mapActions([
            "updStatus",
        ])
    },
    template: `
    <div
        :key="item.id"
        @dblclick="setSliderIdx(index), sliderActive()"
        class="row row-card row-card--interactive db">
            <div 
                class="row-card__box row-card__lc">
                    <h5 class="text text__title">
                            {{ user }}
                    </h5>
            </div>

            <div 
                class="row-card__box row-card__cc text text-content">
                    {{ item.title }}
            </div>

            <div 
                class="row-card__box row-card__rc text text-content">
                    <span v-html="crtdAt"
                        class="text-date">
                    </span>
                    <label 
                        :for="'check'+item.id"
                        class="lbl">
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
    </div>
    `
}

export { componentTodo };
