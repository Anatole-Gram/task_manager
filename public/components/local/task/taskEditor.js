const mapState = Vuex.mapState
import { TextFormChecker } from "../../mixins.js"
const taskChecker = new TextFormChecker(["title", "description"])
const taskEditor = {
    mixins: [taskChecker],
    data() {
        return {
            edit: false,
            correct: {
                title: true,
                description: true,
            }
        }
    },
    props: ["obj", "upd"],
    computed: {
        ...mapState([
            "svg",
        ])
    },

    template: `

    <div v-if="!edit"
        @click="edit=true"
        class=" editor__task-row row row_white task-row card-row_interactive">
            <p 
                class="text text__content">
                    {{obj.title}}  
            </p>
    </div>  


    <div v-else
        class="editor-tsk todo">
            <button v-html="svg.collapse"
                class="win-act"
                @click="edit=false">
            </button>

        <section class="todo__section">
            <label for="tsk_ttl"
                class="todo__section-sub-ttl lbl lbl_black">
                    заголовок
                <span v-if="!correct.title" 
                    class="text_red">
                    :не менее 10 символов
                </span>
            </label>
            <input 
                type="text" 
                id="tsk_ttl"
                v-model="title"
                class="todo__title todo__text-wraper row row_white text text__content">
        </section>

        <section class="todo__section">
            <label for="tsk_descr"
                class="todo__section-sub-ttl lbl lbl_black">
                    описание
                <span v-if="!correct.description" 
                    class="text_red">
                        :не менее 10 символов
                </span>
                </label>
            <textarea 
                id="tsk_descr"
                v-model="description"
                class="todo__comment todo__text-wraper row row_white text text__content">
                </textarea>
        </section>

            <div
                class="content-menu menu row row_black">
                    <button 
                        @click="upd(), edit=false"
                        class="btn btn_stn text_white">
                            сохранить изменения
                    </button>
            </div>
    </div>

    `
};

export { taskEditor };
