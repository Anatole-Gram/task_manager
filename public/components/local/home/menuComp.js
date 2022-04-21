const mapMutations = Vuex.mapMutations;
const mapState = Vuex.mapState;

const homeMenu = {
    props: ["edit"],
    methods: {
        ...mapMutations("homeModule", [
            "setEditor"
        ]),
    },
    computed: {
        ...mapState("homeModule", [
            "editor"
        ]),
    },
    template: `
    <div 
        class="row row--black content-menu">
            <button v-if="!editor"
                @click="setEditor(true)"
                class="btn text--white">
                    редактировать
            </button>

            <template v-else>
                <button
                    @click="setEditor(false)"
                    class="btn text--white">
                        отменить
                </button>
                <button
                    @click="edit"
                    class="btn text--white">
                    сохранить
                </button>
            </template>
    </div>
    `,
};

export { homeMenu };