
const mapMutations = Vuex.mapMutations;
const mapState = Vuex.mapState;
const mapActions = Vuex.mapActions;

function Slider(namespaced, sliderItem) {
    return {
        props: ["array"],
        methods: {
            ...mapActions(namespaced, [
                "increase",
                "decrease",
            ]),
            ...mapMutations(namespaced, [
                "sliderActive",
                "idxIncrease",
                "idxDecrease",
                "setSliderIdx",
            ])
        },
        computed: {
            currentItem() {
                let amount = this.array.length - 1;
                if (this.itemIndex > amount) {
                    this.setSliderIdx(0);
                }
                if (this.itemIndex < 0) {
                    this.setSliderIdx(amount)
                };
                return this.array[this.itemIndex];
            },
            ...mapState([
                "svg",
            ]),
            ...mapState(namespaced, [
                "itemIndex"
            ]),
        },
        components: {
            "slider-item": sliderItem,
        },
        template: `
        <button 
            v-html="svg.arrow"
            @click="idxDecrease()"
            class="slider-btn slider-btn_left">
        </button>

        <button
            @click="sliderActive()"
            class="slider-btn slider-btn__close slider-btn_central">
        </button>
            <slider-item v-if="array.length" :item="currentItem"></slider-item>
            <h3 v-else style="textAlign: center" class="text text__title text_red">
              Cписок пуст
            </h3>

        <button 
            v-html="svg.arrow"
            @click="idxIncrease()"
            class="slider-btn slider-btn_right">
        </button>
    `
    };
};

export { Slider };
