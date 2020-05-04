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
                <base-alert type="danger" v-show="error">
                  <strong>Dados inválidos!</strong> Verifique os campos destacados!
                </base-alert>
                <base-input
                  class="mb-3"
                  placeholder="Nome"
                  v-model="$v.pessoa.nome.$model"
                  :valid="valido.nome"
                ></base-input>
                <base-input
                  class="mb-3"
                  placeholder="Telefone"
                  v-model="$v.pessoa.telefone.$model"
                  v-mask="['(##) #### - ####', '(##) ##### - ####']"
                  :valid="valido.telefone"
                ></base-input>
                <base-input
                  placeholder="WhatsApp (Opcional)"
                  v-model="pessoa.whatsapp"
                  v-mask="['(##) #### - ####', '(##) ##### - ####']"
                ></base-input>

                <base-radio name="fisica" class="mb-3" v-model="pessoa.tipo">Pessoa Física</base-radio>
                <base-radio name="juridica" class="mb-3" v-model="pessoa.tipo">Pessoa Jurídica</base-radio>

                <base-input
                  v-if="pessoa.tipo === 'fisica'"
                  class="mb-3"
                  placeholder="CPF (Opcional)"
                  v-mask="'###.###.###-##'"
                  v-model="pessoa.cpf"
                ></base-input>
                <base-input
                  v-if="pessoa.tipo === 'juridica'"
                  class="mb-3"
                  placeholder="CNPJ"
                  v-mask="'##.###.###/####-##'"
                  v-model="pessoa.cnpj"
                ></base-input>
                <div class="mb-3 p-2 w-50 card" :class="valido.conta_tipo">
                  <base-checkbox class="mb-3" v-model="pessoa.colaborador">Produtor de Ideias</base-checkbox>
                  <base-checkbox class="mb-3" v-model="pessoa.cliente">Interessado em Soluções</base-checkbox>
                  <base-checkbox class="mb-3" v-model="pessoa.investidor">Contribuidor e Investidor</base-checkbox>
                </div>

                <base-input
                  class="mb-3"
                  placeholder="E-mail"
                  v-model.trim="$v.pessoa.email.$model"
                  :valid="valido.email"
                ></base-input>
                <base-input
                  type="password"
                  placeholder="Senha (mínimo de 8 caracteres)"
                  v-model="$v.pessoa.senha.$model"
                  :valid="valido.senha"
                ></base-input>
                <base-input
                  type="password"
                  placeholder="Confirmar Senha"
                  v-model="$v.pessoa.confirmacao_senha.$model"
                  :valid="valido.confirmacao_senha"
                ></base-input>
                <div class="text-center">
                  <base-button class="mt-4" type="warning" @click="onSubmit()">Salvar</base-button>
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
export function isSelected() {
  if (
    !(this.pessoa.colaborador || this.pessoa.cliente || this.pessoa.investidor)
  )
    return false;
  return true;
}

import http from "../../services/http";
import Dropdown from "../../components/BaseDropdown.vue";
import {
  required,
  minLength,
  maxLength,
  email,
  sameAs
} from "vuelidate/lib/validators";

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      http: new http(),
      pessoa: {
        colaborador: true,
        investidor: false,
        cliente: false,
        tipo: "fisica",
        cpf: "",
        cnpj: "",
        nome: "",
        email: "",
        telefone: "",
        whatsapp: "",
        senha: "",
        confirmacao_senha: "",
        admin: false
      },
      valido: {
        nome: null,
        telefone: null,
        email: null,
        senha: null,
        confirmacao_senha: null,
        conta_tipo: "border-valid"
      },
      error: false
    };
  },
  validations: {
    pessoa: {
      conta_tipo: { hasSelected: isSelected },
      nome: { required, minLength: minLength(4), maxLength: maxLength(60) },
      email: { required, email, maxLength: maxLength(60) },
      telefone: { required },
      senha: { required, minLength: minLength(8) },
      confirmacao_senha: {
        required,
        mesma_como: sameAs("senha"),
        maxLength: maxLength(60)
      }
    }
  },

  async mounted() {},

  methods: {
    onSubmit() {
      this.resetaCamposValidos();
      this.$v.pessoa.$touch();

      if (this.$v.pessoa.$anyError) {
        this.error = true;
        if (this.$v.pessoa.nome.$invalid)
          this.valido.nome = !this.$v.pessoa.nome.$invalid;
        if (this.$v.pessoa.telefone.$invalid)
          this.valido.telefone = !this.$v.pessoa.telefone.$invalid;
        if (!this.$v.pessoa.conta_tipo.hasSelected)
          this.valido.conta_tipo = "border-danger";
        if (this.$v.pessoa.email.$invalid)
          this.valido.email = !this.$v.pessoa.email.$invalid;
        if (this.$v.pessoa.senha.$invalid)
          this.valido.senha = !this.$v.pessoa.senha.$invalid;
        if (this.$v.pessoa.confirmacao_senha.$invalid)
          this.valido.confirmacao_senha = !this.$v.pessoa.confirmacao_senha
            .$invalid;
        return;
      }
      // Submeter apos insenção de erros
      this.resetaCamposValidos();
      this.salvar();
    },

    resetaCamposValidos() {
      this.error = false;
      this.valido.nome = null;
      this.valido.telefone = null;
      this.valido.conta_tipo = "border-valid";
      this.valido.email = null;
      this.valido.senha = null;
      this.valido.confirmacao_senha = null;
    },

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

<style scoped>
.border-valid {
  border-style: solid;
  border-color: rgba(192, 192, 192, 0.7);
  border-radius: 15px;
  border-width: thin;
}
</style>