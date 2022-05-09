
const mapState = Vuex.mapState;

const commentList = {
    props: ["item",],
    computed: {
        slctd() {
            return this.item.id === this.selected
        },
        ...mapState([
            "svg",
        ]),
        ...mapState("tasksModule", [
            "selected",
        ])
    },
    template: `
        <div 
            class="row task-row "
            :class="{'row_black':slctd, 'row_white': !slctd, 'card-row_interactive':!slctd}">
                <p 
                    class="row-card__content text text__content">
                        {{item.title}}
                </p>
        </div>
    `
}

export { commentList }