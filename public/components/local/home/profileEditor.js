
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
        class="content card">
            <img-loader v-if="avaEditor" ref=imgLoader 
                :profileUpd="updateProfileData">
            </img-loader>

            <div 
                class="card-profile card__header-user">
                    <div 
                        class="card">
                            <img 
                                :src="profile.img"
                                ref="avatar"
                                class="ava">
                                <label for="us-ava"
                                    @click="rstFile"
                                    class="btn btn--stn row--black lbl text--white">
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
                        class="user-info">
                            <li 
                                class="user-info__item row row--white">
                                
                                    <label for="name" 
                                        class="lbl lbl--black">
                                            имя:
                                    </label>
                                    <input v-model="name"
                                         type="text"
                                         ref="txt"  
                                         id="name"
                                         class="row-form text text__content">
                                    <b 
                                        :class="{'text--green':correct.name, 'text--red': !correct.name}"
                                        class="text">
                                            обязательно&nbsp;к&nbsp;заполнению
                                    </b>
                            </li>
                            <li 
                                class="user-info__item row row--white">

                                <label for="surname"  
                                    class="lbl lbl--black">
                                        фамилия:
                                </label>
                                <input v-model="surname" 
                                    type="text"
                                    ref="txt" 
                                    id="surname"
                                    class="row-form text text__content">
                                <b 
                                    :class="{'text--green':correct.surname, 'text--red': !correct.surname}"
                                    class="text">
                                        обязательно&nbsp;к&nbsp;заполнению
                                 </b>
                                     
                            </li>
                            <li 
                                class="user-info__item row row--white">

                                    <label for="position" 
                                        class="lbl lbl--black">
                                            должность:
                                    </label> 
                                    <input v-model="profile.position"
                                        type="text" 
                                        id="position"
                                        class="row-form text text__content">

                            </li>
                            <li 
                                class="user-info__item row row--white">

                                    <label for="phone"
                                        class="lbl lbl--black">
                                            телефон:
                                    </label>
                                    <input v-model="phone"
                                        type="text"
                                        id="phone"
                                        class="row-form text text-number">
                                    <b 
                                        :class="{'text--green':correct.phone, 'text--red': !correct.phone}"
                                        class="text">
                                            номер&nbsp;формата:&nbsp;+7&nbsp;xxx&nbsp;xxx&nbsp;xx&nbsp;xx
                                    </b>

                            </li>
                            <li 
                                class="user-info__item row row--white">

                                    <label for="mail" 
                                        class="lbl lbl--black">
                                         почта:
                                    </label>
                                    <input v-model="mail"
                                        type="text"
                                        ref="mail"
                                        id="mail"
                                        class="row-form text text__content">
                                    <b 
                                        :class="{'text--green':correct.mail, 'text--red': !correct.mail}"
                                        class="text">
                                            обязательно&nbsp;к&nbsp;заполнению
                                    </b>
                            </li>
                    </ul>
            </div>
            <textarea contenteditable="true"
                v-model="profile.note"
                ref="txt"
                class="row user-note text text__content">
                    
            </textarea>
    </div>
    `,
};

export { editorProfile };
