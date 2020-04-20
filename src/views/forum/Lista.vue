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
      <h2 class="text-white mb-5">{{tipo_forum == 'todos'? 'Fóruns' : 'Meus Fóruns'}}</h2>
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
            v-if="tipo_forum == 'meus'"
            icon="ni ni-chat-round"
            class="mb-5"
            type="primary text-capitalize"
            @click="mudar_tipo_forum('todos')"
          >Ver Todos os Fóruns</base-button>
          <base-button
            v-if="tipo_forum == 'todos'"
            icon="ni ni-chat-round"
            class="mb-5"
            type="primary text-capitalize"
            @click="mudar_tipo_forum('meus')"
          >Ver Meus Fóruns</base-button>
        </div>

        <div class="col-md-4 text-right pr-0">
          <base-button
            icon="fa fa-plus"
            class="mb-5"
            type="warning text-capitalize"
            @click="$router.push('forum_cadastro')"
          >Cadastrar Novo Fórum</base-button>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="row row-grid">
            <div v-for="(forum, index) in forums" :key="forum + index" class="col-lg-4 mb-5">
              <card class="border-0" shadow body-classes="py-5">
                <h4 class="text-default">{{forum.nome}}</h4>
                <p
                  class="description mt-3"
                >{{forum.descricao.slice(0,100)}} {{forum.descricao.length > 100? '...' : ''}}</p>

                <div class="btn-wrapper">
                  <base-button
                    :text-color="tipo_forum == 'meus'? 'warning' : 'white'"
                    class="mt-4 text-capitalize"
                    :type="tipo_forum == 'meus'? 'white' : 'warning'"
                    @click="modal(index)"
                  >Mais</base-button>
                  <base-button
                    class="mt-4 text-normal"
                    type="white"
                    text-color="warning"
                    @click="copiar_link(forum.link)"
                  >Entrar no Fórum</base-button>
                  <base-button
                    v-if="tipo_forum == 'meus'"
                    class="mt-4"
                    type="primary text-capitalize"
                    @click="editar(forum)"
                  >Editar</base-button>
                  <base-button
                    v-if="tipo_forum == 'meus'"
                    class="mt-4"
                    type="warning text-capitalize"
                    @click="excluir(forum, false)"
                  >Excluir</base-button>
                </div>
              </card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
      v-if="forums[index_modal]"
      :show.sync="modal_visivel"
      gradient="warning"
      modal-classes="modal-danger modal-dialog-centered"
    >
      <h4
        v-if="forums[index_modal] && forums[index_modal].nome"
        slot="header"
        class="modal-title"
        id="modal-title-notification"
      >{{forums[index_modal].nome}}</h4>

      <div v-if="pagina_modal == 'geral'">
        <div v-if="forums[index_modal].link">
          <p>Link</p>
          <h5 class="text-white text-capitalise">{{forums[index_modal].link}}</h5>
        </div>
        <div v-if="forums[index_modal].descricao">
          <p class="mt-4">Descrição</p>
          <h5 class="text-white">{{forums[index_modal].descricao}}</h5>
        </div>
      </div>

      <div v-if="pagina_modal == 'responsavel'">
        <div>
          <div v-if="forums[index_modal].responsavel.nome">
            <p>Nome</p>
            <h5 class="text-white">{{forums[index_modal].responsavel.nome}}</h5>
          </div>

          <div
            v-if="forums[index_modal].responsavel.email || forums[index_modal].responsavel.telefone"
          >
            <p class="mt-4">Contato</p>
            <h5 class="text-white">{{forums[index_modal].responsavel.email}}</h5>
            <h5 class="text-white text-lowercase mt-4">{{forums[index_modal].responsavel.telefone}}</h5>
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
      <h6 slot="header" class="modal-title" id="modal-title-notification">{{forum_excluir.nome}}</h6>

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
          @click="excluir(forum_excluir, true)"
        >Excluir</base-button>
      </template>
    </modal>

    <modal
      :show.sync="modal_entrar_forum_visivel"
      gradient="warning"
      modal-classes="modal-warning modal-dialog-centered"
    >
      <h6 slot="header" class="modal-title" id="modal-title-notification">Entrar no Fórum</h6>

      <div class="py-3 text-center">
        <i class="ni ni-world ni-3x"></i>
        <h1 class="heading mt-4 text-capitalize">{{link_forum}}</h1>
        <p class="mt-4">O link foi copiado para sua área de transferência!</p>
        <h1
          class="heading mt-4 text-normal"
        >Cole o link dentro de uma mensagem no seu WhatsApp e clique nele para entrar no Fórum!</h1>
      </div>

      <template slot="footer">
        <base-button
          type="link text-capitalize"
          text-color="white"
          class="ml-auto"
          @click="modal_entrar_forum_visivel = false"
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
      tipo_forum: "meus",
      pessoa: {},
      http: new http(),
      forum_excluir: {},
      modal_visivel: false,
      modal_excluir_visivel: false,
      modal_entrar_forum_visivel: false,
      link_forum: "",
      index_modal: 0,
      pagina_modal: "geral",
      forums: []
    };
  },

  async mounted() {
    await this.get_login();
  },

  methods: {
    copiar_link(link) {
      this.link_forum = link;
      let el = document.createElement("textarea");
      el.value = link;
      el.style = { display: "none" };
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.modal_entrar_forum_visivel = true;
    },

    mudar_tipo_forum(tipo) {
      this.tipo_forum = tipo;
      if (tipo == "todos") this.get_forums();
      else this.get_forums_por_pessoa();
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
        this.get_forums_por_pessoa();
      }
    },

    async get_forums() {
      await this.http
        .get("forum")
        .then(resp => {
          this.forums = resp;
        })
        .catch(error => {
          console.error(error);
        });
    },

    async get_forums_por_pessoa() {
      await this.http
        .forunsPorPessoa(this.pessoa._id)
        .then(resp => {
          this.forums = resp;
        })
        .catch(error => {
          console.error(error);
        });
    },

    async editar(forum) {
      this.$router.push({
        name: "forum_cadastro",
        query: { forum: forum }
      });
    },

    async excluir(forum, confirmado) {
      if (confirmado) {
        await this.http.delete("forum", forum._id);
        this.modal_excluir_visivel = false;
        this.get_login();
      } else {
        this.forum_excluir = forum;
        this.modal_excluir_visivel = true;
      }
    }
  }
};
</script>