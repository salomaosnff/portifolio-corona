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
            <h4 class="mb-4 text-warning font-weight-bold">{{$t('Recuperar Senha')}}</h4>
            <template>
              <form role="form">
                <base-alert type="danger" v-show="error">
                  <strong>{{$t('Registro.Dados inválidos!')}}</strong>{{$t('Verifique os campos destacados!')}}
                </base-alert>
              
                <base-input
                  class="mb-3"
                  :placeholder="$t('E-mail')"
                  v-model.trim="$v.pessoa.email.$model"
                  :valid="valido.email"
                ></base-input>
                
                <div class="text-center">
                  <base-button class="mt-4" type="warning" @click="onSubmit()">{{$t('Enviar')}}</base-button>
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
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      http: new http(),
      pessoa: {
        
        email: "",
        
      },
      valido: {
        
        email: null,
        
      },
      error: false,
      
    };
  },
  validations: {
    pessoa: {
      
      email: { required, email, maxLength: maxLength(60) }
       
    }
  },

  async mounted() {},

  methods: {

    onSubmit() {
      this.resetaCamposValidos();
      this.$v.pessoa.$touch();

      if (this.$v.pessoa.$anyError) {
        this.error = true;
        
        if (this.$v.pessoa.email.$invalid)
          this.valido.email = !this.$v.pessoa.email.$invalid;
      
        return;
      }
      // Submeter apos insenção de erros
      this.resetaCamposValidos();
      this.recuperar();
    },

    resetaCamposValidos() {
      this.error = false;
      
      this.valido.email = null;
      
    },

    async recuperar() {
    
      await this.http   
        .esqueceuSenha("enviarEmail/forgotPassword/", {email: this.pessoa.email})
        .then(async resp => {
          if (resp.message == "E-mail encontrado!"){
            alert("Sua senha foi enviada para o endereço de e-mail: " + this.pessoa.email);
            this.$router.push("login");
          }else {
            alert("Não foi possível localizar este endereço de e-mail. Tente novamente.");
          }
          
        })
        .catch(err => {
          console.log("Erro. Não foi possível recuperar sua senha.");
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
