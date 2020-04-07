<template>
  <div>
    <div class="position-relative">
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
        <div class="container">
          <div class="row">
            <div class="col-md-6" style="padding-left: 0">
              <base-button
                tag="a"
                icon="ni ni-bold-left"
                class="mb-5 text-warning text-capitalize"
                type="white"
                href="#/"
              >Voltar</base-button>
            </div>

            <div class="col-md-6" style="padding-right: 0 !important">
              <div class="input-group input-group-alternative mb-5 bg-gradient-warning">
                <input class="form-control" placeholder="Buscar" type="text" />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="ni ni-zoom-split-in"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-lg-12">
              <div class="row row-grid">
                <div
                  v-for="(solucao, index) in solucoes"
                  :key="solucao + index"
                  class="col-lg-4 mb-5"
                >
                  <card class="border-0" shadow body-classes="py-5">
                    <h4 class="text-default">{{solucao.nome}}</h4>
                    <p class="description mt-3">{{solucao.descricao}}</p>
                    <div>
                      <badge type="warning text-lowercase" rounded>#{{solucao.tipo}}</badge>
                    </div>
                    <div class="btn-wrapper">
                      <base-button
                        class="mt-4"
                        type="warning text-capitalize"
                        @click="modal(index)"
                      >Mais</base-button>
                      <base-button
                        tag="a"
                        icon="fa fa-usd"
                        class="ml-auto mt-4 text-warning text-capitalize"
                        type="secondary"
                        href="#/"
                      >Doar</base-button>
                    </div>
                  </card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <modal
        :show.sync="modal_visible"
        gradient="warning"
        modal-classes="modal-danger modal-dialog-centered"
      >
        <h4
          slot="header"
          class="modal-title"
          id="modal-title-notification"
        >{{solucoes[index_modal].nome}}</h4>

        <div v-if="index_modal_info == 0">
          <div>
            <p>Palavra-chave</p>
            <h5 class="text-white text-lowercase">#{{solucoes[index_modal].tipo}}</h5>
          </div>

          <div>
            <p class="mt-4">Instituição</p>
            <h5 class="text-white text-capitalise">{{solucoes[index_modal].instituicao}}</h5>
          </div>

          <div>
            <p class="mt-4">Período</p>
            <h5
              class="text-white text-capitalise"
            >De {{solucoes[index_modal].inicio}} a {{solucoes[index_modal].fim}}</h5>
          </div>
        </div>

        <div v-if="index_modal_info == 1">
          <h1 class="heading text-capitalize">De quê se trata?</h1>
          <p class="mt-4">{{solucoes[index_modal].descricao}}</p>

          <h1 class="mt-4 heading text-capitalize">Como usar / adquirir?</h1>
          <p class="mt-4">{{solucoes[index_modal].descricao}}</p>

          <h1 class="mt-4 heading text-capitalize">Contactar proprietário</h1>
          <p class="mt-4">Email: funlano@domain.com</p>
          <p>Número: (88) 99861-2581</p>
        </div>

        <div v-if="index_modal_info == 2">
          <h1 class="heading text-capitalize">De quê se trata?</h1>
          <p class="mt-4">{{solucoes[index_modal].descricao}}</p>

          <h1 class="mt-4 heading text-capitalize">Como usar / adquirir?</h1>
          <p class="mt-4">{{solucoes[index_modal].descricao}}</p>

          <h1 class="mt-4 heading text-capitalize">Contactar proprietário</h1>
          <p class="mt-4">Email: funlano@domain.com</p>
          <p>Número: (88) 99861-2581</p>
        </div>
        <template slot="footer">
          <base-button
            type="white"
            text-color="warning"
            class="text-capitalize"
            @click="index_modal_info = 0"
          >1. Geral</base-button>
          <base-button
            type="white"
            text-color="warning"
            class="ml-auto text-capitalize"
            @click="index_modal_info = 1"
          >2. Endereço</base-button>
          <base-button
            type="white"
            text-color="warning"
            class="ml-auto text-capitalize"
            @click="index_modal_info = 2"
          >3. Responsável</base-button>
        </template>
      </modal>
    </div>
  </div>
</template>


<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";

export default {
  components: {
    Modal
  },
  data() {
    return {
      modal_visible: false,
      index_modal: 0,
      index_modal_info: 0,
      solucoes: []
      //   cores: ["default", "primary", "info", "success", "warning", "danger"]
    };
  },

  async mounted() {
    await this.get_solucoes();
  },

  methods: {
    modal(i) {
      this.index_modal_info = 0;
      this.modal_visible = !this.modal_visible;
    },

    async get_solucoes() {
      await axios
        .get("https://portifolio-corona-api.herokuapp.com/solucao")
        .then(response => {
          console.log(response.data);
          this.solucoes = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>