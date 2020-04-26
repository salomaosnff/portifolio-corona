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
          >Voltar</base-button>
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
            <h4 class="mb-4 text-warning font-weight-bold">Cadastre sua Ideia</h4>
            <template>
              <form role="form">
                <base-alert type="danger" v-show="error">
                    <strong>Dados inválidos!</strong> Verifique os campos destacados!
                </base-alert>                  
                <base-input 
                  class="mb-3" 
                  placeholder="Nome da Ideia" 
                  v-model="solucao.nome"
                  :valid="valido.nome"
                ></base-input>

                <base-input
                  class="mb-3"
                  placeholder="Instituição ou Empresa"
                  v-model="solucao.instituicao"
                  :valid="valido.instituicao"
                ></base-input>

                <base-input class="mb-3" placeholder="Link do Site" v-model="solucao.link_web"></base-input>

                <base-input
                  class="mb-3"
                  placeholder="Link do YouTube"
                  v-model="solucao.link_youtube"
                ></base-input>


                <div class="mb-3">
                  <dropdown>
                    <base-button
                      slot="title"
                      type="warning"
                      class="dropdown-toggle text-capitalize"
                    >{{estado.nome || "Selecione seu Estado"}}</base-button>
                    <a
                      v-for="(item, index) in estados"
                      :key="index"
                      class="dropdown-item"
                      @click="estado = item; buscar_cidades(true)"
                    >{{item.nome}}</a>
                  </dropdown>
                </div>
                <div class="mb-3" v-show="solucao.cidade && solucao.cidade._id">
                  <dropdown>
                    <base-button
                      slot="title"
                      type="warning"
                      class="dropdown-toggle text-capitalize"
                    >{{solucao.cidade.nome || "Selecione sua Cidade"}}</base-button>
                    <a
                      v-for="(item, index) in cidades"
                      :key="index"
                      class="dropdown-item"
                      @click="solucao.cidade = item"
                      :valido="valido.cidade"
                    >{{item.nome}}</a>
                  </dropdown>
                </div>
                <textarea
                  class="form-control mb-3"
                  :class="valido.descricao"
                  placeholder="Descrição"
                  v-model="solucao.descricao"                  
                ></textarea>
                <div class="card mb-3 p-2" :class="valido.area_aplicacao">
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
                </div>
                <div class="card border-valid mb-3 p-2">
                  <h6 class="mb-3 text-warning font-weight-bold">Tipo</h6>
                  <base-radio name="Software" class="mb-3" v-model="solucao.tipo">Software</base-radio>
                  <base-radio name="Hardware" class="mb-3" v-model="solucao.tipo">Hardware</base-radio>
                  <base-radio name="Processo" class="mb-3" v-model="solucao.tipo">Processo</base-radio>
                  <base-radio name="Material" class="mb-3" v-model="solucao.tipo">Material</base-radio>
                  <base-radio name="Outros" class="mb-3" v-model="solucao.tipo">Outros</base-radio>
                </div>
                <div class="card mb-3 p-2" :class="valido.status">
                  <h6 class="mb-3 text-warning font-weight-bold">Status</h6>
                  <base-radio
                    name="Produto Comercializado"
                    class="mb-3"
                    v-model="solucao.status"
                  >Produto Comercializado</base-radio>
                  <base-radio
                    name="Produto Lançado"
                    class="mb-3"
                    v-model="solucao.status"
                  >Produto Lançado</base-radio>
                  <base-radio
                    name="Produto Testado"
                    class="mb-3"
                    v-model="solucao.status"
                  >Produto Testado</base-radio>
                  <base-radio
                    name="Produto Terminado"
                    class="mb-3"
                    v-model="solucao.status"
                  >Produto Terminado</base-radio>
                  <base-radio
                    name="Produto em Desenvolvimento"
                    class="mb-3"
                    v-model="solucao.status"
                  >Produto em Desenvolvimento</base-radio>
                  <base-radio name="Outros" class="mb-3" v-model="solucao.status">Outros</base-radio>
                </div>
                <div class="card border-valid mb-3 p-2">
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
                </div>

                <div class="text-center">
                  <base-button type="warning" class="mt-4" @click="onSubmit()">Salvar</base-button>
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
        area_aplicacao: "Saúde",
        tipo: "Material",
        status: "Produto em Desenvolvimento",
        negocio: "Disponível Gratuitamente",
        responsavel: { _id: "" },
        cidade: { _id: "" }
      },
      estado: { _id: undefined },
      estados: [],
      cidades: [],
      
      valido: {
        nome: null,
        instituicao: null,
        cidade: null,
        descricao: "border-valid",
        area_aplicacao: "border-valid",
        status: "border-valid",
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
      instituicao: { required, minLength: minLength(5), maxLength: maxLength(60)},
      //TODO: cidade: {required},
      descricao: { required, minLength: minLength(10), maxLength: maxLength }      
    }
  },  

  methods: {
    onSubmit() {
      this.$v.solucao.$touch();

      if(this.$v.solucao.$anyError) {
        this.error = true;
        if (this.$v.solucao.nome.$invalid)
          this.valido.nome = !this.$v.solucao.nome.$invalid;
        if (this.$v.solucao.instituicao.$invalid)
          this.valido.instituicao = !this.$v.solucao.instituicao.$invalid;
        if (this.$v.solucao.descricao.$invalid)
          this.valido.descricao = "border-danger";
        return;
      }
      // Submeter apos insenção de erros
      this.resetaCamposValidos();
      this.salvar();
      
    },

    resetaCamposValidos(){
      this.error = false;

      this.valido.nome = null;
      this.valido.instituicao = null;
      this.valido.cidade = null;
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

    // converter_data(data) {
    //   data =
    //     data.substring(6, 10) +
    //     "-" +
    //     data.substring(3, 5) +
    //     "-" +
    //     data.substring(0, 2);
    //   return data;
    // },

    async salvar() {
      console.log("Enter Salve")
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
  .border-valid{
    border-style: solid; 
    border-color: rgba(192,192,192,0.7); 
    border-radius: 15px;
    border-width: thin;
  }
</style>