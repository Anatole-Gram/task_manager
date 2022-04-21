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
        <div class="content-menu row row--black">
            <template v-if="selected">
                <button
                    @click="rm"
                    class="btn btn--stn text--white">
                    удалить
                </button>
                <button v-if="editor"
                    @click="reset()"
                    class="btn btn--stn text--white">
                        закрыть
                </button>
                <button v-else
                    @click="setEditor(true)"
                    class="btn btn--stn text--white">
                        редактировать
                </button>
            </template>
            <template v-else>
                <button v-if="creator"
                    @click="reset()"
                    class="btn btn--stn text--white">
                        закрыть
                </button>
                <button v-else
                    @click="setCreator(true)"
                    class="btn btn--stn text--white">
                        новая задача
                </button>
            </template>
        </div>
    `
};

export { menu }