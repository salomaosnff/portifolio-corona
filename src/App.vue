<template>
  <div id="app">
    <!-- <router-view name="header"></router-view> -->
    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view />
      </fade-transition>
    </main>
    <router-view name="footer"></router-view> 
  </div>
</template>
<script>
import { OAuth } from './services/oauth'
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition
  },
  created(){
    OAuth.login('ericson.valentim@gmail.com', '12345678').then(() => {
      console.log('Logado!')
    })
  }
};
</script>
