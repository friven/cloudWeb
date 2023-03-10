import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/font/font.scss'
import './assets/font/iconfont/iconfont.css'
import './assets/css/emjoy.css'
const app: any = createApp(App)
app.use(store).use(router).use(ElementPlus).mount('#app')
