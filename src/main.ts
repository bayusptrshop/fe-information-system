import { createApp } from 'vue'

import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ToastPlugin from 'vue-toast-notification';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Aura from '@primevue/themes/aura';
// import Toast from 'vue-toastification'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import 'primeicons/primeicons.css';


// import 'vue-toastification/dist/index.css';

// Create vue app
const app = createApp(App)
app.use(PrimeVue, { 
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false || 'none',
  }
} 
});
app.use(ToastService);
app.use(ToastPlugin);
app.component('DataTable', DataTable)
app.component('Column', Column)
// app.use(Toast);
// Register plugins
registerPlugins(app)

// Mount vue app
app.mount('#app')
