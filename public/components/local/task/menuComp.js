const mapState = Vuex.mapState;
const mapMutations = Vuex.mapMutations;

const menu = {
    props: ["rm",],
    methods: {
        ...mapMutations("tasksModule", [
            "setCreator",
            "setEditor",
            "reset"
        ])
    },
    computed: {
        ...mapState("tasksModule", [
            "selected",
            "creator",
            "editor",
        ]),
    },
    template: `
    <div 
        class="content-menu menu row row_black ">
            <template v-if="selected">
                <button
                    @click="rm"
                    class="content-menu__btn text_white">
                    удалить
                </button>
                <button v-if="editor"
                    @click="reset()"
                    class="content-menu__btn text_white">
                        закрыть
                </button>
                <button v-else
                    @click="setEditor(true)"
                    class="content-menu__btn text_white">
                        редактировать
                </button>
            </template>
            <template v-else>
                <button v-if="creator"
                    @click="reset()"
                    class="content-menu__btn text_white">
                        закрыть
                </button>
                <button v-else
                    @click="setCreator(true)"
                    class="content-menu__btn text_white">
                        новая задача
                </button>
            </template>
    </div>
    `
};

export { menu }