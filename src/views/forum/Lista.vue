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
      <h2 class="text-white mb-5">{{tipo_forum == 'todos'? 'Fóruns' : $t('Meus Fóruns')}}</h2>
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
          >{{$t("Voltar")}}</base-button>
        </div>

        <div class="col-md-8 text-right pr-0">
          <base-button
            v-if="tipo_forum == 'meus'"
            icon="ni ni-chat-round"
            class="mb-5"
            type="primary text-capitalize"
            @click="mudar_tipo_forum('todos')"
          >{{$t("forum.Lista.complemento.nav_buttons.filter_all")}}</base-button>
          <base-button
            v-if="tipo_forum == 'todos'"
            icon="ni ni-chat-round"
            class="mb-5"
            type="primary text-capitalize"
            @click="mudar_tipo_forum('meus')"
          >{{$t("forum.Lista.complemento.nav_buttons.filter_my")}}</base-button>
          <base-button
            icon="fa fa-plus"
            class="mb-5"
            type="warning text-capitalize"
            @click="$router.push('forum_cadastro')"
          >{{$t("forum.Lista.complemento.nav_buttons.registe")}}</base-button>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="row row-grid">
            <div v-for="(forum, index) in forums" :key="forum + index" class="col-lg-4 mb-5">
              <card class="border-0" shadow body-classes="py-5">
                <h4
                  class="text-default"
                >{{$i18n.locale == 'en' && forum.en_nome? forum.en_nome : forum.nome}}</h4>
                <p
                  v-if="$i18n.locale == 'en' && forum.en_descricao"
                  class="description mt-3"
                >{{forum.en_descricao.slice(0,100)}} {{forum.en_descricao.length > 100? '...' : ''}}</p>
                <p
                  v-else
                  class="description mt-3"
                >{{forum.descricao.slice(0,100)}} {{forum.descricao.length > 100? '...' : ''}}</p>

                <div class="btn-wrapper">
                  <base-button
                    :text-color="tipo_forum == 'meus'? 'warning' : 'white'"
                    class="mt-4 text-capitalize"
                    :type="tipo_forum == 'meus'? 'white' : 'warning'"
                    @click="modal(index)"
                  >{{$t("forum.Lista.forum.more")}}</base-button>
                  <base-button
                    class="mt-4 text-normal"
                    type="white"
                    text-color="warning"
                    @click="copiar_link(forum.link)"
                  >{{$t("forum.Lista.forum.join_forum")}}</base-button>
                  <base-button
                    v-if="tipo_forum == 'meus'"
                    class="mt-4"
                    type="primary text-capitalize"
                    @click="editar(forum)"
                  >{{$t("forum.Lista.forum.edit")}}</base-button>
                  <base-button
                    v-if="tipo_forum == 'meus'"
                    class="mt-4"
                    type="warning text-capitalize"
                    @click="excluir(forum, false)"
                  >{{$t("forum.Lista.forum.delete")}}</base-button>
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
      >{{$i18n.locale == 'en' && forums[index_modal].en_nome? forums[index_modal].en_nome : forums[index_modal].nome}}</h4>

      <div v-if="pagina_modal == 'geral'">
        <div v-if="forums[index_modal].link">
          <p>{{$t("forum.Lista.forum.modal_title.link")}}</p>
          <h5 class="text-white text-capitalise">{{forums[index_modal].link}}</h5>
        </div>
        <div v-if="forums[index_modal].descricao">
          <p class="mt-4">{{$t("forum.Lista.forum.modal_title.description")}}</p>
          <h5
            class="text-white"
          >{{$i18n.locale == 'en' && forums[index_modal].en_descricao? forums[index_modal].en_descricao : forums[index_modal].descricao}}</h5>
        </div>
      </div>

      <div v-if="pagina_modal == 'responsavel'">
        <div>
          <div v-if="forums[index_modal].responsavel.nome">
            <p>{{$t("forum.Lista.forum.modal_title.name")}}</p>
            <h5 class="text-white">{{forums[index_modal].responsavel.nome}}</h5>
          </div>

          <div
            v-if="forums[index_modal].responsavel.email || forums[index_modal].responsavel.telefone"
          >
            <p class="mt-4">{{$t("forum.Lista.forum.modal_title.contact")}}</p>
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
        >{{$t("forum.Lista.forum.modal_title.general")}}</base-button>

        <base-button
          :type="pagina_modal == 'responsavel'? 'white' : 'link'"
          :text-color="pagina_modal == 'responsavel'? 'warning' : 'white'"
          class="ml-auto text-capitalize"
          @click="pagina_modal = 'responsavel'"
        >{{$t("forum.Lista.forum.modal_title.responsable")}}</base-button>
      </template>
    </modal>

    <modal
      :show.sync="modal_excluir_visivel"
      gradient="warning"
      modal-classes="modal-warning modal-dialog-centered"
    >
      <h6
        slot="header"
        class="modal-title"
      >{{$i18n.locale == 'en' && forum_excluir.en_nome? forum_excluir.en_nome : forum_excluir.nome}}</h6>

      <div class="py-3 text-center">
        <i class="ni ni-bell-55 ni-3x"></i>
        <h1 class="heading mt-4 text-capitalize">{{$t("forum.Lista.forum.modal_warning.heading")}}</h1>
        <p>{{$t("forum.Lista.forum.modal_warning.warning")}}</p>
      </div>

      <template slot="footer">
        <base-button
          type="white text-capitalize"
          @click="modal_excluir_visivel=false"
        >{{$t("forum.Lista.forum.modal_warning.cancel")}}</base-button>
        <base-button
          type="link text-capitalize"
          text-color="white"
          class="ml-auto"
          @click="excluir(forum_excluir, true)"
        >{{$t("forum.Lista.forum.modal_warning.delete")}}</base-button>
      </template>
    </modal>

    <modal
      :show.sync="modal_entrar_forum_visivel"
      gradient="warning"
      modal-classes="modal-warning modal-dialog-centered"
    >
      <h6 slot="header" class="modal-title">{{$t("forum.Lista.forum.modal_join.title")}}</h6>

      <div class="py-3 text-center">
        <p class="mt-4 text-italic">{{link_forum}}</p>
        <p class="mt-4">{{$t("forum.Lista.forum.modal_join.link")}}</p>
        <base-button
          outline
          size="sm"
          class="mt-2 text-normal text-italic"
          type="white"
          icon="ni ni-ungroup"
        >{{$t("forum.Lista.forum.modal_join.copie_link")}}</base-button>
        <p class="mt-4">. . .</p>
        <h1 class="mt-4 heading text-normal">{{$t("forum.Lista.forum.modal_join.send_link_1")}}</h1>
        <h1 class="mt-4 heading text-normal">{{$t("forum.Lista.forum.modal_join.send_link_2")}}</h1>
        <p class="mt-4">. . .</p>
        <p class="mt-4">{{$t("forum.Lista.forum.modal_join.send_link_3")}}</p>
        <base-button
          href="https://web.whatsapp.com/"
          outline
          size="sm"
          class="mt-2 text-normal text-italic"
          type="white"
          tag="a"
          target="_blank"
        >{{$t("forum.Lista.forum.modal_join.open_whatsapp")}}</base-button>
      </div>

      <template slot="footer">
        <base-button
          type="link text-capitalize"
          text-color="white"
          class="ml-auto"
          @click="modal_entrar_forum_visivel = false"
        >{{$t("forum.Lista.forum.modal_join.I_understood")}}</base-button>
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