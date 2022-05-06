


const mapState = Vuex.mapState;
const mapGetters = Vuex.mapGetters;
const mapMutations = Vuex.mapMutations;
const mapActions = Vuex.mapActions;


function filterUsers(namespaced) {
    return {
        data() {
            return {
                showList: true,
            }
        },
        methods: {
            ...mapMutations(namespaced, {
                updSelected: "updSelected"
            }),
            ...mapActions(namespaced, {
                selectAll: "selectAll"
            }),
        },
        computed: {
            ...mapState(namespaced, {
                selected: "selected"
            }),
            ...mapState([
                "users",
            ]),
            ...mapGetters(namespaced, {
                allSelected: "allSelected",
            })
        },
        mounted() {

        },

        template: `
        <div class="filter filter-users">
            <div 
                class="filter filter__menu text_white">
                    <span 
                        @click="showList=!showList" 
                        class="btn text text__content text_white">
                            пользователи:&nbsp;
                    </span> 
                <input
                    type="button"
                    @click="selectAll(!allSelected)"
                    :value="allSelected ? 'сбросить' : 'выбрать всех'"
                    :class="{
                        'text_green': !allSelected,
                        'text_red': allSelected
                    }"
                    class="btn text text__content">
            </div>

            <ul 
                :class="{'block': showList}"
                class="filter-list">
                    <li v-for="user of users"
                        class="list__item">
                            <label :for="'user_'+user.id"
                                :class="{'text_green': selected.has(user.id)}"
                                class="lbl text_white">
                                    {{ user.name }} {{ user.surname }} 
                            </label>
                            <input 
                                type="checkbox"
                                :id="'user_'+user.id"
                                @click="updSelected(user.id)"
                                class="inp-check">
                    </li>
                    <li
                        class="filter__menu">
                            <button  
                                @click="selectAll(false)"
                                class="btn text text__content text_red">
                                    cбросить
                            </button>
                    </li>
            </ul>
        </div>
    `
    };
}

export { filterUsers };
