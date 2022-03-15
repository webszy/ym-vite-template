import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import { createPinia } from 'pinia'

import 'virtual:windi-utilities.css'
import './styles/reset.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(createPinia())
app.use(router)
app.mount('#app')
