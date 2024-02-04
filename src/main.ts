import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router';
import './style/tailwind.css'
import 'jsoneditor/dist/jsoneditor.css'

createApp(App)
.use(router)
.mount('#app')
