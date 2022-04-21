import { userProfile } from "../home/profile.js";

const sliderItemUsers = {
  props: ["item"],
  components: {
    "profile-user": userProfile,
  },
  template: `
      <profile-user :user="item"></profile-user>
    `
};

export { sliderItemUsers };
