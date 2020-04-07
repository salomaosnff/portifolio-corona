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

          <div>
            <p class="mt-4">Descrição</p>
            <h5 class="text-white text-capitalise">{{solucoes[index_modal].descricao}}</h5>
          </div>

          <div>
            <p class="mt-4">Status</p>
            <h5 class="text-white text-capitalise">{{solucoes[index_modal].status}}</h5>
          </div>

          <div>
            <p class="mt-4">Área de Aplicação</p>
            <h5 class="text-white text-capitalise">{{solucoes[index_modal].area_aplicacao}}</h5>
          </div>

          <div>
            <p class="mt-4">Negócio</p>
            <h5 class="text-white text-capitalise">{{solucoes[index_modal].negocio}}</h5>
          </div>
        </div>

        <div v-if="index_modal_info == 1">
          <div v-if="solucoes[index_modal].link_web || solucoes[index_modal].link_youtube">
            <p class="mt-4">Disponível em</p>
            <h5 class="text-white text-lowercase">{{solucoes[index_modal].link_web}}</h5>
            <h5 class="text-white text-lowercase">{{solucoes[index_modal].link_youtube}}</h5>
          </div>

          <div>
            <p class="mt-4">Endereço</p>
            <h5
              class="text-white text-lowercase"
            >{{solucoes[index_modal].endereco.pais}}, {{solucoes[index_modal].endereco.estado}}, {{solucoes[index_modal].endereco.cidade}}</h5>
            <h5
              class="text-white text-lowercase"
            >{{solucoes[index_modal].endereco.cep}}, {{solucoes[index_modal].endereco.bairro}}, {{solucoes[index_modal].endereco.logradouro}}, {{solucoes[index_modal].endereco.numero}},</h5>
          </div>
        </div>

        <div v-if="index_modal_info == 2">
          <div>
            <p class="mt-4">Nome</p>
            <h5 class="text-white text-lowercase">{{solucoes[index_modal].responsavel.nome}}</h5>
          </div>

          <div>
            <p class="mt-4">Contato</p>
            <h5 class="text-white text-lowercase">{{solucoes[index_modal].responsavel.email}}</h5>
            <h5 class="text-white text-lowercase">{{solucoes[index_modal].responsavel.telefone}}</h5>
          </div>
        </div>
        <template slot="footer">
          <base-button
            :type="index_modal_info == 0? 'white' : 'link'"
            :text-color="index_modal_info == 0? 'warning' : 'white'"
            class="text-capitalize"
            @click="index_modal_info = 0"
          >Geral</base-button>

          <base-button
            :type="index_modal_info == 1? 'white' : 'link'"
            :text-color="index_modal_info == 1? 'warning' : 'white'"
            class="ml-auto text-capitalize"
            @click="index_modal_info = 1"
          >Endereço</base-button>

          <base-button
            :type="index_modal_info == 2? 'white' : 'link'"
            :text-color="index_modal_info == 2? 'warning' : 'white'"
            class="ml-auto text-capitalize"
            @click="index_modal_info = 2"
          >Responsável</base-button>
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
    };
  },

  async mounted() {
    await this.get_solucoes();
  },

  methods: {
    modal(i) {
      this.index_modal = i;
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