

const mapGetters = Vuex.mapGetters;

const tskMenu = {
    props: ['slctTodo', 'slctUsr', 'td',],
    methods: {
        ltlBitStr(str, limit) {
            return str.length - 1 > limit ? str.slice(0, limit - 1) + '...' : str;
        }
    },
    computed: {
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
                    class="list__title lbl lbl_black">
                        над задачей работают:
                    </li>
                <li v-for="worker of taskWorkers"
                    :key="worker.id"
                    @click="slctUsr(worker.id)"
                    :class="{'list__item_active': worker.id===td.destination}"
                    class="list__item row card-row_interactive text">
                        {{worker.name + " " + worker.surname}}
                </li>
        </ul>
        <hr>
        <ul 
            class="list">
                <li    
                    class="list__title lbl lbl_black">
                        задания пользователя:
                </li>
                <li v-for="item of usrTodos(td.destination)"
                    :key="item.id"
                    @click="slctTodo(item)" 
                    :class="{'list__item_active': item.id===td.id}"
                    class="list__item row card-row_interactive text">
                        {{ltlBitStr(item.title, 30)}}
                </li>
        </ul>
    </div>

    `
};

export { tskMenu }