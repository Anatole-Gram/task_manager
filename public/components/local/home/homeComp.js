import { userProfile } from "./profile.js";
import { homeMenu } from "./menuComp.js";
import { editorProfile } from "./profileEditor.js";



const mapState = Vuex.mapState;
const mapMutations = Vuex.mapMutations;



const componentHome = {

    methods: {

        async editProfile() {
            const correct = new Set(Object.values(this.$refs.editable.correct));
            if (!correct.has(false)) {
                const profile = this.$refs.editable.profile;
                if (this.$refs.editable.file) {
                    const data = new FormData()
                    data.append("img", this.$refs.editable.file);
                    await fetch(`${this.url}/api/profile-ava?id=${this.user.id}`, {
                        method: "POST",
                        body: data,
                    })
                        .then(response => response.json())
                        .then(data => profile.img = data.path)
                };
                await fetch(`${this.url}/api/profile?id=${this.user.id}`, {
                    method: "PUT",
                    headers: { 'COntent-Type': 'application/json' },
                    body: JSON.stringify(profile),
                }).then(response => response.json()).then(data => this.setUser(data)).catch(err => alert(err))
                this.setEditor(false);
            } else alert("Проверьте корректность заполнения обязательных полей в форме")
        },
        ...mapMutations([
            "setUser",
        ]),
        ...mapMutations("homeModule", [
            "setEditor",
        ])
    },
    computed: {
        ...mapState([
            "user",
            'url'
        ]),
        ...mapState("homeModule", [
            "editor",
        ]),
    },
    components: {
        "user-profile": userProfile,
        "editor-profile": editorProfile,
        "home-menu": homeMenu,
    },
    template: `
    <div class="container container__main">
        <home-menu :edit="editProfile"></home-menu>
        <div class="content">
            <user-profile v-if="!editor" :user="user"></user-profile>
            <editor-profile v-else ref="editable"></editor-profile>
        </div>
    </div>
    `,
};

export { componentHome }