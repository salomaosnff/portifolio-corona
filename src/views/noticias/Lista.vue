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
      <h2 class="text-white mb-5">{{modo_administrativo? 'Notícias' : 'Minhas Notícias'}}</h2>
      <div class="row">
        <div class="col-md-3 row ml-0">
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

        <div v-if="pessoa.admin" class="col-md-9 text-right pr-0">
          <base-button
            icon="fa fa-plus"
            class="mb-5"
            type="warning text-capitalize"
            @click="$router.push('noticias_cadastro')"
          >Cadastrar Nova Notícia</base-button>

          <base-button
            v-if="pessoa.admin"
            icon="ni ni-badge"
            :class="['mb-5 text-normal', modo_administrativo? '':'desativado' ]"
            type="success"
            @click="mudar_modo_admin()"
          >{{modo_administrativo? $t('Desativar') : $t('Ativar')}} {{$t('Modo Administrativo')}}</base-button>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="row row-grid">
            <div v-for="(noticia, index) in noticias" :key="index" class="col-lg-4 mb-5">
              <card class="border-0" shadow body-classes="py-5">
                <h4 class="text-default">{{noticia.titulo}}</h4>
                <h6 class="text-default">{{noticia.subtitulo}}</h6>
                <p
                  class="description mt-3"
                >{{noticia.descricao.slice(0,100)}} {{noticia.descricao.length > 100? '...' : ''}}</p>

                <div class="btn-wrapper">
                  <base-button
                    text-color="warning"
                    class="mt-4 text-capitalize"
                    type="white"
                    @click="modal(index)"
                  >Mais</base-button>
                  <base-button
                    class="mt-4"
                    type="primary text-capitalize"
                    @click="editar(noticia)"
                  >Editar</base-button>
                  <base-button
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
      >
        {{noticias[index_modal].titulo}}
        <h5 class="modal-title text-thin mt-3">{{noticias[index_modal].subtitulo}}</h5>
      </h4>

      <div v-if="noticias[index_modal].descricao">
        <h5 class="text-white">{{noticias[index_modal].descricao}}</h5>
      </div>
    </modal>

    <modal
      :show.sync="modal_excluir_visivel"
      gradient="warning"
      modal-classes="modal-warning modal-dialog-centered"
    >
      <h6 slot="header" class="modal-title">{{noticia_excluir.titulo}}</h6>

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
      modo_administrativo: false,
      pessoa: {},
      http: new http(),
      noticia_excluir: {},
      modal_visivel: false,
      modal_excluir_visivel: false,
      link_noticia: "",
      index_modal: 0,
      noticias: []
    };
  },

  async mounted() {
    await this.get_login();
  },

  methods: {
    async mudar_modo_admin(tipo) {
      this.modo_administrativo = await !this.modo_administrativo;
      if (this.modo_administrativo) await this.get_noticias();
      else await this.get_noticia_por_pessoa();
    },

    async get_noticias() {
      await this.http
        .get("noticia")
        .then(resp => {
          this.noticias = resp;
        })
        .catch(error => {
          console.error(error);
        });
    },

    modal(i) {
      this.index_modal = i;
      this.modal_visivel = !this.modal_visivel;
    },

    async get_login() {
      let pessoa = localStorage.getItem("pessoa");
      if (pessoa) {
        pessoa = await JSON.parse(pessoa);
        this.pessoa = await pessoa;
        if (this.modo_administrativo) await this.get_noticias();
        else await this.get_noticia_por_pessoa();
      }
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

    async excluir(noticia, confirmado) {
      if (confirmado) {
        await this.http.delete("noticia", noticia._id);
        this.modal_excluir_visivel = false;
        this.get_login();
      } else {
        this.noticia_excluir = noticia;
        this.modal_excluir_visivel = true;
      }
    }
  }
};
</script>