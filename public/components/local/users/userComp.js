

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
            class="row row_white card-row usr-row card-row_interactive db">

                        <div
                            class="card-row__list text">
                                <h5 
                                    class="text__title">
                                        {{ item.name }} {{ item.surname }}
                                </h5>

                                <h5 
                                    class="text__content">
                                        {{ item.position }}
                                </h5>
                        </div>

                        <div
                            class="card-row__list usr-row__contact text">
                                <p
                                    class="text__content">
                                        {{ item.phone }}
                                </p>
                                <p
                                    class="text__content">
                                     {{ item.mail }}
                                </p>
                        </div>

        </div>
    `
};

export { componentUser };
