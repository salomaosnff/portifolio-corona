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

Vue.filter("formatPhone", function(value){
  if (value < 11) return '';
  
  let ddd = (value/10**9).toFixed();
  let cellphone = (value%10**8).toFixed();
  let first_part_phone = (cellphone/10**4).toFixed();
  let seccond_part_phone = (cellphone%10**4).toFixed();

  return ('('+ddd+')'+' 9.'+first_part_phone+'.'+seccond_part_phone).toString();
})

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app")
