const mapState = Vuex.mapState
const mapActions = Vuex.mapActions

import { todoCreator } from "../todo/creatorComp.js";
import { tskMenu } from "./tskWorkersMenu.js";
import { taskEditor } from "./taskEditor.js";

const compopnetEditor = {
    data() {
        return {
            todo: {
                id: 0,
                title: "",
                comment: "",
                destination: 0,
                taskId: this.task.id,
            },
            editTask: false,
        }
    },
    props: ["task",],
    components: {
        "begin-created": todoCreator,
        "menu-comp": tskMenu,
        "task-editor": taskEditor,
    },
    methods: {
        trtUsr(id) {
            this.todo.destination === id ? this.reset() : this.reset(id);
        },
        trtTodo(todo) {
            this.todo = Object.create(todo);
        },
        reset(id = 0) {
            this.todo = {
                id: 0,
                title: "",
                comment: "",
                destination: id,
                taskId: this.task.id,
            };
            this.$refs.todoCrtr.destination = this.todo.destination;
        },
        updTsk() {
            const correct = new Set(Object.values(this.$refs.tskedit.correct));
            if (!correct.has(false)) {
                let body = {
                    title: this.task.title,
                    description: this.task.description,
                };
                let data = {
                    body: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" },
                    method: "PUT"
                };
                this.upd({ id: this.task.id, data });
            } else alert("форма заполнена некорректно")
        },
        ...mapActions({
            getTodos: "getTaskTodos",
            upd: "updTask",
        }),
    },
    computed: {
        ...mapState([
            'url',
            "svg",
        ]),
    },
    created() {
        this.getTodos(this.task.id)
    },
    template: `

    <div 
        class="editor">

            <task-editor :obj="task" :upd="updTsk" ref="tskedit"></task-editor>

            <begin-created ref="todoCrtr" :obj="todo" :rst="reset"></begin-created>

            <menu-comp ref="workersMenu" :slctTodo="trtTodo" :slctUsr="trtUsr" :td="todo" ></menu-comp>

    </div>

    `
}
export { compopnetEditor };
