// import { createApp } from "vue";
import { createApp } from "vue/dist/vue.esm-bundler.js";
import SFCButton from "./vueButton/SFCButton.vue";
import SButton from "./button";
import TSXButton from "./tsxButton/TSXButton";
import UnoCssButton from "./UnoCssButton/UnocssButton";
import "uno.css";
import RaspberryTart from './entry'



// createApp(SButton).mount("#app");

// createApp(SFCButton)
// .mount("#app");

// createApp(TSXButton)
// .mount("#app");

createApp({
    template:`
        <div>
            <UnoCssButton>普通按钮</UnoCssButton>
        </div>
    `
})
.use(RaspberryTart)
.mount("#app");