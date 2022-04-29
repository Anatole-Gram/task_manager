
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
        class="card objective">
            <section class="objective__section">
                <label for="tsknw-ttl" 
                    class="objective__sub-ttl  lbl lbl--black text text--central">
                        задача
                    <span v-if="!correct.title" 
                        class="text--red">
                            :не менее 10 символов
                    </span>
                </label>

                <input v-model="title"
                    type="text"
                    id="tsknw-ttl" 
                    class="objective__title objective-wraper row--white text text__content text--central">
            </section> 

            <section class="objective__section">
                <label for="tsknw-txtea" 
                    class="objective__sub-ttl  lbl lbl--black text text--central">
                        описание
                    <span v-if="!correct.description" 
                        class="text--red">
                            :не менее 10 символов
                    </span>
                </label>
                <textarea v-model="description" 
                    id="tsknw-txtea" 
                    class="row objective__comment text text__content">
                </textarea>
            </section>

            <div class="row-menu">
                <button 
                    @click="rst"
                    class="btn objective-wraper row--black btn--stn text--white">
                        сбросить
                </button>
                <button 
                    @click="crtTsk"
                    class="btn row row--black btn--stn text--white">
                        добавить задачу
                </button>
            </div>
    </div>

    `
}
export { componentCreator }