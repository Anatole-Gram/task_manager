import { componentUser } from "./userComp.js";
import { Slider } from "../sliderComp.js";
import { sliderItemUsers } from "./sliderItem.js";
import { filterUsers } from "../filters/filterUsers.js";

const mapState = Vuex.mapState;
const mapGetters = Vuex.mapGetters;

const usersFilter = filterUsers("usersModule");
const sliderUsers = Slider("usersModule", sliderItemUsers);

const componentUsers = {
    computed: {
        ...mapGetters("usersModule", [
            "users",

        ]),
        ...mapState("usersModule", [
            "slider",
        ])
    },
    components: {
        "user-card": componentUser,
        "slider-user": sliderUsers,
        "filter-users": usersFilter,
    },
    template: `

        <div 
            class="content-menu row">
                <filter-users></filter-users>
        </div>

        <slider-user v-if="slider" :array="users"></slider-user>
        <div v-else class="content">
            <template   v-for="(user, index) of users">
                <user-card :item="user" :index="index"></user-card>
            </template>
        </div>
            

    


    `,
};

export { componentUsers };

