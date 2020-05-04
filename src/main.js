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
  // console.log("value: "+value);
  // console.log("Value length: "+value.length);
  if (value.length < 10) return '';
  
  if (value.length === 10) {
    let ddd = (value/10**8).toFixed();
    let phone = (value%10**7).toFixed();
    let first_part_phone = (phone/10**3).toFixed();
    let seccond_part_phone = (phone%10**3).toFixed();
    // console.log('('+ddd+')'+' '+first_part_phone+'.'+seccond_part_phone);
    return '('+ddd+')'+' '+first_part_phone+'.'+seccond_part_phone;
  } 
  if (value.length === 11) {
    // Cellphone
    let ddd = (value/10**9).toFixed();
    let phone = (value%10**8).toFixed();
    let first_part_phone = (phone/10**4).toFixed();
    let seccond_part_phone = (phone%10**4).toFixed();
    // console.log('('+ddd+')'+' 9.'+first_part_phone+'.'+seccond_part_phone);
    return '('+ddd+')'+' 9.'+first_part_phone+'.'+seccond_part_phone;
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app")
