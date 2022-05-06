
const mapState = Vuex.mapState;
const mapMutations = Vuex.mapMutations;

function FilterCondition(namespaced) {
    return {
        methods: {
            ...mapMutations(namespaced, [
                "setCondition"
            ]),
        },
        computed: {
            condition: {
                get() {
                    return this.filterCondition
                },
                set(value) {
                    this.setCondition(value)
                },
            },
            ...mapState(namespaced, [
                "filterCondition",
            ]),
        },
        template: `
        <div 
            class="filter filter-condition filter-menu">
                <label for="slct_con" 
                    class="text text__content text_white">
                        cтатус:&nbsp;
                </label>
                <select id="slct_con"
                    v-model="condition"
                    class="filter-condition__select text text__content text_white">
                        <option :value="'all'" selected>все</option>
                        <option :value="true">завершено</option>
                        <option :value="false">не завершено</option>
                </select>
        </div>   
    `,
    }
};

export { FilterCondition }