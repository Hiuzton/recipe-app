import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import MyAuraPreset from './styles/themes/customTheme'
import 'primeicons/primeicons.css'

document.documentElement.classList.remove('dark')

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: MyAuraPreset,
  },
})

app.use(createPinia())
app.use(router)

app.mount('#app')
