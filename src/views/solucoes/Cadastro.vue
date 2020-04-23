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
        <div class="col-lg-5">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-4 text-warning font-weight-bold">Cadastro da Ideia</h4>
            <template>
              <form role="form">
                <base-alert type="danger" v-show="error">
                    <strong>Dados inválidos!</strong> Verifique os campos destacados!
                </base-alert>                
                <base-input
                  class="mb-3"
                  placeholder="Nome da ideia (projeto)"
                  v-model="$v.ideia.nome.$model"
                  :valid="valido.nome"
                ></base-input>

                <base-input 
                  class="mb-3" 
                  placeholder="Nome da Instituição" 
                  v-model="$v.ideia.instituicao.$model"
                  :valid="valido.instituicao"
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
                      @click="estado = item; buscar_cidades()"
                    >{{item.nome}}</a>
                  </dropdown>
                </div>

                <div class="mb-3" v-if="endereco.cidade && endereco.cidade._id">
                  <p class="d-block mb-2">Cidade</p>
                  <dropdown>
                    <base-button
                      slot="title"
                      type="warning"
                      class="dropdown-toggle text-capitalize"
                    >{{endereco.cidade.nome || "Selecione sua Cidade"}}</base-button>
                    <a
                      v-for="(item, index) in cidades"
                      :key="index"
                      class="dropdown-item"
                      @click="endereco.cidade = item"
                    >{{item.nome}}</a>
                  </dropdown>
                </div>
                <textarea 
                  class="mb-3 form-control" 
                  :style="valido.descricao" 
                  id="descricaoFormTextArea" 
                  rows="3" 
                  placeholder="Descreva sua ideia aqui..." 
                  v-model="$v.ideia.descricao.$model"
                ></textarea>
                <h6 class="mb-4 text-warning font-weight-bold">Área de Aplicação</h6>
                <base-checkbox class="mb-3" v-model="ideia.area_de_aplicacao.saude">Saúde</base-checkbox>
                <base-checkbox class="mb-3" v-model="ideia.area_de_aplicacao.economia">Economia</base-checkbox>
                <base-checkbox class="mb-3" v-model="ideia.area_de_aplicacao.educacao">Educação</base-checkbox>
                <base-checkbox class="mb-3" v-model="ideia.area_de_aplicacao.comunicacao">Comunicação</base-checkbox>
                <base-checkbox class="mb-3" v-model="ideia.area_de_aplicacao.social">Social</base-checkbox>
                <base-checkbox class="mb-3" v-model="ideia.area_de_aplicacao.outros">Outros</base-checkbox>
                
                <h6 class="mb-4 text-warning font-weight-bold">Status da Ideia</h6>
                <base-radio name="comercializado" class="mb-3" v-model="ideia.status.escolhido">Produto Comercializado</base-radio>
                <base-radio name="lancado" class="mb-3" v-model="ideia.status.escolhido">Produto Lançado</base-radio>
                <base-radio name="testado" class="mb-3" v-model="ideia.status.escolhido">Produto Testado</base-radio>
                <base-radio name="terminado" class="mb-3" v-model="ideia.status.escolhido">Produto Terminado</base-radio>
                <base-radio name="desenvolvimento" class="mb-3" v-model="ideia.status.escolhido">Produto em Desenvolvimento</base-radio>
                <base-radio name="outros" class="mb-3" v-model="ideia.status.escolhido">Outros</base-radio>
                <div class="text-center">
                  <base-button class="my-4" type="warning" @click="onSubmit">Cadastrar</base-button>
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
import { required, minLength, maxLength, sameAs } from "vuelidate/lib/validators";

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      http: new http(),
      ideia: {
        nome: "",
        instituicao: "",
        endereco: { _id: "" },
        descricao: "",
        area_de_aplicacao: {
          saude: true,
          economia: false,
          educacao: false,
          comunicacao: false,
          social: false,
          outros: false
        },
        status: {
          escolhido: "desenvolvimento"
        }
      },
      endereco: {
        cidade: { _id: "" },
      },
      estado: { _id: "" },
      estados: [],
      cidades: [],
      valido: {
        nome: null,
        instituicao: null,
        descricao: null
      },
      error: false
    };
  },

  validations: {
    ideia: {
      nome: { required, minLength: minLength(4) },
      instituicao: { required, minLength: minLength(4), maxLength: maxLength(50) },
      descricao: {required, minLength: minLength(10), maxLength: maxLength(300)},
    }
  },

  async mounted() {
    await this.buscar_estados();
    await this.buscar_cidades();
  },

  methods: {
    onSubmit() {
      this.$v.ideia.$touch();

      if(this.$v.ideia.$anyError) {
        this.error = true;
        if (this.$v.ideia.nome.$invalid)
          this.valido.nome = !this.$v.ideia.nome.$invalid;
        if (this.$v.ideia.instituicao.$invalid)
          this.valido.instituicao = !this.$v.ideia.instituicao.$invalid;
        if (this.$v.ideia.descricao.$invalid)
          this.valido.descricao = "border-color:red";
        //TODO: Validar area de aplicacao e Status da Ideia
        return;
      }

      // Submeter apos insenção de erros
      this.resetaCamposValidos();
      //TODO: Enviar registro ao banco de dados
      this.$router.push('solucoes_lista');
    },

    resetaCamposValidos() {
      this.error = false;
      this.valido.nome = null;
      this.valido.instituicao = null;
      this.valido.descricao = null;
    },

    async buscar_estados() {
      await this.http.get("estado", 0).then(async data => {
        this.estados = await data;
      });
    },

    async buscar_cidades() {
      if (this.estado && this.estado._id)
        await this.http.cidadesByEstado(this.estado._id).then(async data => {
          this.cidades = await data.cidades;
          if (this.cidades[0] && this.cidades[0]._id)
            this.endereco.cidade = this.cidades[0];
        });
    },

    async salvar() {
      // this.endereco.cep = await this.endereco.cep.replace(/\D+/g, "");
      // this.pessoa.cpf = await this.pessoa.cpf.replace(/\D+/g, "");
      // this.pessoa.cnpj = await this.pessoa.cnpj.replace(/\D+/g, "");
      // this.pessoa.telefone = await this.pessoa.telefone.replace(/\D+/g, "");
      await this.http
        .post("endereco", this.endereco)
        .then(async resp_endereco => {
          if (resp_endereco._id) {
            this.pessoa.endereco = resp_endereco._id;
            await this.http
              .post("pessoa", this.pessoa)
              .then(async resp_pessoa => {
                if (resp_pessoa._id) {
                  this.pessoa._id = resp_pessoa._id;
                  await localStorage.setItem(
                    "pessoa",
                    JSON.stringify(this.pessoa)
                  );
                  this.$router.push("solucoes_cadastro");
                }
              })
              .catch(err => {
                console.log("Erro ao Salvar a Pessoa");
                console.error(err);
              });
          }
        })
        .catch(err => {
          console.log("Erro ao Salvar o Endereço");
          console.error(err);
        });
    }
  }
};
</script>
