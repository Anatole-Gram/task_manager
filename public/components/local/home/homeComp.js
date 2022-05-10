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
                if (this.modified.file !== null) {
                    const data = new FormData()
                    data.append("img", profile.file);
                    await fetch(`${this.url}profile/updt-ava?id=${this.user.id}`, {
                        method: "POST",
                        body: data,
                    })
                        .then(response => response.json())
                        .then(data => profile.img = data.path)
                        .catch(err => alert(err))
                };
                await fetch(`${this.url}profile/updt-info?id=${this.user.id}`, {
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
            'modified',
        ]),
    },
    components: {
        "user-profile": userProfile,
        "editor-profile": editorProfile,
        "home-menu": homeMenu,
    },
    template: `
        <home-menu :edit="editProfile"></home-menu>
        <user-profile v-if="!editor" :user="user"></user-profile>
        <editor-profile v-else ref="editable"></editor-profile>
    `,
};

export { componentHome }
