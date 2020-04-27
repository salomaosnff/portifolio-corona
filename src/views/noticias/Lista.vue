<template>
  <section class="section-shaped my-0">
    <div class="shape shape-style-1 bg-gradient-warning">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <h2 class="text-white mb-5">{{tipo_noticia == 'todos'? 'Notícias' : 'Minhas Notícias'}}</h2>
      <div class="row">
        <div class="col-md-4 row ml-0">
          <base-button
            icon="fa fa-home"
            class="mb-5 text-warning text-capitalize"
            type="white"
            @click="$router.push('/')"
          ></base-button>
          <base-button
            icon="ni ni-bold-left"
            class="mb-5 text-warning text-capitalize"
            type="white"
            @click="$router.go(-1)"
          >Voltar</base-button>
        </div>

        <div class="col-md-4 text-right pr-0">
          <base-button
            v-if="tipo_noticia == 'meus'"
            icon="ni ni-chat-round"
            class="mb-5"
            type="primary text-capitalize"
            @click="mudar_tipo_noticia('todos')"
          >Ver Todas as Notícias</base-button>
          <base-button
            v-if="tipo_noticia == 'todos'"
            icon="ni ni-chat-round"
            class="mb-5"
            type="primary text-capitalize"
            @click="mudar_tipo_noticia('meus')"
          >Ver Meus Fóruns</base-button>
        </div>

        <div class="col-md-4 text-right pr-0">
          <base-button
            icon="fa fa-plus"
            class="mb-5"
            type="warning text-capitalize"
            @click="$router.push('noticias_cadastro')"
          >Cadastrar Nova Notícia</base-button>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="row row-grid">
            <div v-for="(noticias, index) in noticias" :key="noticias + index" class="col-lg-4 mb-5">
              <card class="border-0" shadow body-classes="py-5">
                <h4 class="text-default">{{noticias.titulo}}</h4>
                <p
                  class="description mt-3"
                >{{noticias.descricao.slice(0,100)}} {{noticias.descricao.length > 100? '...' : ''}}</p>

                <div class="btn-wrapper">
                  <base-button
                    :text-color="tipo_noticia == 'meus'? 'warning' : 'white'"
                    class="mt-4 text-capitalize"
                    :type="tipo_noticia == 'meus'? 'white' : 'warning'"
                    @click="modal(index)"
                  >Mais</base-button>
                  <base-button
                    class="mt-4 text-normal"
                    type="white"
                    text-color="warning"
                    @click="copiar_link(noticia.link)"
                  >Entrar em Notícias</base-button>
                  <base-button
                    v-if="tipo_noticia == 'meus'"
                    class="mt-4"
                    type="primary text-capitalize"
                    @click="editar(noticias)"
                  >Editar</base-button>
                  <base-button
                    v-if="tipo_noticia == 'meus'"
                    class="mt-4"
                    type="warning text-capitalize"
                    @click="excluir(noticia, false)"
                  >Excluir</base-button>
                </div>
              </card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
      v-if="noticias[index_modal]"
      :show.sync="modal_visivel"
      gradient="warning"
      modal-classes="modal-danger modal-dialog-centered"
    >
      <h4
        v-if="noticias[index_modal] && noticias[index_modal].titulo"
        slot="header"
        class="modal-title"
      >{{noticias[index_modal].titulo}}</h4>

      <div v-if="pagina_modal == 'geral'">
        <div v-if="noticias[index_modal].link">
          <p>Link</p>
          <h5 class="text-white text-capitalise">{{noticias[index_modal].link}}</h5>
        </div>
        <div v-if="noticias[index_modal].descricao">
          <p class="mt-4">Descrição</p>
          <h5 class="text-white">{{noticias[index_modal].descricao}}</h5>
        </div>
      </div>

      <div v-if="pagina_modal == 'responsavel'">
        <div>
          <div v-if="noticias[index_modal].responsavel.titulo">
            <p>Título</p>
            <h5 class="text-white">{{noticias[index_modal].responsavel.titulo}}</h5>
          </div>

          <div
            v-if="noticias[index_modal].responsavel.email || noticias[index_modal].responsavel.telefone"
          >
            <p class="mt-4">Contato</p>
            <h5 class="text-white">{{noticias[index_modal].responsavel.email}}</h5>
            <h5 class="text-white text-lowercase mt-4">{{noticias[index_modal].responsavel.telefone}}</h5>
          </div>
        </div>
      </div>
      <template slot="footer">
        <base-button
          :type="pagina_modal == 'geral'? 'white' : 'link'"
          :text-color="pagina_modal == 'geral'? 'warning' : 'white'"
          class="text-capitalize"
          @click="pagina_modal = 'geral'"
        >Geral</base-button>

        <base-button
          :type="pagina_modal == 'responsavel'? 'white' : 'link'"
          :text-color="pagina_modal == 'responsavel'? 'warning' : 'white'"
          class="ml-auto text-capitalize"
          @click="pagina_modal = 'responsavel'"
        >Responsável</base-button>
      </template>
    </modal>

    <modal
      :show.sync="modal_excluir_visivel"
      gradient="warning"
      modal-classes="modal-warning modal-dialog-centered"
    >
      <h6 slot="header" class="modal-title">{{noticias_excluir.nome}}</h6>

      <div class="py-3 text-center">
        <i class="ni ni-bell-55 ni-3x"></i>
        <h1 class="heading mt-4 text-capitalize">Você realmente deseja excluir esse registro?</h1>
        <p>A exclusão é permantente e não poderá ser revertida!</p>
      </div>

      <template slot="footer">
        <base-button type="white text-capitalize" @click="modal_excluir_visivel=false">Cancelar</base-button>
        <base-button
          type="link text-capitalize"
          text-color="white"
          class="ml-auto"
          @click="excluir(noticia_excluir, true)"
        >Excluir</base-button>
      </template>
    </modal>

    <modal
      :show.sync="modal_entrar_noticia_visivel"
      gradient="warning"
      modal-classes="modal-warning modal-dialog-centered"
    >
      <h6 slot="header" class="modal-title">Como Entrar em Notícias?</h6>

      <div class="py-3 text-center">
        <p class="mt-4 text-italic">{{link_noticia}}</p>
        <p class="mt-4">O link já foi copiado para sua área de transferência!</p>
        <base-button
          outline
          size="sm"
          class="mt-2 text-normal text-italic"
          type="white"
          icon="ni ni-ungroup"
        >Copiar link novamente</base-button>
        <p class="mt-4">. . .</p>
        <h1 class="mt-4 heading text-normal">1. Envie o link para um de seus contatos no WhatsApp.</h1>
        <h1 class="mt-4 heading text-normal">2. Clique em "Ver grupo" para entrar em Notícias.</h1>
        <p class="mt-4">. . .</p>
        <p class="mt-4">Use Ctrl + V para colar o link no WhatsApp!</p>
        <base-button
          href="https://web.whatsapp.com/"
          outline
          size="sm"
          class="mt-2 text-normal text-italic"
          type="white"
          tag="a"
          target="_blank"
        >Abrir WhatsApp Web</base-button>
      </div>

      <template slot="footer">
        <base-button
          type="link text-capitalize"
          text-color="white"
          class="ml-auto"
          @click="modal_entrar_noticia_visivel = false"
        >Entendi</base-button>
      </template>
    </modal>
  </section>
</template>

<script>
import Modal from "@/components/Modal.vue";
import http from "../../services/http";
import Dropdown from "../../components/BaseDropdown.vue";
import axios from "axios";

export default {
  components: {
    Modal,
    Dropdown
  },
  data() {
    return {
      tipo_noticia: "meus",
      pessoa: {},
      http: new http(),
      noticias_excluir: {},
      modal_visivel: false,
      modal_excluir_visivel: false,
      modal_entrar_noticia_visivel: false,
      link_noticia: "",
      index_modal: 0,
      pagina_modal: "geral",
      noticias: []
    };
  },

  async mounted() {
    await this.get_login();
  },

  methods: {
    copiar_link(link) {
      this.link_noticia = link;
      let el = document.createElement("textarea");
      el.value = link;
      el.style = { display: "none" };
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.modal_entrar_noticia_visivel = true;
    },

    mudar_tipo_noticia(tipo) {
      this.tipo_noticia = tipo;
      if (tipo == "todos") this.get_noticias();
      else this.get_noticia_por_pessoa();
    },

    async get_noticias() {
      await this.http
        .get("noticias")
        .then(resp => {
          this.noticias = resp;
        })
        .catch(error => {
          console.error(error);
        });
    },

    converter_data(data) {
      if (data)
        data =
          data.substring(8, 10) +
          "/" +
          data.substring(5, 7) +
          "/" +
          data.substring(0, 4);
      return data;
    },

    modal(i) {
      this.index_modal = i;
      this.pagina_modal = "geral";
      this.modal_visivel = !this.modal_visivel;
    },

    async get_login() {
      let pessoa = localStorage.getItem("pessoa");
      if (pessoa) {
        pessoa = await JSON.parse(pessoa);
        this.pessoa = await pessoa;
        this.get_noticia_por_pessoa();
      }
    },

    async get_noticia() {
      await this.http
        .get("noticias")
        .then(resp => {
          this.noticias = resp;
        })
        .catch(error => {
          console.error(error);
        });
    },

    async get_noticia_por_pessoa() {
      await this.http
        .noticiasPorPessoa(this.pessoa._id)
        .then(resp => {
          this.noticias = resp;
        })
        .catch(error => {
          console.error(error);
        });
    },

    async editar(noticias) {
      this.$router.push({
        name: "noticias_cadastro",
        query: { noticias: noticias }
      });
    },

    async excluir(noticias, confirmado) {
      if (confirmado) {
        await this.http.delete("noticias", noticias._id);
        this.modal_excluir_visivel = false;
        this.get_login();
      } else {
        this.noticia_excluir = noticias;
        this.modal_excluir_visivel = true;
      }
    }
  }
};
</script>