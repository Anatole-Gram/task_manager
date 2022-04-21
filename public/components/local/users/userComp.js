

const mapState = Vuex.mapState
const mapMutations = Vuex.mapMutations

const componentUser = {
    props: ['item', "index"],
    methods: {
        ...mapMutations("usersModule", [
            "sliderActive",
            "setSliderIdx",
        ])
    },
    template: `
        <div  
            @dblclick="setSliderIdx(index), sliderActive()"
            class="row row-card row-card--interactive db">

                        <div
                            class="row-card__box row-card__lc">
                                <h5 
                                    class="text text__title">
                                        {{ item.name }} {{ item.surname }}
                                </h5>
                        </div>

                        <div
                            class="row-card__box row-card__cc text text__content">
                            <p>
                                
                            <span class="text--defining">должность:&nbsp</span>{{ item.position }}
                            </p>
                        </div>

                        <div
                            class="row-card__box row-card__rc text text__content">
                                <p>
                                     {{ item.phone }}
                                </p>
                                <p>
                                     {{ item.mail }}
                                </p>
                        </div>

        </div>
    `
};

export { componentUser };
