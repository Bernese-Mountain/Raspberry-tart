import { createApp } from "vue";
import SFCButton from "./vueButton/SFCButton.vue";
import SButton from "./button";
import TSXButton from "./tsxButton/TSXButton";


// createApp(SButton).mount("#app");

// createApp(SFCButton)
// .mount("#app");

createApp(TSXButton)
.mount("#app");