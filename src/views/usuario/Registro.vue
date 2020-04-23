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
            <h4 class="mb-4 text-warning font-weight-bold">Criar Minha Conta</h4>
            <template>
              <form role="form">
                <base-alert type="danger" v-show="error">
                    <strong>Dados inválidos!</strong> Verifique os campos destacados!
                </base-alert>                
                <base-input 
                  class="mb-3" 
                  placeholder="Nome Completo" 
                  v-model="$v.pessoa.nome.$model" 
                  :valid="valido.nome"></base-input>
                <base-input
                  class="mb-3"
                  placeholder="Telefone"
                  v-model.number="$v.pessoa.telefone.$model"
                  v-mask="['(##) #### - ####', '(##) ##### - ####']"
                  :valid="valido.telefone"
                ></base-input>
                <base-input
                  class="mb-3"
                  placeholder="WhatsApp (opcional)"
                  v-model.number="pessoa.wapp"
                  v-mask="['(##) #### - ####', '(##) ##### - ####']"
                ></base-input>

                <base-radio name="fisica" class="mb-3" v-model="pessoa.tipo">Pessoa Física</base-radio>
                <base-radio name="juridica" class="mb-3" v-model="pessoa.tipo">Pessoa Jurídica</base-radio>

                <base-input
                  v-if="pessoa.tipo === 'fisica'"
                  class="mb-3"
                  placeholder="CPF (opcional)"
                  v-mask="'###.###.###-##'"
                  v-model.number="pessoa.cpf"
                ></base-input>
                <base-input
                  v-if="pessoa.tipo === 'juridica'"
                  type="number"
                  class="mb-3"
                  placeholder="CNPJ (opcional)"
                  v-mask="'##.###.###/####-##'"
                  v-model.number="pessoa.cnpj"
                ></base-input>
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
                  <base-button
                    type="warning"
                    class="my-4 btn-warning btn"
                    icon="ni ni-bold-right"
                    @click="onSubmit"
                  >Próximo</base-button>
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
import { required, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";

export default {
  components: {
  },
  data() {
    return {
      http: new http(),
      pessoa: {
        nome: "",
        tipo: "fisica",
        cpf: "",
        cnpj: "",
        telefone: "",
        wapp: "",
        email: "",
        senha: "",
        confirmacao_senha: ""
      },
      valido: {
        nome: null,
        telefone: null,
        email: null,
        senha: null,
        confirmacao_senha: null
      },
      error: false
    };
  },

  validations: {
    pessoa: {
      nome: { required, minLength: minLength(4), maxLength: maxLength(50) },
      email: { required, email, maxLength:maxLength(50) },
      telefone: { required },
      senha: { required, minLength: minLength(8), maxLength: maxLength(50) },
      confirmacao_senha: { required, mesma_como: sameAs("senha")}
    },
  },

  methods: {
    onSubmit() {
      this.$v.pessoa.$touch();

      if(this.$v.pessoa.$anyError) {
        this.error = true;
        if (this.$v.pessoa.nome.$invalid)
          this.valido.nome = !this.$v.pessoa.nome.$invalid;
        if (this.$v.pessoa.telefone.$invalid)
          this.valido.telefone = !this.$v.pessoa.telefone.$invalid;
        if (this.$v.pessoa.email.$invalid)
          this.valido.email = !this.$v.pessoa.email.$invalid;
        if (this.$v.pessoa.senha.$invalid)
          this.valido.senha = !this.$v.pessoa.senha.$invalid;
        if (this.$v.pessoa.confirmacao_senha.$invalid)
          this.valido.confirmacao_senha = !this.$v.pessoa.confirmacao_senha.$invalid;
        return;
      }
      // Submeter apos insenção de erros
      this.resetaCamposValidos();
      //TODO: Enviar registro ao banco de dados
      this.$router.push('solucoes_cadastro');
    },    
    
    resetaCamposValidos() {
      this.error = false;
      this.valido.nome = null;
      this.valido.telefone = null;
      this.valido.email = null;
      this.valido.senha = null;
      this.valido.confirmacao_senha = null;
    }    
  }
};
</script>
