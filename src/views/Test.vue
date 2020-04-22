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
            <h4 class="mb-4 text-warning font-weight-bold">Teste</h4>
            <form @submit.prevent="onSubmit">
            <base-alert type="danger" v-show="error">
                <strong>Erro!</strong> Verifique os campos destacados!
            </base-alert>
              <base-input
                name="name" class="mb-3" type="text" placeholder="Nome" v-model.trim="$v.form.name.$model" :valid="field_valid.name">
              </base-input>
              <base-input name="email" type="email" placeholder="exemplo@exemplo.com" v-model="$v.form.email.$model" :valid="field_valid.email">
              </base-input>
              <button name="submit" class="mb-3 btn" type="submit">
                Submit
              </button>              
              <tree-view class="mb-3" :data="$v.form" :options="{rootObjectKey: '$v.form', maxDepth: 2}"></tree-view>
            </form>

          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
// import Modal from "@/components/Modal.vue";

export default {
  components:{
    
  },
  data() {
    return {
      form: {
        name: null,
        email: null
      },
      error: false,
      field_valid: {
        name: null,
        email: null
      }
    };
  },

  validations: {
    form: {
      name: { required, min: minLength(10) },
      email: { required, email }
    }

  },

  methods: {
    onSubmit() {
      this.$v.form.$touch();
      console.log("Enter submit");
      if(this.$v.form.$anyError) {
        this.error = true;
        if (this.$v.form.name.$invalid)
          this.field_valid.name = !this.$v.form.$invalid;
        if (this.$v.form.email.$invalid)
          this.field_valid.email = !this.$v.form.email.$invalid;
        console.log("Error was ocurred!");
        return;
      }
      // to form submit after this    
      this.resetFieldsInvalid();
    },

    resetFieldsValid() {
      this.field_valid.name = null;
      this.field_valid.email = null;
    }
  }
};
</script>
<style>
</style>>


