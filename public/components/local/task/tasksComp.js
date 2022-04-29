

import { componentCreator } from "./tskCreator.js";
import { compopnetEditor } from "./tskManager.js";
import { commentList } from "./tasksItem.js";
import { menu } from "./menuComp.js";


const mapState = Vuex.mapState;
const mapGetters = Vuex.mapGetters;
const mapActions = Vuex.mapActions;
const mapMutations = Vuex.mapMutations;

const componentTasks = {
    methods: {
        async rmTsk() {
            await this.del({ id: this.selected, index: this.index })
                .then(this.reset())
        },
        ...mapActions({
            del: "delTask"
        }),
        ...mapActions("tasksModule", [
            "select",
            "taskCreated",
        ]),
        ...mapMutations("tasksModule", [
            "reset"
        ])
    },
    computed: {
        ...mapGetters([
            "tskById",
            "tasks",
        ]),
        ...mapState([
            'user',
        ]),
        ...mapState("tasksModule", [
            "selected",
            "index",
            "creator",
            "editor",
        ]),
    },
    created() {
        this.$store.dispatch("getTasks", this.user.id)
    },
    components: {
        "begin-created": componentCreator,
        "begin-edited": compopnetEditor,
        "list-item": commentList,
        "menu-component": menu,
    },
    template: `
    
    <div class="container container__main">

        <menu-component 
            :rm="rmTsk">
        </menu-component>
    
        <div class="content">
        
            <list-item v-if="(!creator && !editor)" v-for="(task, index) of tasks"
                :key="task.id"
                @click="select({id: task.id, idx: index})"
                :item="task">
            </list-item>

            <begin-created v-else-if="creator"></begin-created>
            
            <begin-edited v-else-if="editor" 
                :task="tskById(selected)" 
                :rm="rmTsk">
            </begin-edited>

        </div>

    </div>
    
    `
}
export { componentTasks };
