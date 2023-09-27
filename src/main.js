import './assets/main.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vant/lib/index.css'; // 引入vant组件样式

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
