import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
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

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
