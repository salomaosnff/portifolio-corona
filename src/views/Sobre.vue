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
      <h2 class="text-white mb-5">{{$t('Sobre o')}} REVIVE</h2>
      <div class="row">
        <div class="col-md-4 row ml-0">
          <base-button
            icon="ni ni-bold-left"
            class="mb-5 text-warning text-capitalize"
            type="white"
            @click="$router.go(-1)"
          >{{$t("Voltar")}}</base-button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="row row-grid">
            <div class="col-lg-4 mb-5">
              <card class="border-0 text-center" shadow body-classes="py-5">
                <div style="height: 126px" class="mb-3">
                  <icon
                    class="mb-3"
                    name="fa fa-file"
                    gradient="warning"
                    color="white"
                    shadow
                    rounded
                  ></icon>
                  <h4 class="text-default">Memorando de Entendimento</h4>
                </div>
                <base-button
                  class="mt-4 btn-block btn-block"
                  href="./memorando.pdf"
                  type="warning text-normal"
                  style="font-size: 16px"
                  tag="a"
                  target="_blank"
                >{{$t('Acessar')}}</base-button>
              </card>
            </div>

            <div class="col-lg-4 mb-5">
              <card class="border-0 text-center" shadow body-classes="py-5">
                <div style="height: 126px" class="mb-3">
                  <icon
                    class="mb-3"
                    name="fa fa-file"
                    gradient="warning"
                    color="white"
                    shadow
                    rounded
                  ></icon>
                  <h4 class="text-default">Memorando (Anexo 1)</h4>
                </div>
                <base-button
                  class="mt-4 btn-block btn-block"
                  href="./memorando_anexo_1.pdf"
                  type="warning text-normal"
                  style="font-size: 16px"
                  tag="a"
                  target="_blank"
                >{{$t('Acessar')}}</base-button>
              </card>
            </div>

            <div class="col-lg-4 mb-5">
              <card class="border-0 text-center" shadow body-classes="py-5">
                <div style="height: 126px" class="mb-3">
                  <icon
                    class="mb-3"
                    name="fa fa-file"
                    gradient="warning"
                    color="white"
                    shadow
                    rounded
                  ></icon>
                  <h4 class="text-default">Memorando (Anexo 2)</h4>
                </div>
                <base-button
                  class="mt-4 btn-block btn-block"
                  href="./memorando_anexo_2.pdf"
                  type="warning text-normal"
                  style="font-size: 16px"
                  tag="a"
                  target="_blank"
                >{{$t('Acessar')}}</base-button>
              </card>
            </div>

            <div class="col-lg-4 mb-5">
              <card class="border-0 text-center" shadow body-classes="py-5">
                <div style="height: 126px" class="mb-3">
                  <icon
                    class="mb-3"
                    name="fa fa-file"
                    gradient="warning"
                    color="white"
                    shadow
                    rounded
                  ></icon>
                  <h4 class="text-default">Créditos</h4>
                </div>
                <base-button
                  class="mt-4 btn-block btn-block"
                  href="./creditos.pdf"
                  type="warning text-normal"
                  style="font-size: 16px"
                  tag="a"
                  target="_blank"
                >{{$t('Acessar')}}</base-button>
              </card>
            </div>

            <div class="col-lg-4 mb-5">
              <card class="border-0 text-center" shadow body-classes="py-5">
                <div style="height: 126px" class="mb-3">
                  <icon
                    class="mb-3"
                    name="fa fa-file"
                    gradient="warning"
                    color="white"
                    shadow
                    rounded
                  ></icon>
                  <h4 class="text-default">Hackathon</h4>
                </div>
                <base-button
                  class="mt-4 btn-block btn-block"
                  href="./hackathon.pdf"
                  type="warning text-normal"
                  style="font-size: 16px"
                  tag="a"
                  target="_blank"
                >{{$t('Acessar')}}</base-button>
              </card>
            </div>

            <div class="col-lg-4 mb-5">
              <card class="border-0 text-center" shadow body-classes="py-5">
                <div style="height: 126px" class="mb-3">
                  <icon
                    class="mb-3"
                    name="fa fa-file"
                    gradient="warning"
                    color="white"
                    shadow
                    rounded
                  ></icon>
                  <h4 class="text-default">FAQ</h4>
                </div>
                <base-button
                  class="mt-4 btn-block btn-block"
                  href="./hackathon.pdf"
                  type="warning text-normal"
                  style="font-size: 16px"
                  tag="a"
                  target="_blank"
                >{{$t('Acessar')}}</base-button>
              </card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Modal from "@/components/Modal.vue";
import http from "../services/http";
import Dropdown from "../components/BaseDropdown.vue";
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