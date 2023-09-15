import { App } from "vue";
import MyButton from "./button";
import SFCButton from "./vueButton/SFCButton.vue";
import JSXButton from "./TSXButton/TSXButton";
import UnocssButton from "./UnoCssButton/UnocssButton";

// 导出单独组件
export { MyButton, SFCButton, JSXButton, UnocssButton };

// 编写一个插件，实现一个install方法

export default {
  install(app: App): void {
    app.component(MyButton.name, MyButton);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
    app.component(UnocssButton.name, UnocssButton);
  },
};
