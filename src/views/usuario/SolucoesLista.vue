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
      <h2
        class="text-white mb-5"
      >{{modo_administrativo || !pessoa.admin? $t('Soluções') : $t('Minhas Soluções')}}</h2>
      <div class="row">
        <div class="col-md-3 row ml-0">
          <base-button
            icon="fa fa-home"
            class="mb-5 text-warning text-normal"
            type="white"
            @click="$router.push('/')"
          ></base-button>
          <base-button
            icon="ni ni-bold-left"
            class="mb-5 text-warning text-normal"
            type="white"
            @click="$router.go(-1)"
          >{{$t('Voltar')}}</base-button>
        </div>

        <div class="col-md-9 text-right pr-0">
          <base-button
            icon="ni ni-bold-right"
            class="mb-5"
            type="primary text-normal"
            @click="$router.push('solucoes_lista')"
          >{{$t('Ver Todas as Ideias')}}</base-button>

          <base-button
            icon="fa fa-plus"
            class="mb-5"
            type="warning text-normal"
            @click="$router.push('solucoes_cadastro')"
          >{{$t('Cadastrar Nova Ideia')}}</base-button>

          <base-button
            v-if="pessoa.admin"
            icon="ni ni-badge"
            :class="['mb-5 text-normal', modo_administrativo? '':'desativado' ]"
            type="success"
            @click="modo_administrativo=!modo_administrativo; get_solucoes()"
          >{{modo_administrativo? $t('Desativar') : $t('Ativar')}} {{$t('Modo Administrativo')}}</base-button>

          <!-- <base-button
            class="mb-5 text-white btn-tooltip text-normal"
            style="cursor: context-menu; font-weight: bold"
            type="link"
            title="Você pode Editar e/ou Excluir uma ideia já cadastrada!"
          >Info</base-button>-->
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="row row-grid">
            <div
              v-for="(solucao, index) in solucoes"
              :key="solucao + index"
              :class="solucao.base? 'display: none' : 'col-lg-4 mb-5'"
            >
              <card v-if="!solucao.base" class="border-0" shadow body-classes="py-5">
                <h4
                  class="text-default"
                >{{$i18n.locale == 'en'? solucao.en_nome || solucao.nome : solucao.nome || solucao.en_nome}}</h4>
                <p
                  v-if="$i18n.locale == 'en'"
                  class="description mt-3"
                >{{(solucao.en_descricao || solucao.descricao).slice(0,100)}} {{(solucao.en_descricao.length || solucao.descricao.length) > 100? '...' : ''}}</p>
                <p
                  v-else
                  class="description mt-3"
                >{{(solucao.descricao || solucao.en_descricao).slice(0,100)}} {{(solucao.descricao.length || solucao.en_descricao.length) > 100? '...' : ''}}</p>

                <badge
                  v-if="solucao.area_aplicacao"
                  type="warning text-normal"
                  rounded
                >#{{$t(solucao.area_aplicacao)}}</badge>
                <badge
                  v-if="solucao.status"
                  type="warning text-normal"
                  rounded
                >#{{$t(solucao.status)}}</badge>
                <badge
                  v-if="solucao.negocio"
                  type="warning text-normal"
                  rounded
                >#{{$t(solucao.negocio)}}</badge>
                <badge v-if="solucao.tipo" type="warning text-normal" rounded>#{{$t(solucao.tipo)}}</badge>
                <badge
                  v-if="solucao.cidade && solucao.cidade.nome"
                  type="warning text-normal"
                  rounded
                >#{{solucao.cidade.nome}}</badge>

                <div class="btn-wrapper">
                  <base-button
                    text-color="warning"
                    class="mt-4"
                    type="white text-normal"
                    @click="modal(index)"
                  >{{$t('Mais')}}</base-button>
                  <base-button
                    class="mt-4"
                    type="primary text-normal"
                    @click="editar(solucao)"
                  >{{$t('Editar')}}</base-button>
                  <base-button
                    class="mt-4"
                    type="warning text-normal"
                    @click="excluir(solucao, false)"
                  >{{$t('Excluir')}}</base-button>
                </div>
              </card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
      v-if="solucoes[index_modal]"
      :show.sync="modal_visivel"
      gradient="warning"
      modal-classes="modal-danger modal-dialog-centered"
    >
      <h4
        slot="header"
        class="modal-title"
        id="modal-title-notification"
      >{{$i18n.locale == 'en'? solucoes[index_modal].en_nome || solucoes[index_modal].nome : solucoes[index_modal].nome || solucoes[index_modal].en_nome}}</h4>

      <div v-if="pagina_modal == 'geral'">
        <div v-if="solucoes[index_modal].tipo">
          <p>{{$t('Tipo')}}</p>
          <h5 class="text-white text-normal">{{$t(solucoes[index_modal].tipo)}}</h5>
        </div>

        <div v-if="solucoes[index_modal].area_aplicacao">
          <p class="mt-4">{{$t('Área de Aplicação')}}</p>
          <h5 class="text-white text-normal">{{$t(solucoes[index_modal].area_aplicacao)}}</h5>
        </div>

        <div v-if="solucoes[index_modal].instituicao">
          <p class="mt-4">{{$t('Instituição')}}</p>
          <h5 class="text-white text-normal">{{solucoes[index_modal].instituicao}}</h5>
        </div>

        <div v-if="solucoes[index_modal].status">
          <p class="mt-4">{{$t('Status')}}</p>
          <h5 class="text-white text-normal">{{$t(solucoes[index_modal].status)}}</h5>
        </div>

        <div v-if="solucoes[index_modal].link_web || solucoes[index_modal].link_youtube">
          <p class="mt-4">{{$t('Disponível em')}}</p>
          <h5 class="text-white text-lowercase">{{solucoes[index_modal].link_web}}</h5>
          <h5 class="text-white text-lowercase mt-4">{{solucoes[index_modal].link_youtube}}</h5>
        </div>

        <div v-if="solucoes[index_modal].negocio">
          <p class="mt-4">{{$t('Negócio')}}</p>
          <h5 class="text-white text-normal">{{$t(solucoes[index_modal].negocio)}}</h5>
        </div>

        <div v-if="solucoes[index_modal].cidade && solucoes[index_modal].cidade.nome">
          <p class="mt-4">{{$t('Cidade')}}</p>
          <h5 class="text-white text">{{solucoes[index_modal].cidade.nome}}</h5>
        </div>
      </div>

      <div v-if="pagina_modal == 'descricao'">
        <div>
          <h5
            class="text-white"
          >{{$i18n.locale == 'en'? solucoes[index_modal].en_descricao || solucoes[index_modal].descricao : solucoes[index_modal].descricao || solucoes[index_modal].en_descricao}}</h5>
        </div>
      </div>

      <div v-if="pagina_modal == 'responsavel' && solucoes[index_modal].responsavel">
        <div v-if="!solucoes[index_modal].responsavel._id">
          <p>{{$t('Nome')}}</p>
          <h5 class="text-white">{{solucoes[index_modal].responsavel}}</h5>
        </div>

        <div v-else>
          <div v-if="solucoes[index_modal].responsavel.nome">
            <p>{{$t('Nome')}}</p>
            <h5 class="text-white">{{solucoes[index_modal].responsavel.nome}}</h5>
          </div>

          <div
            v-if="solucoes[index_modal].responsavel.email || solucoes[index_modal].responsavel.telefone"
          >
            <p class="mt-4">{{$t('Contato')}}</p>
            <h5 class="text-white">{{solucoes[index_modal].responsavel.email}}</h5>
            <h5
              class="text-white text-lowercase mt-4"
            >{{solucoes[index_modal].responsavel.telefone | formatPhone}}</h5>
          </div>
        </div>
      </div>
      <template slot="footer">
        <base-button
          :type="pagina_modal == 'geral'? 'white' : 'link'"
          :text-color="pagina_modal == 'geral'? 'warning' : 'white'"
          class="text-normal"
          @click="pagina_modal = 'geral'"
        >{{$t('Geral')}}</base-button>

        <base-button
          :type="pagina_modal == 'descricao'? 'white' : 'link'"
          :text-color="pagina_modal == 'descricao'? 'warning' : 'white'"
          class="ml-auto text-normal"
          @click="pagina_modal = 'descricao'"
        >{{$t('Descrição')}}</base-button>

        <base-button
          v-if="solucoes[index_modal].responsavel"
          :type="pagina_modal == 'responsavel'? 'white' : 'link'"
          :text-color="pagina_modal == 'responsavel'? 'warning' : 'white'"
          class="ml-auto text-normal"
          @click="pagina_modal = 'responsavel'"
        >{{$t('Responsável')}}</base-button>
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
        id="modal-title-notification"
      >{{$i18n.locale == 'en'? solucao_excluir.en_nome || solucao_excluir.nome : solucao_excluir.nome || solucao_excluir.en_nome}}</h6>

      <div class="py-3 text-center">
        <i class="ni ni-bell-55 ni-3x"></i>
        <h1 class="heading mt-4 text-normal">Você realmente deseja excluir esse registro?</h1>
        <p>A exclusão é permantente e não poderá ser revertida!</p>
      </div>

      <template slot="footer">
        <base-button type="white text-normal" @click="modal_excluir_visivel=false">Cancelar</base-button>
        <base-button
          type="link text-normal"
          text-color="white"
          class="ml-auto"
          @click="excluir(solucao_excluir, true)"
        >Excluir</base-button>
      </template>
    </modal>

    <template v-show="busca_nao_encontrada">
      <div class="container pt-5 pb-lg">
        <div class="row justify-content-between align-items-center">
          <div v-show="area_aplicacao || status || busca" class="col-lg-5 mb-5 mb-lg-0">
            <div class="row ml-1">
              <h1 class="text-white font-weight-light">Nada aqui</h1>
              <base-button
                class="ml-5 mb-4 mt-2 text-warning text-normal"
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
          <div v-show="solucoes == [] || area_aplicacao || status || busca" class="col-lg-6">
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
      modo_administrativo: false,
      pessoa: {},
      http: new http(),
      busca: "",
      area_aplicacao: "",
      status: "",
      solucao_excluir: {},
      modal_visivel: false,
      modal_excluir_visivel: false,
      index_modal: 0,
      pagina_modal: "geral",
      solucoes: [],
      busca_nao_encontrada: false
    };
  },

  async mounted() {
    await this.get_login();
  },

  methods: {
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
        await this.get_solucoes();
      }
    },

    async get_solucoes() {
      if (this.modo_administrativo) {
        await this.http
          .get("solucao")
          .then(resp => {
            this.solucoes = resp;
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        await this.http
          .solucoesPorPessoa(this.pessoa._id)
          .then(resp => {
            this.solucoes = resp;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },

    async editar(solucao) {
      this.$router.push({
        name: "solucoes_cadastro",
        query: { solucao: solucao }
      });
    },

    async excluir(solucao, confirmado) {
      if (confirmado) {
        await this.http.delete("solucao", solucao._id);
        this.modal_excluir_visivel = false;
        this.get_login();
      } else {
        this.solucao_excluir = solucao;
        this.modal_excluir_visivel = true;
      }
    }
  }
};
</script>