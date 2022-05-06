
const mapState = Vuex.mapState;

const commentList = {
    props: ["item",],
    computed: {
        slctd() {
            return this.item.id === this.selected
        }
        ,
        ...mapState([
            "svg",
        ]),
        ...mapState("tasksModule", [
            "selected",
        ])
    },
    template: `
        <div 
            class="row row_white task-row card-row_interactive"
            :class="{'row_black': slctd}">
                <p 
                    class="row-card__content text text__content">
                        {{ item.title }}
                </p>
        </div>
    `
}

export { commentList }