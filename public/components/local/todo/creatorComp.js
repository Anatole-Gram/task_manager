const mapState = Vuex.mapState
const mapActions = Vuex.mapActions

import { TodoFormChecker } from "../../mixins.js";
const todoChecker = new TodoFormChecker(["title", "comment"])
const todoCreator = {
    mixins: [todoChecker],
    data() {
        return {
            correct: {
                title: false,
                comment: false,
                destination: false,
            }
        }
    },
    props: ["obj", "rst", "rm"],
    methods: {
        async send() {
            const check = new Set(Object.values(this.correct))
            if (!check.has(false)) {
                let body = {
                    title: this.obj.title,
                    comment: this.obj.comment,
                    sender: this.user.id,
                    destination: this.obj.destination,
                };
                let data = {
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json' },
                    method: this.obj.id ? "PUT" : "POST",
                };
                let id = this.obj.id ? this.obj.id : this.obj.taskId;
                await this.sendTodo({ id, data })
                    .then(this.rst(this.obj.destination), this.initCorrect(this.arrToCheckText, this))
            } else alert('форма заполнена некорректно')
        },
        ...mapActions([
            "sendTodo"
        ]),
    },
    computed: {
        ...mapState([
            "user",
            "users",
        ]),
    },
    template: `

    <div 
        class="editor-todo card objective">
            <section class="objective__section">
                <label for="tdcrt-tlt" 
                    class="objective__sub-ttl lbl lbl--black">
                        задание
                        <span v-show="!correct.title" 
                            class="text--red">
                                : не менее 10 символов
                        </span>
                </label>
                <input v-model="title"
                    type="text" 
                    id="tdcrt-tlt"
                    class="objective__title objective-wraper row--white text text__content">
            </section>
            <section class="objective__section">
                <label for="tdcrt-txtae" 
                    class="objective__sub-ttl  lbl lbl--black">
                        комментарий
                        <span v-if="!correct.comment" 
                            class="text--red">
                                :не менее 10 символов
                        </span>
                </label>
                <textarea v-model="comment"
                    id="tdcrt-txtae" 
                    class="editor-todo__comment objective-wraper row text text__content">
                </textarea>
            </section>
    </div>

    <div 
        class="editor-slct row row--black">
            <select v-model="destination"
                id="slc1" 
                class="filter-condition__select text text__content text--white">
                    <option 
                        disabled
                        value="0"
                        class="text--red">
                            выберите пользователя
                    </option>
                    <option v-for="usr of users"
                        :value="usr.id">
                            {{usr.name}} {{usr.surname}}
                    </option>
            </select>
    </div>


    <div 
        class="editor-menu ">
            <button v-if="obj.id"
                @click="rm"
                class="btn btn--stn row row--black text--white">
                    удалить задание
            </button>
            <button
                @click="obj.id ? rst(obj.destination) : rst()"
                v-text="obj.id ? 'новое задание' : 'сбросить'"
                class="btn btn--stn row row--black text--white">
            </button>
            <button  
                @click="send"
                v-text="obj.id ? 'сохранить изменения' : 'добавить задание'" 
                class="btn btn--stn row row--black text--white">
            </button>
    </div>

    `
}
export { todoCreator }
