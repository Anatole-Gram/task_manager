
import { imgLoader } from "./img_loader.js";

const mapState = Vuex.mapState;
const mapMutations = Vuex.mapMutations;

const editorProfile = {
    data() {
        return {
            profile: {},
            correct: {
                name: true,
                surname: true,
                phone: true,
                mail: true,
            }
        }
    },
    methods: {
        loader() {
            const file = this.$refs.file.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                this.modifiedImg({ dataUrl: reader.result, blob: null })
                this.editorAva(true)
            });
            if (/\.(jpe?g|png)$/i.test(file.name)) {
                reader.readAsDataURL(file);
            };
        },
        checkName(item, val) {
            let check = this.exp.name.exec(val.trim());
            if (check) {
                let name = check.groups.name;
                this.profile[item] = name[0].toUpperCase() + name.slice(1).toLowerCase();
                this.correct[item] = true;
            } else { this.correct[item] = false; this.profile[item] = val };
        },
        updateProfileData(sources) {
            Object.assign(this.profile, sources);
        },
        rstFile() {
            this.$refs.file.value = null;
        },
        ...mapMutations('homeModule', [
            'editorAva',
            'modifiedImg',
        ]),

    },
    computed: {
        name: {
            set(newVal) {
                this.checkName('name', newVal)
            },
            get() {
                return this.profile.name
            }
        },
        surname: {
            set(newVal) {
                this.checkName('surname', newVal)
            },
            get() {
                return this.profile.surname
            }
        },
        phone: {
            set(newVal) {
                let res = ""
                const exp = /^(?<b>\s?\+\s?7)|(?<a>\s?\+)/;
                const check = exp.exec(newVal);
                if (check) {
                    switch (false) {
                        case (check.groups.a): res += `+`;
                        case (check.groups.b): res += 7;
                        default: res = `+7`;
                    };
                    this.profile.phone = res + newVal.split(check[0])[1];
                } else this.profile.phone = `+7${newVal}`;
                this.profile.phone = this.profile.phone.replace(/\s+/g, "")
                const correct = this.exp.phone.exec(this.profile.phone)
                if (correct) {
                    this.correct.phone = true;
                    this.profile.phone = Object.values(correct.groups).join(" ")
                }
                else this.correct.phone = false;
            },
            get() {
                return this.profile.phone
            }
        },
        mail: {
            set(newVal) {
                this.exp.mail.test(newVal.trim()) ? this.correct.mail = true : this.correct.mail = false;
                this.profile.mail = newVal.trim();
            },
            get() {
                return this.profile.mail
            }
        },
        ...mapState([
            "user",
            "exp",
        ]),
        ...mapState('homeModule', [
            'avaEditor',
            'modified',
        ])
    },
    mounted() {
        this.updateProfileData(this.user)
    },

    components: {
        "img-loader": imgLoader,
    },
    template: `
    <div 
        class="profile">
            <img-loader v-if="avaEditor" ref=imgLoader 
                :profileUpd="updateProfileData">
            </img-loader>

            <div 
                class="profile__info">
                    <div 
                        class="card">
                            <img 
                                :src="profile.img"
                                ref="avatar"
                                class="profile__info-ava">
                                <label for="us-ava"
                                    @click="rstFile"
                                    class="profile__info-btn btn row row_black">
                                        выберите файл
                                </label>
                            <input  
                                type="file"
                                ref="file"
                                id="us-ava"
                                accept="image/*"
                                @change="loader()"
                                class="block">

                    </div>

                    <ul 
                        class="profile__info-list">
                            <li 
                                class="profile__info-row row row_white">
                                
                                    <label for="name" 
                                        class="lbl lbl_black">
                                            имя:&nbsp;
                                    </label>&nbsp;
                                    <input v-model="name"
                                         type="text"
                                         ref="txt"  
                                         id="name"
                                         class="text text__content">
                                    <b 
                                        :class="{'text_green':correct.name, 'text_red': !correct.name}"
                                        class="profile__info-msg text">
                                            обязательно&nbsp;к&nbsp;заполнению
                                    </b>
                            </li>
                            <li 
                                class="profile__info-row row row_white">

                                <label for="surname"  
                                    class="lbl lbl_black">
                                        фамилия:&nbsp;
                                </label>
                                <input v-model="surname" 
                                    type="text"
                                    ref="txt" 
                                    id="surname"
                                    class="text text__content">
                                <b 
                                    :class="{'text_green':correct.surname, 'text_red': !correct.surname}"
                                    class="profile__info-msg text">
                                        обязательно&nbsp;к&nbsp;заполнению
                                 </b>
                                     
                            </li>
                            <li 
                                class="profile__info-row row row_white">

                                    <label for="position" 
                                        class="lbl lbl_black">
                                            должность:&nbsp;
                                    </label> 
                                    <input v-model="profile.position"
                                        type="text" 
                                        id="position"
                                        class="text text__content">

                            </li>
                            <li 
                                class="profile__info-row row row_white">

                                    <label for="phone"
                                        class="lbl lbl_black">
                                            телефон:&nbsp;
                                    </label>
                                    <input v-model="phone"
                                        type="text"
                                        id="phone"
                                        class="text text__content">
                                    <b 
                                        :class="{'text_green':correct.phone, 'text_red': !correct.phone}"
                                        class="profile__info-msg text">
                                            номер&nbsp;формата:&nbsp;+7&nbsp;xxx&nbsp;xxx&nbsp;xx&nbsp;xx
                                    </b>

                            </li>
                            <li 
                                class="profile__info-row row row_white">

                                    <label for="mail" 
                                        class="lbl lbl_black">
                                         почта:&nbsp;
                                    </label>
                                    <input v-model="mail"
                                        type="text"
                                        ref="mail"
                                        id="mail"
                                        class="text text__content">
                                    <b 
                                        :class="{'text_green':correct.mail, 'text_red': !correct.mail}"
                                        class="profile__info-msg text">
                                            обязательно&nbsp;к&nbsp;заполнению
                                    </b>
                            </li>
                    </ul>
            </div>
            <textarea contenteditable="true"
                v-model="profile.note"
                ref="txt"
                class="profile__note row row--white text text__content">
                    
            </textarea>
    </div>
    `,
};

export { editorProfile };
