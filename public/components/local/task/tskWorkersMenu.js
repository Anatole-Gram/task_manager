
const mapGetters = Vuex.mapGetters;

const tskMenu = {
    props: ["destination", "id", "trt", "slctusr"],
    computed: {
        todos() {
            return this.usrTodos(this.destination)
        },
        ...mapGetters([
            "taskWorkers",
            "usrTodos"
        ]),
    },
    template: `

    <div class="editor__side-bar editor-list">
        <ul 
            class="list">
                <li 
                    class="list__title lbl lbl--black">
                        над задачей работают:
                    </li>
                <li v-for="worker of taskWorkers"
                    :key="worker.id"
                    @click="slctusr(worker.id)"
                    :class="{'list__item--active': worker.id===destination}"
                    class="list__item text">
                        {{worker.name + " " + worker.surname}}
                </li>
        </ul>
        <hr>
        <ul 
            class="list">
                <li    
                    class="list__title lbl lbl--black">
                        задания пользователя:
                </li>
                <li v-for="item of todos"
                    :key="item.id"
                    @click="trt(item)" 
                    :class="{'list__item--active': item.id===id}"
                    class="list__item text">
                        {{item.title}}
                </li>
        </ul>
</div>

    `
};

export { tskMenu }