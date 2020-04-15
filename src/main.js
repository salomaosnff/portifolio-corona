import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import Argon from "./plugins/argon-kit"
import './registerServiceWorker'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(Argon)
Vue.use(VueTheMask)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
