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
        class="editor__tsk-row row row--white row-card--interactive">
            <p 
                class="text text__content">
                    {{obj.title}}  
            </p>
    </div>  


    <div v-else
        class="editor__tsk card objective">
            <button v-html="svg.collapse"
                class="win-act"
                @click="edit=false">
            </button>

        <section class="objective__section">
            <label for="tsk_ttl"
                class="objective__sub-ttl lbl lbl--black">
                    заголовок
                <span v-if="!correct.title" 
                    class="text--red">
                    :не менее 10 символов
                </span>
            </label>
            <input 
                type="text" 
                id="tsk_ttl"
                v-model="title"
                class="objective__title objective-wraper row--white text text__content">
        </section>

        <section class="objective__section">
            <label for="tsk_descr"
                class="objective__sub-ttl lbl lbl--black">
                    описание
                <span v-if="!correct.description" 
                    class="text--red">
                        :не менее 10 символов
                </span>
                </label>
            <textarea 
                id="tsk_descr"
                v-model="description"
                class="objective__comment objective-wraper row row--white text text__content">
                </textarea>
        </section>

            <div
                class="content-menu row row--black">
                    <button 
                        @click="upd(), edit=false"
                        class="btn btn--stn text--white">
                            сохранить изменения
                    </button>
            </div>
    </div>
    `
};

export { taskEditor };
