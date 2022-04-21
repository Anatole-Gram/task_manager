

const userProfile = {
    props: ["user"],
    template: `
    <div 
        class="card">
            <div 
                class="card__header card__header-user">
                <div 
                    class="card">
                        <img 
                            :src="user.img" 
                            alt="user photo"
                            class="ava">
                </div>   
                    <ul 
                        class="user-info">
                            <li 
                                class="text text__title user-info__title">
                                    {{ user.name }} {{ user.surname }}
                            </li>

                            <li 
                                class="text text__content user-info__item">
                                    <span class="text--defining">должность:&nbsp</span> 
                                    {{ user.position }}
                            </li>
                            <li 
                                class="text text__content user-info__item">
                                    <span class="text--defining">телефон:&nbsp</span> {{ user.phone }}
                            </li>
                            <li 
                                class="text text__content user-info__item">
                                    <span class="text--defining">почта:&nbsp</span> {{ user.mail }}
                            </li>
                    </ul>
            </div>
            <div 
                class="user-note row row--white">
                    <p 
                        class="text text__content">
                            {{user.note}}
                    </p>
            </div>
    </div>
    `,
};

export { userProfile }