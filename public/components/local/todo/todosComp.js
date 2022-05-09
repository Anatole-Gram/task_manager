import { componentTodo } from "./todoComp.js";
import { Slider } from "../sliderComp.js";
import { sliderItemTodos } from "./sliderItem.js";
import { filterUsers } from "../filters/filterUsers.js";
import { FilterCondition } from "../filters/filterCondition.js";


const mapState = Vuex.mapState;
const mapGetters = Vuex.mapGetters;
const mapMutations = Vuex.mapMutations;
const mapActions = Vuex.mapActions;

const conditionFilter = FilterCondition("todosModule");
const usersFilter = filterUsers("todosModule");
const sliderTodos = Slider("todosModule", sliderItemTodos);


const componentTodos = {
    computed: {
        ...mapState("todosModule", [
            "slider",
            "itemIndex"
        ]),
        ...mapGetters("todosModule", {
            todos: "todosFiltred",
        }),
    },
    methods: {
        ...mapMutations("todosModule", [
            "setSliderIdx"
        ]),
    },
    mounted() {
        this.$store.dispatch("getTodos", localStorage.id);
    },
    components: {
        "user-todo": componentTodo,
        "slider-todo": sliderTodos,
        "filter-users": usersFilter,
        "filter-condition": conditionFilter,
    },
    template: `

        <div 
            class="content-menu row">
                <filter-users></filter-users>
                <filter-condition></filter-condition>
        </div>

        <slider-todo v-if="slider" :array="todos" ></slider-todo>
        
        <div v-else
             class="content">
                <template v-for="(todo, index) of todos">
                    <user-todo :item="todo" :index="index"></user-todo>
                </template>
        </div>

    `,
};

export { componentTodos }

