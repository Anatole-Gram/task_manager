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
        async rmTodo() {
            const url = `${this.url}todos/rm-todo?id=${this.obj.id}&task=${this.obj.taskId}&destination=${this.obj.destination}`;
            await fetch(url, { method: "DELETE" })
                .then(response => {
                    this.delTodo({ response, id: this.obj.id, destination: this.obj.destination });
                    response.status === 205 ? this.rst() : this.rst(this.obj.destination);
                });
        },
        ...mapActions([
            'sendTodo',
            'delTodo',
        ]),
    },
    computed: {
        ...mapState([
            'url',
            'user',
            'users',
        ]),
    },
    template: `

    <div 
        class="editor__creator todo">
            <section class="todo__section">
                <label for="tdcrt-tlt" 
                    class="todo__section-sub-ttl lbl lbl_black">
                        задание
                        <span v-show="!correct.title" 
                            class="text_red">
                                : не менее 10 символов
                        </span>
                </label>
                <input v-model="title"
                    type="text" 
                    id="tdcrt-tlt"
                    class="todo__title todo__text-wraper row row_white text text__content">
            </section>
            <section class="todo__section">
                <label for="tdcrt-txtae" 
                    class="todo__section-sub-ttl  lbl lbl_black">
                        комментарий
                        <span v-if="!correct.comment" 
                            class="text_red">
                                :не менее 10 символов
                        </span>
                </label>
                <textarea v-model="comment"
                    id="tdcrt-txtae" 
                    class="todo__comment todo__text-wraper row text text__content">
                </textarea>
            </section>
    </div>
<section 
    class="editor__options">
    <div 
        class="menu-row creator__filter row row_black">
            <select v-model="destination"
                :disabled="obj.id?true:false"
                id="slc1" 
                class="filter-condition__select text text__content text_white">
                    <option 
                        disabled
                        value="0"
                        class="text_red">
                            выберите пользователя
                    </option>
                    <option v-for="usr of users"
                        :value="usr.id">
                            {{usr.name}} {{usr.surname}}
                    </option>
            </select>
    </div>


    <div 
        class="menu-row todo__menu">
            <button v-if="obj.id"
                @click="rmTodo"
                class="btn btn--stn row row_black text_white">
                    удалить задание
            </button>
            <button
                @click="obj.id ? rst(obj.destination) : rst()"
                v-text="obj.id ? 'новое задание' : 'сбросить'"
                class="btn btn_stn row row_black text_white">
            </button>
            <button  
                @click="send"
                v-text="obj.id ? 'сохранить изменения' : 'добавить задание'" 
                class="btn btn_stn row row_black text_white">
            </button>
    </div>
</section>
    `
}
export { todoCreator }
