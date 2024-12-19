import '@/assets/css/index.scss'  // index.css
import {createApp} from 'vue'
import {createPinia} from 'pinia'  // pinia

import App from './App.vue' // app
import router from './router' // router

import ElementPlus from 'element-plus' // element
import 'element-plus/dist/index.css' // element
import timeButton from '@/components/timeButton.vue' // 时间进度的按钮

// import {pushTnfoTxt} from '@/components/maxin/mixins.js';
// import anime from 'animejs';
const app = createApp(App)

app.component("timeButton", timeButton) //时间进度条按钮

// app.use(anime)// anime.js 动画库

app.use(createPinia())
app.use(router)

app.use(ElementPlus) // element

app.mount('#app')
