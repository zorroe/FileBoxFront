import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import dynamicBackground from '@/styles/background'

const app = createApp(App)

app.use(router).mount('#app')
dynamicBackground()