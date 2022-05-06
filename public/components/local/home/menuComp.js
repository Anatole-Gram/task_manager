const mapMutations = Vuex.mapMutations;
const mapState = Vuex.mapState;

const homeMenu = {
    props: ["edit"],
    methods: {
        ...mapMutations("homeModule", [
            'setEditor',
            'reset'
        ]),
    },
    computed: {
        ...mapState("homeModule", [
            'editor',
            'avaEditor',
        ]),
    },
    template: `
    <div 
        class="content-menu menu row row_black ">
            <button v-if="!editor"
                @click="setEditor(true)"
                class="content-menu__btn">
                    редактировать
            </button>

            <template v-else>
                <button
                    @click="reset"
                    class="content-menu__btn">
                        отменить
                </button>
                <button v-if="!avaEditor"
                    @click="edit"
                    class="content-menu__btn">
                    сохранить
                </button>
            </template>
    </div>
    `,
};

export { homeMenu };
