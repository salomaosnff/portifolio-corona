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
            <h4 class="mb-4 text-warning font-weight-bold">Criar Minha Conta</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Nome" v-model.trim="$v.pessoa.nome.$model"></base-input>
                <div
                  class="error mb-3 ml-2 text-danger"
                  v-show="!$v.pessoa.nome.required"
                >Campo obrigatório!</div>
                <base-input class="mb-3" placeholder="E-mail" v-model.trim="$v.pessoa.email.$model"></base-input>
                <div
                  class="error mb-3 ml-2 text-danger"
                  v-show="!$v.pessoa.email.required"
                >Campo obrigatório!</div>
                <div
                  class="error mb-3 ml-2 text-danger"
                  v-show="!$v.pessoa.email.email"
                >E-mail inválido!</div>
                <base-input
                  class="mb-3"
                  placeholder="Telefone"
                  v-model.trim="$v.pessoa.telefone.$model"
                  v-mask="['(##) #### - ####', '(##) ##### - ####']"
                ></base-input>
                <div
                  class="error mb-3 ml-2 text-danger"
                  v-show="!$v.pessoa.telefone.required"
                >Campo obrigatório!</div>
                <base-input placeholder="WhatsApp" v-model="pessoa.whatsapp"></base-input>

                <base-radio name="fisica" class="mb-3" v-model="pessoa.tipo">Pessoa Física</base-radio>
                <base-radio name="juridica" class="mb-3" v-model="pessoa.tipo">Pessoa Jurídica</base-radio>

                <base-input
                  v-if="pessoa.tipo === 'fisica'"
                  class="mb-3"
                  placeholder="CPF"
                  v-mask="'###.###.###-##'"
                  v-model="$v.pessoa.cpf.$model"
                ></base-input>
                <base-input
                  v-if="pessoa.tipo === 'juridica'"
                  class="mb-3"
                  placeholder="CNPJ"
                  v-mask="'##.###.###/####-##'"
                  v-model="$v.pessoa.cnpj.$model"
                ></base-input>
                <base-checkbox class="mb-3" v-model="pessoa.colaborador">Produtor de Ideias</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.cliente">Interessado em Soluções</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.investidor">Contribuidor e Investidor</base-checkbox>

                <base-input type="password" placeholder="Senha" v-model="$v.pessoa.senha.$model"></base-input>
                <div
                  class="error mb-3 ml-2 text-danger"
                  v-show="!$v.pessoa.senha.required"
                >Campo obrigatório!</div>
                <base-input
                  type="password"
                  placeholder="Confirmar Senha"
                  v-model="$v.confirmacao_senha"
                  :valid="pessoa.senha == confirmacao_senha && pessoa.senha != ''"
                ></base-input>

                <div class="text-center">
                  <base-button class="mt-4" type="warning" @click="salvar()">Salvar</base-button>
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
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  components: {
    Dropdown
  },
  data() {
    return {
      http: new http(),
      pessoa: {
        colaborador: false,
        investidor: false,
        cliente: false,
        tipo: "fisica",
        cpf: "",
        cnpj: "",
        nome: "",
        email: "",
        telefone: "",
        whatsapp: "",
        senha: ""
      },
      confirmacao_senha: ""
    };
  },
  validations: {
    pessoa: {
      cpf: { required, minLength: minLength(11) },
      cnpj: { required, minLength: minLength(14) },
      nome: { required, minLength: minLength(4) },
      email: { required, email },
      telefone: { required },
      senha: { required, minLength: minLength(8) }
    }
  },

  async mounted() {},

  methods: {
    async salvar() {
      await this.http
        .post("pessoa", this.pessoa)
        .then(async resp_pessoa => {
          if (resp_pessoa._id) {
            this.pessoa._id = resp_pessoa._id;
            await localStorage.setItem("pessoa", JSON.stringify(this.pessoa));
            this.$router.push("solucoes_cadastro");
          }
        })
        .catch(err => {
          console.log("Erro ao Salvar a Pessoa");
          console.error(err);
        });
    }
  }
};
</script>