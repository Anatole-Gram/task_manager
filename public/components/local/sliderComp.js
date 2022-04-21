
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
            class="card-slider__arrow card-slider__arrow--left">
        </button>
        <div class="content">
            <button v-html="svg.close"
                @click="sliderActive()"
                class="btn-close">
            </button>
            <slider-item v-if="array.length" :item="currentItem"></slider-item>
            <h3 v-else class="text text-title text--central">
              Cписок пуст
            </h3>
        </div>
        <button 
            v-html="svg.arrow"
            @click="idxIncrease()"
            class="card-slider__arrow card-slider__arrow--right">
        </button>
    `
    };
};

export { Slider };
