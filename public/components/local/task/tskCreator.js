
const mapGetters = Vuex.mapGetters;
const mapActions = Vuex.mapActions;
const mapMutations = Vuex.mapMutations;


import { TextFormChecker } from "../../mixins.js"
const taskChecker = new TextFormChecker(["title", "description"])
const componentCreator = {
    mixins: [taskChecker],
    data() {
        return {
            obj: {
                title: "",
                description: "",
            },
            correct: {
                title: false,
                description: false,
            }
        }
    },
    methods: {
        async crtTsk() {
            const correct = new Set(Object.values(this.correct));
            if (!correct.has(false)) {
                let body = {
                    title: this.obj.title,
                    description: this.obj.description
                };
                let data = {
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },
                    method: "POST"
                };
                let crtdTsk = await this.addTask(data);
                this.taskCreated(crtdTsk);
                this.setCreator(false);
            } else alert("форма заполнена некорректно")
        },
        rst() {
            this.obj = {
                title: "",
                description: "",
            }
        },
        ...mapActions([
            "addTask"
        ]),
        ...mapActions("tasksModule", [
            "taskCreated",
        ]),
        ...mapMutations("tasksModule", [
            "reset",
            "setCreator",
        ]),
    },
    computed: {
        ...mapGetters([
            "tskById"
        ]),
    },
    template: `
    <div
        class="todo">
            <section class="todo__section">
                <label for="tsknw-ttl" 
                    class="todo__section-sub-ttl text text_defining">
                        задача
                    <span v-if="!correct.title" 
                        class="text_red">
                            :не менее 10 символов
                    </span>
                </label>

                <input v-model="title"
                    type="text"
                    id="tsknw-ttl" 
                    class="row todo__title row_white text text__content">
            </section> 

            <section class="todo__section">
                <label for="tsknw-txtea" 
                    class="todo__section-sub-ttl text text_defining">
                        описание
                    <span v-if="!correct.description" 
                        class="text_red">
                            :не менее 10 символов
                    </span>
                </label>
                <textarea v-model="description" 
                    id="tsknw-txtea" 
                    class="row row_white todo__comment todo__comment text text__content">
                </textarea>
            </section>

            <div class="menu-row menu_2b">
                <button 
                    @click="rst"
                    class="btn todo__btn row row_black text_white">
                        сбросить
                </button>
                <button 
                    @click="crtTsk"
                    class="btn todo__btn row row_black text_white">
                        добавить задачу
                </button>
            </div>
    </div>

    `
}
export { componentCreator }
