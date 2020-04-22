import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import Argon from "./plugins/argon-kit"
import './registerServiceWorker'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import i18n from './i18n'
import TreeView from "vue-json-tree-view"

Vue.use(TreeView)
Vue.use(Vuelidate)
Vue.use(Argon)
Vue.use(VueTheMask)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app")
