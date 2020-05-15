import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/usuario/Login.vue";
import Registro from "./views/usuario/Registro.vue";
import Profile from "./views/Profile.vue";
import Home from "./views/Home.vue";
import Item from "./views/Item.vue";
import Colaborador from "./views/Colaborador.vue";
import Investidor from "./views/Investidor.vue";
import SolucoesCadastro from "./views/solucoes/Cadastro.vue";
import SolucoesLista from "./views/solucoes/Lista.vue";
import Desenvolvimento from './views/genericas/Desenvolvimento.vue'
import DashboardInvestimento from './views/investimentos/Dashboard.vue'
import UsuarioSolucoesLista from './views/usuario/SolucoesLista.vue'
import ForumLista from './views/forum/Lista.vue'
import ForumCadastro from './views/forum/Cadastro.vue'
import Test from "./views/Test.vue"
import NoticiasCadastro from './views/noticias/Cadastro.vue'
import NoticiasLista from './views/noticias/Lista.vue'
import EsqueceuSenha from './views/usuario/EsqueceuSenha.vue'
import Sobre from './views/Sobre.vue'
import Contato from './views/Contato.vue'

Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/contato",
      name: "contato",
      components: {
        header: AppHeader,
        default: Contato,
        footer: AppFooter
      }
    },    
    {
      path: "/sobre",
      name: "sobre",
      components: {
        header: AppHeader,
        default: Sobre,
        footer: AppFooter
      }
    },
    {
      path: "/noticias_cadastro",
      name: "noticias_cadastro",
      components: {
        header: AppHeader,
        default: NoticiasCadastro,
        footer: AppFooter
      }
    },
    {
      path: "/noticias_lista",
      name: "noticias_lista",
      components: {
        header: AppHeader,
        default: NoticiasLista,
        footer: AppFooter
      }
    },
    {
      path: "/forum_cadastro",
      name: "forum_cadastro",
      components: {
        header: AppHeader,
        default: ForumCadastro,
        footer: AppFooter
      }
    },
    {
      path: "/forum_lista",
      name: "forum_lista",
      components: {
        header: AppHeader,
        default: ForumLista,
        footer: AppFooter
      }
    },
    {
      path: "/usuario_solucoes_lista",
      name: "usuario_solucoes_lista",
      components: {
        header: AppHeader,
        default: UsuarioSolucoesLista,
        footer: AppFooter
      }
    },
    {
      path: "/dashboard_investimento",
      name: "dashboard_investimento",
      components: {
        header: AppHeader,
        default: DashboardInvestimento,
        footer: AppFooter
      }
    },
    {
      path: "/desenvolvimento",
      name: "desenvolvimento",
      components: {
        header: AppHeader,
        default: Desenvolvimento,
        footer: AppFooter
      }
    },
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
      path: "/solucoes_lista",
      name: "solucoes_lista",
      components: {
        header: AppHeader,
        default: SolucoesLista,
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
      path: "/registro",
      name: "registro",
      components: {
        header: AppHeader,
        default: Registro,
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
    },
    {
      path: "/test",
      name: "test",
      components: {
        header: AppHeader,
        default: Test,
        footer: AppFooter
      }
    },
    {
      path: "/esqueceu_senha",
      name: "esqueceu_senha",
      components: {
        header: AppHeader,
        default: EsqueceuSenha,
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
