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
            <h4 class="mb-4 text-warning font-weight-bold">{{$t('Solucoes.Cadastre sua Ideia')}}</h4>
            <template>
              <form role="form">
                <base-alert type="danger" v-show="error">
                  <strong>{{$t('Solucoes.Dados inválidos!')}}</strong>
                  {{$t('Solucoes.Verifique os campos destacados!')}}
                </base-alert>
                <base-input
                  class="mb-3"
                  :placeholder="$t('Solucoes.Nome da Ideia')"
                  v-model="$v.solucao.nome.$model"
                  :valid="valido.nome"
                ></base-input>

                <base-input
                  class="mb-3"
                  :placeholder="$t('Solucoes.Instituição ou Empresa')"
                  v-model="$v.solucao.instituicao.$model"
                  :valid="valido.instituicao"
                ></base-input>

                <base-input
                  class="mb-3"
                  :placeholder="$t('Solucoes.Link do Site')"
                  v-model="solucao.link_web"
                ></base-input>

                <base-input
                  class="mb-3"
                  :placeholder="$t('Solucoes.Link do YouTube')"
                  v-model="solucao.link_youtube"
                ></base-input>

                <div class="button-group mb-3 p-1 card w-50" :class="valido.cidade.block">
                  <dropdown>
                    <base-button
                      name="b-state"
                      slot="title"
                      type="warning"
                      class="dropdown-toggle text-capitalize m-1"
                    >
                      <strong>{{estado.nome || $t('Solucoes.Selecione seu Estado')}}</strong>
                    </base-button>
                    <a
                      v-for="(item, index) in estados"
                      :key="index"
                      class="dropdown-item"
                      @click="estado = item; buscar_cidades(true);"
                    >{{item.nome}}</a>
                  </dropdown>
                  <div class="mb3" v-show="solucao.cidade && solucao.cidade._id">
                    <dropdown>
                      <base-button
                        slot="title"
                        type="warning"
                        class="dropdown-toggle text-capitalize m-1"
                      >
                        <strong>{{solucao.cidade.nome || $t('Solucoes.Selecione sua Cidade')}}</strong>
                      </base-button>
                      <a
                        v-for="(item, index) in cidades"
                        :key="index"
                        class="dropdown-item"
                        @click="solucao.cidade = item; "
                      >{{item.nome}}</a>
                    </dropdown>
                  </div>
                </div>

                <textarea
                  class="form-control mb-3"
                  :class="valido.descricao"
                  :placeholder="$t('Descrição')"
                  v-model="$v.solucao.descricao.$model"
                ></textarea>
                <div class="card mb-3 p-2" :class="valido.area_aplicacao">
                  <h6
                    class="mb-3 text-warning font-weight-bold"
                  >{{$t('Solucoes.Área de Aplicação')}}</h6>
                  <base-radio
                    name="Projeto de Saúde"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Solucoes.Projeto de Saúde')}}</base-radio>
                  <base-radio
                    name="Trabalho / Renda"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Solucoes.Trabalho / Renda')}}</base-radio>
                  <base-radio
                    name="Educação / Cursos"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Solucoes.Educação / Cursos')}}</base-radio>
                  <base-radio
                    name="Serviços de Informação"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Solucoes.Serviços de Informação')}}</base-radio>
                  <base-radio
                    name="Ação Social"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Solucoes.Ação Social')}}</base-radio>
                  <base-radio
                    name="Mobilidade / Transporte"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Solucoes.Mobilidade / Transporte')}}</base-radio>
                  <base-radio
                    name="Meio Ambiente / Urbanismo"
                    class="mb-3"
                    v-model="solucao.area_aplicacao"
                  >{{$t('Solucoes.Meio Ambiente / Urbanismo')}}</base-radio>
                </div>
                <div class="card border-valid mb-3 p-2">
                  <h6 class="mb-3 text-warning font-weight-bold">{{$t('Tipo')}}</h6>
                  <base-radio
                    name="Software"
                    class="mb-3"
                    v-model="solucao.tipo"
                  >{{$t('Solucoes.Software')}}</base-radio>
                  <base-radio
                    name="Hardware"
                    class="mb-3"
                    v-model="solucao.tipo"
                  >{{$t('Solucoes.Hardware')}}</base-radio>
                  <base-radio
                    name="Processo"
                    class="mb-3"
                    v-model="solucao.tipo"
                  >{{$t('Solucoes.Processo')}}</base-radio>
                  <base-radio
                    name="Material"
                    class="mb-3"
                    v-model="solucao.tipo"
                  >{{$t('Solucoes.Material')}}</base-radio>
                  <base-radio
                    name="Outros"
                    class="mb-3"
                    v-model="solucao.tipo"
                  >{{$t('Solucoes.Outros')}}</base-radio>
                </div>
                <div class="card mb-3 p-2" :class="valido.status">
                  <h6 class="mb-3 text-warning font-weight-bold">{{$t('Solucoes.Status')}}</h6>
                  <base-radio
                    name="Produto Comercializado"
                    class="mb-3"
                    v-model="solucao.status"
                  >{{$t('Solucoes.Produto Comercializado')}}</base-radio>
                  <base-radio
                    name="Produto Lançado"
                    class="mb-3"
                    v-model="solucao.status"
                  >{{$t('Solucoes.Produto Lançado')}}</base-radio>
                  <base-radio
                    name="Produto Testado"
                    class="mb-3"
                    v-model="solucao.status"
                  >{{$t('Solucoes.Produto Testado')}}</base-radio>
                  <base-radio
                    name="Produto Terminado"
                    class="mb-3"
                    v-model="solucao.status"
                  >{{$t('Solucoes.Produto Terminado')}}</base-radio>
                  <base-radio
                    name="Produto em Desenvolvimento"
                    class="mb-3"
                    v-model="solucao.status"
                  >{{$t('Solucoes.Produto em Desenvolvimento')}}</base-radio>
                </div>

                <div class="card border-valid mb-3 p-2">
                  <h6 class="mb-3 text-warning font-weight-bold">{{$t('Solucoes.Tipo de Negócio')}}</h6>
                  <base-radio
                    name="Grátis"
                    class="mb-3"
                    v-model="solucao.negocio"
                  >{{$t('Solucoes.Grátis')}}</base-radio>
                  <base-radio
                    name="Com Restrições"
                    class="mb-3"
                    v-model="solucao.negocio"
                  >{{$t('Solucoes.Com Restrições')}}</base-radio>
                  <base-radio
                    name="Pago"
                    class="mb-3"
                    v-model="solucao.negocio"
                  >{{$t('Solucoes.Pago')}}</base-radio>
                  <base-radio
                    name="Negócio à Venda"
                    class="mb-3"
                    v-model="solucao.negocio"
                  >{{$t('Solucoes.Negócio à Venda')}}</base-radio>
                  <base-radio
                    name="À Procura de Financiamento"
                    class="mb-3"
                    v-model="solucao.negocio"
                  >{{$t('Solucoes.À Procura de Financiamento')}}</base-radio>
                  <base-radio
                    name="À Procura de Parceria"
                    class="mb-3"
                    v-model="solucao.negocio"
                  >{{$t('Solucoes.À Procura de Parceria')}}</base-radio>
                </div>

                <div class="text-center">
                  <base-button
                    type="warning"
                    class="mt-4"
                    @click="onSubmit()"
                  >{{$t('Solucoes.Salvar')}}</base-button>
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
      solucao: {
        nome: "",
        instituicao: "",
        link_web: "",
        link_youtube: "",
        descricao: "",
        area_aplicacao: "Projeto de Saúde",
        tipo: "Material",
        status: "Produto em Desenvolvimento",
        negocio: "Grátis",
        responsavel: { _id: "" },
        cidade: { _id: "" }
      },
      estado: { _id: undefined },
      estados: [],
      cidades: [],

      valido: {
        nome: null,
        instituicao: null,
        cidade: { block: "border-valid" },
        descricao: "border-valid",
        area_aplicacao: "border-valid",
        status: "border-valid"
      },
      error: false
    };
  },
  async mounted() {
    await this.buscar_estados();
    if (!this.$route.query.solucao) await this.buscar_cidades(true);
    else {
      this.solucao = await this.$route.query.solucao;
      await this.http
        .getId("estado", this.solucao.cidade.estado)
        .then(async data => {
          this.estado = await data;
          await this.buscar_cidades(false);
          this.solucao.cidade = await this.$route.query.solucao.cidade;
        });
    }
  },

  validations: {
    solucao: {
      nome: { required, maxLength: maxLength(60) },
      instituicao: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(60)
      },
      cidade: {
        isCidadeSelected(value) {
          if (value._id === "") return false;

          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(typeof value._id === "string" && value._id !== "");
            }, 350 + Math.random() * 300);
          });
        }
      },
      descricao: { required, maxLength: maxLength(300) }
    }
  },

  methods: {
    onSubmit() {
      this.resetaCamposValidos();
      this.$v.solucao.$touch();

      if (this.$v.solucao.$anyError) {
        this.error = true;
        if (this.$v.solucao.nome.$invalid)
          this.valido.nome = !this.$v.solucao.nome.$invalid;
        if (this.$v.solucao.instituicao.$invalid)
          this.valido.instituicao = !this.$v.solucao.instituicao.$invalid;
        if (this.$v.solucao.descricao.$invalid)
          this.valido.descricao = "border-danger";
        if (this.$v.solucao.cidade.$invalid)
          this.valido.cidade.block = "border-danger";
        return;
      }
      // Salvar apos insenção de erros
      this.resetaCamposValidos();
      this.salvar();
    },

    resetaCamposValidos() {
      this.error = false;

      this.valido.nome = null;
      this.valido.instituicao = null;
      this.valido.cidade.block = "border-valid";
      this.valido.descricao = "border-valid";
    },

    async buscar_estados() {
      await this.http.get("estado", 0).then(async data => {
        this.estados = await data;
      });
    },

    async buscar_cidades(definir_cidade) {
      if (this.estado && this.estado._id)
        await this.http.cidadesByEstado(this.estado._id).then(async data => {
          this.cidades = await data.cidades;
          if (definir_cidade && this.cidades[0] && this.cidades[0]._id)
            this.solucao.cidade = this.cidades[0];
        });
    },

    async salvar() {
      console.log("Enter Salve");
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