<template>
  <section class="section section-shaped section-lg my-0">
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
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-4 text-warning font-weight-bold">Cadastre sua Ideia</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Nome" v-model="solucao.nome"></base-input>

                <div>
                  <p class="d-block mb-2">Data de Início</p>
                  <base-input addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker
                      slot-scope="{focus, blur}"
                      @on-open="focus"
                      @on-close="blur"
                      :config="{allowInput: true, dateFormat: 'd/m/Y'}"
                      class="form-control datepicker"
                      v-model="inicio"
                    ></flat-picker>
                  </base-input>
                </div>

                <div>
                  <p class="d-block mb-2">Data de Término</p>
                  <base-input addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker
                      slot-scope="{focus, blur}"
                      @on-open="focus"
                      @on-close="blur"
                      :config="{allowInput: true, dateFormat: 'd/m/Y'}"
                      class="form-control datepicker"
                      v-model="fim"
                    ></flat-picker>
                  </base-input>
                </div>

                <base-input
                  class="mb-3"
                  placeholder="Instituição ou Empresa"
                  v-model="solucao.instituicao"
                ></base-input>

                <base-input class="mb-3" placeholder="Link do Site" v-model="solucao.link_web"></base-input>

                <base-input
                  class="mb-3"
                  placeholder="Link do YouTube"
                  v-model="solucao.link_youtube"
                ></base-input>

                <textarea
                  class="form-control mb-3"
                  placeholder="Descrição"
                  v-model="solucao.descricao"
                ></textarea>

                <h6 class="mb-3 text-warning font-weight-bold">Área de Aplicação</h6>
                <base-radio name="Saúde" class="mb-3" v-model="solucao.area_aplicacao">Saúde</base-radio>
                <base-radio name="Economia" class="mb-3" v-model="solucao.area_aplicacao">Economia</base-radio>
                <base-radio name="Educação" class="mb-3" v-model="solucao.area_aplicacao">Educação</base-radio>
                <base-radio
                  name="Comunicação"
                  class="mb-3"
                  v-model="solucao.area_aplicacao"
                >Comunicação</base-radio>
                <base-radio name="Social" class="mb-3" v-model="solucao.area_aplicacao">Social</base-radio>
                <base-radio name="Outros" class="mb-3" v-model="solucao.area_aplicacao">Outros</base-radio>

                <h6 class="mb-3 text-warning font-weight-bold">Tipo</h6>
                <base-radio name="Software" class="mb-3" v-model="solucao.tipo">Software</base-radio>
                <base-radio name="Hardware" class="mb-3" v-model="solucao.tipo">Hardware</base-radio>
                <base-radio name="Processo" class="mb-3" v-model="solucao.tipo">Processo</base-radio>
                <base-radio name="Material" class="mb-3" v-model="solucao.tipo">Material</base-radio>
                <base-radio name="Outros" class="mb-3" v-model="solucao.tipo">Outros</base-radio>

                <h6 class="mb-3 text-warning font-weight-bold">Status</h6>
                <base-radio
                  name="Produto Comercializado"
                  class="mb-3"
                  v-model="solucao.area_aplicacao"
                >Produto Comercializado</base-radio>
                <base-radio
                  name="Produto Lançado"
                  class="mb-3"
                  v-model="solucao.area_aplicacao"
                >Produto Lançado</base-radio>
                <base-radio
                  name="Produto Testado"
                  class="mb-3"
                  v-model="solucao.area_aplicacao"
                >Produto Testado</base-radio>
                <base-radio
                  name="Produto Terminado"
                  class="mb-3"
                  v-model="solucao.area_aplicacao"
                >Produto Terminado</base-radio>
                <base-radio
                  name="Produto em Desenvolvimento"
                  class="mb-3"
                  v-model="solucao.area_aplicacao"
                >Produto em Desenvolvimento</base-radio>
                <base-radio name="Outros" class="mb-3" v-model="solucao.area_aplicacao">Outros</base-radio>

                <h6 class="mb-3 text-warning font-weight-bold">Tipo de Negócio</h6>
                <base-radio
                  name="Disponível Gratuitamente"
                  class="mb-3"
                  v-model="solucao.negocio"
                >Disponível Gratuitamente</base-radio>
                <base-radio
                  name="Disponível com Restrições"
                  class="mb-3"
                  v-model="solucao.negocio"
                >Disponível com Restrições</base-radio>
                <base-radio name="À Venda" class="mb-3" v-model="solucao.negocio">À Venda</base-radio>
                <base-radio
                  name="À Procura de Financiamento Público"
                  class="mb-3"
                  v-model="solucao.negocio"
                >À Procura de Financiamento Público</base-radio>
                <base-radio
                  name="À Procura de Financiamento Privado"
                  class="mb-3"
                  v-model="solucao.negocio"
                >À Procura de Financiamento Privado</base-radio>
                <base-radio name="Outros" class="mb-3" v-model="solucao.negocio">Outros</base-radio>

                <div class="text-center">
                  <base-button type="warning" class="mt-4" @click="salvar()">Salvar</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import http from "../../services/http";
export default {
  components: {
    flatPicker
  },
  data() {
    return {
      http: new http(),
      inicio: "",
      fim: "",
      solucao: {
        // endereco // -> Deve ser uma entidade, ou seja, você tem que massar o ID de ENDERECO para essa variável
        // palavra_chave // Em desenvolvimento na API ainda
        // responsavel // -> Deve ser uma entidade, ou seja, você tem que massar o ID de PESSOA para essa variável
        inicio: "",
        fim: "",
        nome: "",
        instituicao: "",
        link_web: "",
        link_youtube: "",
        descricao: "",
        area_aplicacao: "",
        tipo: "",
        status: "",
        negocio: "",
        observacoes: ""
      },
      link_home: "#/"
    };
  },

  methods: {
    converter_data(data) {
      data =
        data.substring(6, 10) +
        "-" +
        data.substring(3, 5) +
        "-" +
        data.substring(0, 2);
      return data;
    },

    async salvar() {
      this.solucao.inicio = Date.parse(this.converter_data(this.inicio));
      this.solucao.fim = Date.parse(this.converter_data(this.fim));
      this.http.post("solucao", this.solucao).then(resp => {
        console.log(resp);
      });
    }
  }
};
</script>
