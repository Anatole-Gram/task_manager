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
    props: ["task"],
    components: {
        "begin-created": todoCreator,
        "menu-comp": tskMenu,
        "task-editor": taskEditor,
    },
    methods: {
        trtUsr(id) {
            this.todo.destination = id;
        },
        trtTodo(todo) {
            this.todo = todo;
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
        async rmTodo() {
            const url = "http://127.0.0.1:3000/api/deltodos?id=" + this.todo.id + "&task=" + this.todo.taskId + "&destination=" + this.todo.destination;
            await fetch(url, { method: "DELETE" })
                .then(response => {
                    this.del({ response, id: this.todo.id, destination: this.todo.destination });
                    response.status === 205 ? this.reset() : this.reset(this.todo.destination);
                });
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
            del: "delTodo"
        }),
    },
    computed: {
        ...mapState([
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

            <begin-created ref="todoCrtr" :obj="todo" :rst="reset" :rm="rmTodo"></begin-created>

            <menu-comp :destination="todo.destination" id="todo.id" :trt="trtTodo" :slctusr="reset"></menu-comp>

    </div>

    `
}
export { compopnetEditor };
