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
          >{{$t('Voltar')}}</base-button>
        </div>
      </div>

      <alerta v-if="alerta.ver" :sucesso="alerta.sucesso" :mensagem="alerta.mensagem" />

      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="white"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4
              class="mb-4 text-warning font-weight-bold text-center"
            >{{$t('Login.Entrar no REVIVE')}}</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Email" v-model="login.email"></base-input>
                <base-input
                  :type="!passwordVisible? 'password' : 'text'"
                  :placeholder="$t('Senha')"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="login.senha"
                ></base-input>
                <base-checkbox v-model="passwordVisible">{{$t("Login.Mostrar Senha")}}</base-checkbox>
                <div class="text-center">
                  <base-button type="warning" class="my-4 text-capitalize" @click="entrar()">Login</base-button>
                  <base-button
                    type="white"
                    text-color="warning"
                    class="my-4 text-normal"
                    @click="$router.push('registro')"
                  >{{$t('Login.Criar Conta')}}</base-button>
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
                class="ml-auto text-normal"
                @click="$router.push('esqueceu_senha')"
              >{{$t('Login.Esqueci a Senha')}}</base-button>
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
      alerta: { ver: false, sucesso: "false", mensagem: "" },
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
        admin: false
      },
      login: {
        email: "",
        senha: ""
      },
      passwordVisible: false
    };
  },
  async mounted() {
    await this.get_login();
  },
  methods: {
    async entrar() {
      let pessoa = undefined;
      if (this.login.email && this.login.senha) {
        pessoa = await this.http.logar(this.login);
        if (pessoa && pessoa._id) {
          this.alerta.ver = await false;
          this.alerta = await {
            ver: true,
            sucesso: "true",
            mensagem: "Logado com Sucesso!"
          };
          await localStorage.setItem("pessoa", JSON.stringify(pessoa));
          this.$router.push(this.$route.query.rota);
        } else {
          this.alerta.ver = await false;
          this.alerta = await {
            ver: true,
            sucesso: "false",
            mensagem: "Credenciais Incorretas!"
          };
        }
      }
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
