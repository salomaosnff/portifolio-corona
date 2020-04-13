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
            <h4 class="mb-4 text-warning font-weight-bold">Entre no REVIVE</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Email, CPF ou CNPJ" v-model="login.login"></base-input>
                <base-input
                  type="password"
                  placeholder="Senha"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="login.senha"
                ></base-input>
                <div class="text-center">
                  <base-button type="warning" class="my-4" @click="entrar()">Entrar</base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-5 mb-5">
            <div class="col-6">
              <a href="#" class="text-light text-white">
                <small>Esqueceu a senha?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="#/registrar" class="text-light text-white">
                <small>Criar conta!</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import http from "../../services/http";
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
        login: "",
        senha: ""
      }
    };
  },

  async mounted() {
    await this.getLogin();
  },

  methods: {
    async entrar() {
      let pessoa = undefined;
      if (this.login.login && this.login.senha) {
        pessoa = await this.http.logar(this.login);
        if (pessoa && pessoa._id) {
          await localStorage.setItem("pessoa", JSON.stringify(pessoa));
          this.$router.push("solucoes_cadastro");
        } else console.log("Deu erro");
      }
    },

    async getLogin() {
      let pessoa = localStorage.getItem("pessoa");
      if (pessoa) pessoa = JSON.parse(pessoa);
      this.pessoa = pessoa;
      this.login.login =
        this.pessoa.email || this.pessoa.cpf || this.pessoa.cnpj;
      this.login.senha = this.pessoa.senha;
    }
  }
};
</script>
