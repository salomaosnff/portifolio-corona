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
            type="white"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-4 text-warning font-weight-bold text-center">Entrar no REVIVE</h4>
            <template>
              <form role="form">
                <base-alert type="danger" v-show="error">
                    <strong>Dados inválidos!</strong> E-mail ou senha incorretos!
                </base-alert>                
                <base-input 
                  class="mb-3" 
                  placeholder="E-mail" 
                  v-model="$v.login.email.$model" 
                  :valid="field_valid.email"></base-input>
                <base-input
                  type="password"
                  placeholder=" Senha"
                  v-model="$v.login.senha.$model"
                  :valid="field_valid.senha"
                ></base-input>
                <div class="text-center">
                  <base-button type="warning" class="my-4 text-capitalize" @click="onClick()">Login</base-button>
                  <base-button
                    type="white"
                    text-color="warning"
                    class="my-4 text-capitalize"
                    @click="$router.push('registro')"
                  >Criar Conta</base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-4 mb-5">
            <div class="col-6"></div>
            <div class="col-6 text-right">
              <base-button
                type="white"
                text-color="warning"
                class="ml-auto text-capitalize"
                @click="$router.push('desenvolvimento')"
              >Esqueceu a Senha?</base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import http from "../../services/http";
import { required, sameAs, minLength, email } from "vuelidate/lib/validators"
export default {
  data() {
    return {
      http: new http(),
      pessoa: {
        colaborador: false,
        investidor: false,
        cliente: false,
        tipo: "",
        cpf: "",
        cnpj: "",
        nome: "",
        email: "",
        telefone: "",
        senha: "",
        endereco: undefined
      },
      login: {
        email: "",
        senha: ""
      },
      field_valid: {
        email: null,
        senha: null        
      },
      error: null
    };
  },

  validations: {
    login: {
      email: { required, email },
      senha: { required, minLength: minLength(8) }
    },

  },

  async mounted() {
    await this.get_login();
  },

  methods: {
    onClick() {
      this.$v.login.$touch();
      if (this.$v.login.$anyError){
        this.error = true;
        if (this.$v.login.email.$invalid)
          this.field_valid.email = !this.$v.login.email.$invalid;
        if (this.$v.login.senha)
          this.field_valid.senha = !this.$v.login.senha.$invalid;
        return;
      }
      this.resetFieldsValid();
      this.entrar();
      //TODO: Tratar credenciais incorretas

    },

    resetFieldsValid() {
      this.field_valid.nome = null;
      this.field_valid.senha = null;
    },

    async entrar() {
      let pessoa = undefined;
      pessoa = await this.http.logar(this.login);
      if (pessoa && pessoa._id) {
        await localStorage.setItem("pessoa", JSON.stringify(pessoa));
        this.$router.push(this.$route.query.rota);
      } else return console.log("Credenciais Incorretas");
    },

    async get_login() {
      let pessoa = localStorage.getItem("pessoa");
      if (pessoa) {
        pessoa = JSON.parse(pessoa);
        this.pessoa = pessoa;
        this.login.email = this.pessoa.email;
        this.login.senha = this.pessoa.senha;
      }
    }
  }
};
</script>
