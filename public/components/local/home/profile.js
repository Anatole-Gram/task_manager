

const userProfile = {
    props: ["user"],
    methods: {
        imgErr(e) {
            e.target.src = "/img/bg/img-nf.jpg"
        },
    },
    template: `
    <div class="profile">
            <div 
                class="profile__info">
                <div 
                    class="card">
                        <img 
                            :src="user.img" 
                            @error='imgErr($event)'
                            alt="user photo"
                            class="profile__info-ava">
                </div>   
                    <ul 
                        class="profile__info-list">
                            <li 
                                class="text text__title user-info__title">
                                    {{ user.name }} {{ user.surname }}
                            </li>

                            <li 
                                class="text text__content user-info__item">
                                    <span class="text text_defining">должность:&nbsp</span> 
                                    {{ user.position }}
                            </li>
                            <li 
                                class="text text__content user-info__item">
                                    <span class="text text_defining">телефон:&nbsp</span> {{ user.phone }}
                            </li>
                            <li 
                                class="text text__content user-info__item">
                                    <span class="text text_defining">почта:&nbsp</span> {{ user.mail }}
                            </li>
                    </ul>
            </div>
            <div 
                class="profile__note row row_white">
                    <p 
                        class="text text__content">
                            {{user.note}}
                    </p>
            </div>
        </div>
    `,
};

export { userProfile }
