import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Home from "./views/Home.vue";
import Item from "./views/Item.vue";
import Colaborador from "./views/Colaborador.vue";
import Investidor from "./views/Investidor.vue";
import SolucoesCadastro from "./views/solucoes/Cadastro.vue";
import IdeiasLista from "./views/ideias/Lista.vue";

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/solucoes_cadastro",
      name: "solucoes_cadastro",
      components: {
        header: AppHeader,
        default: SolucoesCadastro,
        footer: AppFooter
      }
    },
    {
      path: "/ideias_lista",
      name: "ideias_lista",
      components: {
        header: AppHeader,
        default: IdeiasLista,
        footer: AppFooter
      }
    },
    {
      path: "/",
      name: "home",
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooter
      }
    },
    {
      path: "/item",
      name: "item",
      components: {
        header: AppHeader,
        default: Item,
        footer: AppFooter
      }
    },
    {
      path: "/colaborador",
      name: "colaborador",
      components: {
        header: AppHeader,
        default: Colaborador,
        footer: AppFooter
      }
    },
    {
      path: "/investidor",
      name: "investidor",
      components: {
        header: AppHeader,
        default: Investidor,
        footer: AppFooter
      }
    },
    {
      path: "/components",
      name: "components",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
