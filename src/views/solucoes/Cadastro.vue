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
          >{{$t('Voltar')}}</base-button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-5 pb-5">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-4 text-warning font-weight-bold">{{$t('Cadastre sua Ideia')}}</h4>
            <template>
              <form role="form">
                <base-alert type="danger" v-show="error">
                  <strong>{{$t('Dados inválidos')}}</strong>
                  {{$t('Verifique os campos destacados!')}}
                </base-alert>

                <base-input
                  v-if="$i18n.locale == 'pt_BR'"
                  class="mb-3"
                  :placeholder="$t('Nome da Ideia')"
                  v-model="$v.br.solucao.nome.$model"
                  :valid="valido.nome"
                ></base-input>
                <base-input
                  v-else
                  class="mb-3"
                  :placeholder="$t('Nome da Ideia')"
                  v-model="$v.en.solucao.nome.$model"
                  :valid="valido.nome"
                ></base-input>
                <p
                  class="text-right text-italic small"
                >{{$i18n.locale == 'pt_BR'? solucao.en_nome : solucao.nome}}</p>

                <base-input
                  v-if="$i18n.locale == 'pt_BR'"
                  class="mb-3"
                  :placeholder="$t('Instituição ou Empresa')"
                  v-model="$v.br.solucao.instituicao.$model"
                  :valid="valido.instituicao"
                ></base-input>
                <base-input
                  v-else
                  class="mb-3"
                  :placeholder="$t('Instituição ou Empresa')"
                  v-model="$v.en.solucao.instituicao.$model"
                  :valid="valido.instituicao"
                ></base-input>

                <base-input
                  class="mb-3"
                  :placeholder="$t('Link do Site')"
                  v-model="solucao.link_web"
                ></base-input>

                <base-input
                  class="mb-3"
                  :placeholder="$t('Link do YouTube')"
                  v-model="solucao.link_youtube"
                ></base-input>

                <div
                  v-if="$i18n.locale == 'pt_BR'"
                  class="button-group mb-3 p-1 card"
                  :class="valido.cidade"
                >
                  <dropdown>
                    <base-button
                      name="b-state"
                      slot="title"
                      type="warning"
                      class="dropdown-toggle text-capitalize m-1"
                    >
                      <strong>{{br.local.estado.nome || $t('Selecione seu Estado')}}</strong>
                    </base-button>
                    <a
                      v-for="(item, index) in br.local.estados"
                      :key="index"
                      class="dropdown-item"
                      @click="$v.br.local.estado.$model = item; buscar_cidades(true);"
                    >{{item.nome}}</a>
                  </dropdown>
                  <div class="mb3" v-show="br.local.cidade && br.local.cidade._id">
                    <dropdown>
                      <base-button
                        slot="title"
                        type="warning"
                        class="dropdown-toggle text-capitalize m-1"
                      >
                        <strong>{{br.local.cidade.nome || $t('Selecione sua Cidade')}}</strong>
                      </base-button>
                      <a
                        v-for="(item, index) in br.local.cidades"
                        :key="index"
                        class="dropdown-item"
                        @click="$v.br.local.cidade.$model = item"
                      >{{item.nome}}</a>
                    </dropdown>
                  </div>
                </div>

                <div v-else class="button-group mb-3 p-1 card" :class="valido.pais">
                  <dropdown>
                    <base-button
                      name="b-state"
                      slot="title"
                      type="warning"
                      class="dropdown-toggle text-capitalize m-1"
                    >
                      <strong>{{en.local.pais || $t('Select your Country')}}</strong>
                    </base-button>
                    <a
                      v-for="(item, index) in en.local.paises"
                      :key="index"
                      class="dropdown-item"
                      @click="$v.en.local.pais.$model = item"
                      v-show="item"
                    >{{item}}</a>
                  </dropdown>
                </div>

                <textarea
                  v-if="$i18n.locale == 'pt_BR'"
                  class="form-control mb-3"
                  :placeholder="$t('Descrição')"
                  v-model="$v.br.solucao.descricao.$model"
                  :class="valido.descricao"
                ></textarea>
                <textarea
                  v-else
                  class="form-control mb-3"
                  :placeholder="$t('Descrição')"
                  v-model="$v.en.solucao.descricao.$model"
                  :class="valido.descricao"
                ></textarea>
                <p
                  class="text-right text-italic small"
                >{{$i18n.locale == 'pt_BR'? solucao.en_descricao : solucao.descricao}}</p>

                <div class="card mb-3 p-2" :class="valido.area_aplicacao">
                  <h6 class="mb-3 text-warning font-weight-bold">{{$t('Área de Aplicação')}}</h6>
                  <base-radio
                    name="Projeto de Saúde"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Projeto de Saúde')}}</base-radio>
                  <base-radio
                    name="Trabalho / Renda"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Trabalho / Renda')}}</base-radio>
                  <base-radio
                    name="Educação / Cursos"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Educação / Cursos')}}</base-radio>
                  <base-radio
                    name="Serviços de Informação"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Serviços de Informação')}}</base-radio>
                  <base-radio
                    name="Ação Social"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Ação Social')}}</base-radio>
                  <base-radio
                    name="Mobilidade / Transporte"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Mobilidade / Transporte')}}</base-radio>
                  <base-radio
                    name="Meio Ambiente / Urbanismo"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Meio Ambiente / Urbanismo')}}</base-radio>
                </div>
                <div class="card border-valid mb-3 p-2">
                  <h6 class="mb-3 text-warning font-weight-bold">{{$t('Tipo')}}</h6>
                  <base-radio name="Software" class="mb-3" v-model="solucao.tipo">{{$t('Software')}}</base-radio>
                  <base-radio name="Hardware" class="mb-3" v-model="solucao.tipo">{{$t('Hardware')}}</base-radio>
                  <base-radio name="Processo" class="mb-3" v-model="solucao.tipo">{{$t('Processo')}}</base-radio>
                  <base-radio name="Material" class="mb-3" v-model="solucao.tipo">{{$t('Material')}}</base-radio>
                  <base-radio name="Outros" class="mb-3" v-model="solucao.tipo">{{$t('Outros')}}</base-radio>
                </div>
                <div class="card mb-3 p-2" :class="valido.status">
                  <h6 class="mb-3 text-warning font-weight-bold">{{$t('Status')}}</h6>
                  <base-radio
                    name="Produto Comercializado"
                    class="mb-3"
                    v-model="solucao.status"
                  >{{$t('Produto Comercializado')}}</base-radio>
                  <base-radio
                    name="Produto Lançado"
                    class="mb-3"
                    v-model="solucao.status"
                  >{{$t('Produto Lançado')}}</base-radio>
                  <base-radio
                    name="Produto Testado"
                    class="mb-3"
                    v-model="solucao.status"
                  >{{$t('Produto Testado')}}</base-radio>
                  <base-radio
                    name="Produto Terminado"
                    class="mb-3"
                    v-model="solucao.status"
                  >{{$t('Produto Terminado')}}</base-radio>
                  <base-radio
                    name="Produto em Desenvolvimento"
                    class="mb-3"
                    v-model="solucao.status"
                  >{{$t('Produto em Desenvolvimento')}}</base-radio>
                </div>

                <div class="card border-valid mb-3 p-2">
                  <h6 class="mb-3 text-warning font-weight-bold">{{$t('Tipo de Negócio')}}</h6>
                  <base-radio name="Grátis" class="mb-3" v-model="solucao.negocio">{{$t('Grátis')}}</base-radio>
                  <base-radio
                    name="Com Restrições"
                    class="mb-3"
                    v-model="solucao.negocio"
                  >{{$t('Com Restrições')}}</base-radio>
                  <base-radio name="Pago" class="mb-3" v-model="solucao.negocio">{{$t('Pago')}}</base-radio>
                  <base-radio
                    name="Negócio à Venda"
                    class="mb-3"
                    v-model="solucao.negocio"
                  >{{$t('Negócio à Venda')}}</base-radio>
                  <base-radio
                    name="À Procura de Financiamento"
                    class="mb-3"
                    v-model="solucao.negocio"
                  >{{$t('À Procura de Financiamento')}}</base-radio>
                  <base-radio
                    name="À Procura de Parceria"
                    class="mb-3"
                    v-model="solucao.negocio"
                  >{{$t('À Procura de Parceria')}}</base-radio>
                </div>

                <div class="text-center">
                  <base-button type="warning" class="mt-4" @click="onSubmit()">{{$t('Salvar')}}</base-button>
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
import http from "../../services/http";
import Dropdown from "../../components/BaseDropdown.vue";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      http: new http(),
      br: {
        solucao: {
          nome: "",
          instituicao: "",
          descricao: ""
        },
        local: {
          estado: { _id: undefined },
          estados: [],
          cidade: { _id: undefined },
          cidades: []
        }
      },
      en: {
        solucao: {
          nome: "",
          instituicao: "",
          descricao: ""
        },
        local: {
          pais: "",
          paises: [
            "Argentina",
            "Brazil",
            "Canada",
            "Chile",
            "China",
            "Colombia",
            "Spain",
            "France",
            "Germany",
            "Netherlands",
            "India",
            "Israel",
            "Italy",
            "Japan",
            "Mexico",
            "Portugal",
            "Russia",
            "Singapore",
            "Switzerland",
            "Uruguay",
            "United Kingdom",
            "USA",
            "Asian continent",
            "Australian continent",
            "European continent",
            "Latin American"
          ]
        }
      },
      solucao: {
        nome: "",
        en_nome: "",
        instituicao: "",
        link_web: "",
        link_youtube: "",
        descricao: "",
        en_descricao: "",
        area_aplicacao: "Projeto de Saúde",
        tipo: "Material",
        status: "Produto em Desenvolvimento",
        negocio: "Grátis",
        responsavel: { _id: "" },
        cidade: { _id: "" },
        en_pais: ""
      },

      valido: {
        nome: null,
        instituicao: null,
        pais: "border-valid",
        cidade: "border-valid",
        descricao: "border-valid"
      },
      error: false
    };
  },
  async mounted() {
    await this.buscar_estados();
    if (!this.$route.query.solucao) await this.buscar_cidades(true);
    else {
      this.solucao = await this.$route.query.solucao;

      this.br.solucao.nome = this.solucao.nome;
      this.br.solucao.instituicao = this.solucao.instituicao;
      this.br.solucao.descricao = this.solucao.descricao;

      this.en.solucao.nome = this.solucao.en_nome;
      this.en.solucao.instituicao = this.solucao.instituicao;
      this.en.solucao.descricao = this.solucao.en_descricao;
      this.en.local.pais = this.solucao.en_pais;

      await this.http
        .getId("estado", this.solucao.cidade.estado)
        .then(async data => {
          this.br.local.estado = await data;
          await this.buscar_cidades(false);
          this.br.local.cidade = await this.$route.query.solucao.cidade;
        });
    }
  },

  validations: {
    br: {
      solucao: {
        nome: { required, maxLength: maxLength(100) },
        instituicao: { required, maxLength: maxLength(100) },
        descricao: { required, maxLength: maxLength(500) }
      },
      local: {
        estado: {},
        cidade: {
          isCidadeSelected(value) {
            if (
              typeof value._id === "undefined" &&
              typeof value.nome === "undefined"
            ) {
              return false;
            }
            return true;
          }
        }
      }
    },
    en: {
      solucao: {
        nome: { required, maxLength: maxLength(100) },
        instituicao: { required, maxLength: maxLength(100) },
        descricao: { required, maxLength: maxLength(500) }
      },
      local: {
        pais: {
          isPaisSelected(value) {
            if (typeof value.nome === "undefined") {
              return false;
            }
            return true;
          }
        }
      }
    }
  },

  methods: {
    onSubmit() {
      this.resetaCamposValidos();
      // this.$v.local_br.$touch(); COMENTEI ISSO

      if (this.$i18n.locale == "pt_BR") {
        this.$v.br.solucao.$touch();
        if (this.$v.br.solucao.$anyError || this.$v.br.local.$anyError) {
          this.error = true;
          if (this.$v.br.solucao.nome.$invalid)
            this.valido.nome = !this.$v.br.solucao.nome.$invalid;
          if (this.$v.br.solucao.instituicao.$invalid)
            this.valido.instituicao = !this.$v.br.solucao.instituicao.$invalid;
          if (this.$v.br.solucao.descricao.$invalid)
            this.valido.descricao = "border-danger";
          if (this.$v.br.local.$invalid) this.valido.cidade = "border-danger";
          return;
        }
      } else {
        this.$v.en.solucao.$touch();
        if (this.$v.en.solucao.$anyError || this.$v.en.local.$anyError) {
          this.error = true;
          if (this.$v.en.solucao.nome.$invalid)
            this.valido.nome = !this.$v.en.solucao.nome.$invalid;
          if (this.$v.en.solucao.instituicao.$invalid)
            this.valido.instituicao = !this.$v.en.solucao.instituicao.$invalid;
          if (this.$v.en.solucao.descricao.$invalid)
            this.valido.descricao = "border-danger";
          if (this.$v.en.local.$invalid) this.valido.pais = "border-danger";
          return;
        }
      }

      this.resetaCamposValidos();
      this.salvar();
    },

    resetaCamposValidos() {
      this.error = false;

      this.$v.br.solucao.$reset();
      this.$v.en.solucao.$reset();
      this.$v.br.local.$reset();
      this.$v.en.local.$reset();

      this.valido.nome = null;
      this.valido.instituicao = null;
      this.valido.cidade = "border-valid";
      this.valido.pais = "border-valid";
      this.valido.descricao = "border-valid";
    },

    async buscar_estados() {
      await this.http.get("estado", 0).then(async data => {
        this.br.local.estados = await data;
      });
    },

    async buscar_cidades(definir_cidade) {
      if (this.br.local.estado && this.br.local.estado._id)
        await this.http
          .cidadesByEstado(this.br.local.estado._id)
          .then(async data => {
            this.br.local.cidades = await data.cidades;
            if (
              definir_cidade &&
              this.br.local.cidades[0] &&
              this.br.local.cidades[0]._id
            )
              this.br.local.cidade = this.br.local.cidades[0];
          });
    },

    async salvar() {
      if (this.$i18n.locale == "pt_BR") {
        this.solucao.nome = await this.br.solucao.nome;
        this.solucao.descricao = await this.br.solucao.descricao;
        this.solucao.instituicao = await this.br.solucao.instituicao;
        this.solucao.cidade = await this.br.local.cidade;
      } else {
        this.solucao.en_nome = await this.en.solucao.nome;
        this.solucao.en_descricao = await this.en.solucao.descricao;
        this.solucao.instituicao = await this.en.solucao.instituicao;
        this.solucao.en_pais = await this.en.local.pais;
        if (this.solucao.cidade._id == "")
          this.solucao.cidade._id = await "5e8cebee28d08919d4363345";
      }
      for (const key in this.solucao) {
        if (this.solucao.hasOwnProperty(key)) {
          const element = this.solucao[key];
        }
      }
      if (this.$route.query.solucao && this.solucao._id) {
        this.http.put("solucao", this.solucao._id, this.solucao).then(resp => {
          if (resp.message == "Editado com sucesso!")
            this.$router.push("usuario_solucoes_lista");
        });
      } else {
        let pessoa = localStorage.getItem("pessoa");
        if (pessoa) pessoa = JSON.parse(pessoa);
        this.solucao.responsavel._id = pessoa._id;
        this.http.post("solucao", this.solucao).then(resp => {
          if (resp._id) this.$router.push("usuario_solucoes_lista");
        });
      }
    }
  }
};
</script>
<style scoped>
.border-valid {
  border-style: solid;
  border-color: rgba(192, 192, 192, 0.7);
  border-radius: 15px;
  border-width: thin;
}
</style>