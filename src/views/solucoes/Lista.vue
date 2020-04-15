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
      <div class="row">
        <div class="col-md-2">
          <base-button
            tag="a"
            icon="ni ni-bold-left"
            class="mb-5 text-warning text-capitalize"
            type="white"
            href="#/"
          >Voltar</base-button>
        </div>

        <div class="col-md-3">
          <dropdown>
            <base-button
              slot="title"
              type="warning"
              class="dropdown-toggle mb-5 text-capitalize"
            >{{area_aplicacao || "Área de Atuação"}}</base-button>
            <a
              v-for="(area, index) in areas_aplicacao"
              :key="index"
              class="dropdown-item"
              @click="area_aplicacao = area; buscar()"
            >{{area}}</a>
          </dropdown>
        </div>

        <div class="col-md-3">
          <dropdown>
            <base-button
              slot="title"
              type="warning"
              class="dropdown-toggle mb-5 text-capitalize"
            >{{status || 'Status da Ideia'}}</base-button>
            <a
              v-for="(s, index) in satuss"
              :key="index"
              class="dropdown-item"
              @click="status = s; buscar()"
            >{{s}}</a>
          </dropdown>
        </div>

        <div class="col-md-4">
          <div class="input-group input-group-alternative mb-5 bg-gradient-warning">
            <input
              @input="value => buscar()"
              v-model="busca"
              class="form-control"
              placeholder="Buscar"
              type="text"
            />
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
            <div v-for="(solucao, index) in solucoes" :key="solucao + index" class="col-lg-4 mb-5">
              <card class="border-0" shadow body-classes="py-5">
                <h4 class="text-default">{{solucao.nome}}</h4>
                <p
                  class="description mt-3"
                >{{solucao.descricao.slice(0,100)}} {{solucao.descricao.length > 100? '...' : ''}}</p>

                <badge v-if="solucao.tipo" type="warning text-capitalize" rounded>#{{solucao.tipo}}</badge>
                <badge
                  v-if="solucao.area_aplicacao"
                  type="warning text-capitalize"
                  rounded
                >#{{solucao.area_aplicacao}}</badge>
                <badge
                  v-if="solucao.status"
                  type="warning text-capitalize"
                  rounded
                >#{{solucao.status}}</badge>
                <badge
                  v-if="solucao.cidade && solucao.cidade.nome"
                  type="warning text-capitalize"
                  rounded
                >#{{solucao.cidade.nome}}</badge>

                <div class="btn-wrapper">
                  <base-button
                    class="mt-4"
                    type="warning text-capitalize"
                    @click="modal(index)"
                  >Mais</base-button>
                </div>
              </card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
      v-if="solucoes[index_modal]"
      :show.sync="modal_visible"
      gradient="warning"
      modal-classes="modal-danger modal-dialog-centered"
    >
      <h4
        v-if="solucoes[index_modal] && solucoes[index_modal].nome"
        slot="header"
        class="modal-title"
        id="modal-title-notification"
      >{{solucoes[index_modal].nome}}</h4>

      <div v-if="pagina_modal == 'geral'">
        <div v-if="solucoes[index_modal].tipo">
          <p>Tipo</p>
          <h5 class="text-white text-lowercase">{{solucoes[index_modal].tipo}}</h5>
        </div>

        <div v-if="solucoes[index_modal].area_aplicacao">
          <p class="mt-4">Área de Aplicação</p>
          <h5 class="text-white text-capitalise">{{solucoes[index_modal].area_aplicacao}}</h5>
        </div>

        <div v-if="solucoes[index_modal].instituicao">
          <p class="mt-4">Instituição</p>
          <h5 class="text-white text-capitalise">{{solucoes[index_modal].instituicao}}</h5>
        </div>

        <div v-if="solucoes[index_modal].inicio">
          <p class="mt-4">Período</p>
          <h5
            class="text-white text-capitalise"
          >De {{converter_data(solucoes[index_modal].inicio)}} a {{converter_data(solucoes[index_modal].fim) || 'Indefinido'}}</h5>
        </div>

        <div v-if="solucoes[index_modal].status">
          <p class="mt-4">Status</p>
          <h5 class="text-white text-capitalise">{{solucoes[index_modal].status}}</h5>
        </div>

        <div v-if="solucoes[index_modal].link_web || solucoes[index_modal].link_youtube">
          <p>Disponível em</p>
          <h5 class="text-white text-lowercase">{{solucoes[index_modal].link_web}}</h5>
          <h5 class="text-white text-lowercase mt-4">{{solucoes[index_modal].link_youtube}}</h5>
        </div>

        <div v-if="solucoes[index_modal].negocio">
          <p class="mt-4">Negócio</p>
          <h5 class="text-white text-capitalise">{{solucoes[index_modal].negocio}}</h5>
        </div>

        <div v-if="solucoes[index_modal].cidade">
          <p class="mt-4">Cidade</p>
          <h5 class="text-white text">{{solucoes[index_modal].cidade.nome}}</h5>
        </div>
      </div>

      <div v-if="pagina_modal == 'descricao'">
        <div v-if="solucoes[index_modal].descricao">
          <h5 class="text-white">{{solucoes[index_modal].descricao}}</h5>
        </div>
      </div>

      <div v-if="pagina_modal == 'responsavel'">
        <div v-if="solucoes[index_modal].responsavel && !solucoes[index_modal].responsavel._id">
          <p>Nome</p>
          <h5 class="text-white">{{solucoes[index_modal].responsavel}}</h5>
        </div>

        <div v-else>
          <div v-if="solucoes[index_modal].responsavel.nome">
            <p>Nome</p>
            <h5 class="text-white">{{solucoes[index_modal].responsavel.nome}}</h5>
          </div>

          <div
            v-if="solucoes[index_modal].responsavel.email || solucoes[index_modal].responsavel.telefone"
          >
            <p class="mt-4">Contato</p>
            <h5 class="text-white">{{solucoes[index_modal].responsavel.email}}</h5>
            <h5
              class="text-white text-lowercase mt-4"
            >{{solucoes[index_modal].responsavel.telefone}}</h5>
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
          :type="pagina_modal == 'descricao'? 'white' : 'link'"
          :text-color="pagina_modal == 'descricao'? 'warning' : 'white'"
          class="ml-auto text-capitalize"
          @click="pagina_modal = 'descricao'"
        >Descrição</base-button>

        <base-button
          :type="pagina_modal == 'responsavel'? 'white' : 'link'"
          :text-color="pagina_modal == 'responsavel'? 'warning' : 'white'"
          class="ml-auto text-capitalize"
          @click="pagina_modal = 'responsavel'"
        >Responsável</base-button>
      </template>
    </modal>

    <template v-show="busca_nao_encontrada">
      <div class="container pt-5 pb-lg">
        <div class="row justify-content-between align-items-center">
          <div v-show="area_aplicacao || status || busca" class="col-lg-5 mb-5 mb-lg-0">
            <div class="row ml-1">
              <h1 class="text-white font-weight-light">Nada aqui</h1>
              <base-button
                class="ml-5 mb-4 mt-2 text-warning text-capitalize"
                type="white"
                @click="limpar_filtros()"
              >Limpar filtros</base-button>
            </div>
            <div class="row ml-1" v-show="area_aplicacao">
              <p class="lead text-white">Área de Atuação:</p>
              <p class="lead text-white font-weight-bold ml-2">{{area_aplicacao}}</p>
            </div>

            <div class="row ml-1" v-show="status">
              <p class="lead text-white">Status:</p>
              <p class="lead text-white font-weight-bold ml-2">{{status}}</p>
            </div>

            <div class="row ml-1" v-show="busca">
              <p class="lead text-white">Busca:</p>
              <p class="lead text-white font-weight-bold ml-2">{{busca}}</p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="rounded overflow-hidden transform-perspective-right">
              <i class="ni ni-planet" style="font-size: 350px; color: white"></i>
            </div>
          </div>
        </div>
      </div>
    </template>
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
      http: new http(),
      busca: "",
      area_aplicacao: "",
      status: "",
      satuss: [
        "Produto Comercializado",
        "Produto Lançado",
        "Produto Testado",
        "Produto Terminado",
        "Produto em Desenvolvimento",
        "Outros"
      ],
      areas_aplicacao: [
        "Saúde",
        "Economia",
        "Educação",
        "Comunicação",
        "Social",
        "Outros"
      ],
      modal_visible: false,
      index_modal: 0,
      pagina_modal: "geral",
      solucoes: [],
      busca_nao_encontrada: false
    };
  },

  async mounted() {
    await this.get_solucoes();
  },

  methods: {
    limpar_filtros() {
      this.busca = "";
      this.area_aplicacao = "";
      this.status = "";
      this.buscar();
    },

    buscar() {
      if (this.busca || this.area_aplicacao || this.status) {
        let params = JSON.stringify({
          busca: this.busca,
          area_aplicacao: this.area_aplicacao,
          status: this.status
        });
        axios
          .get(
            // "http://localhost:3000/solucao/busca/" +
            "https://portifolio-corona-api.herokuapp.com/solucao/busca/" +
              params
          )
          .then(response => {
            this.solucoes = response.data.solucoes;
            if (!this.solucoes[0]) this.busca_nao_encontrada = true;
            else this.busca_nao_encontrada = false;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.busca_nao_encontrada = false;
        this.get_solucoes();
      }
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
      this.modal_visible = !this.modal_visible;
    },

    async get_solucoes() {
      await this.http
        .get("solucao")
        .then(resp => {
          this.solucoes = resp;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>