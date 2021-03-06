
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
            const user = this.usrById(this.item.sender);
            return `${user.name} ${user.surname}`
        },
        title() {
            return this.item.title.length > 45 ? this.item.title.slice(0, 45) + "..." : this.item.title.slice(0, 45);
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
        class="card-row usr-row row row_white db">
            <div 
                class="card-row__list text">
                    <h5 class="text__title">
                            {{ user }}
                    </h5>
                    <p
                        class="text__content">
                        {{ title }}
                    </p>
            </div>

            <div 
                class="card-row__list usr-row__contact text">
                    <span v-html="crtdAt"
                        class="text__content">
                    </span>
                    <label 
                        :for="'check'+item.id"
                        class="lbl">
                            {{ item.status?"выполненно":"не&nbsp;выполненно" }}
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


