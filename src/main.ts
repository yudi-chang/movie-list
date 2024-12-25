import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createVuetify } from 'vuetify';
import { VPagination } from 'vuetify/components';
import 'vuetify/styles';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
  components: {
    VPagination,
  },
});
const pinia = createPinia().use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
