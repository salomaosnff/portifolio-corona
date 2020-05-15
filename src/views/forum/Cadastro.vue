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
          >{{$t("Voltar")}}</base-button>
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
            <h4 class="mb-4 text-warning font-weight-bold">{{$t("forum.Cadastro.title")}}</h4>
            <template>
              <form role="form">
                <base-alert type="danger" v-show="error">
                  <strong>{{$t('Dados inválidos')}}</strong>
                  {{$t('Verifique os campos destacados!')}}
                </base-alert>                
                <base-input
                  v-if="$i18n.locale == 'pt_BR'"
                  class="mb-3"
                  :placeholder="$t('forum.Cadastro.ph_forum_name')"
                  v-model="$v.br.forum.nome.$model"
                  :valid="valido.nome"
                ></base-input>
                <base-input
                  v-else
                  class="mb-3"
                  :placeholder="$t('forum.Cadastro.ph_forum_name')"
                  v-model="$v.en.forum.nome.$model"
                  :valid="valido.nome"
                ></base-input>

                <base-input
                  class="mb-3"
                  :placeholder="$t('forum.Cadastro.ph_forum_link')"
                  v-model="$v.link.$model"
                  :valid="valido.link"
                ></base-input>

                <textarea
                  v-if="$i18n.locale == 'pt_BR'"
                  class="form-control mb-3"
                  :placeholder="$t('forum.Cadastro.ph_forum_description')"
                  v-model="$v.br.forum.descricao.$model"
                  :class="valido.descricao"
                ></textarea>
                <textarea
                  v-else
                  class="form-control mb-3"
                  :placeholder="$t('forum.Cadastro.ph_forum_description')"
                  v-model="$v.en.forum.descricao.$model"
                  :class="valido.descricao"
                ></textarea>

                <div class="text-center">
                  <base-button
                    type="warning"
                    class="mt-4"
                    @click="onSubmit()"
                  >{{$t('forum.Cadastro.save')}}</base-button>
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
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      http: new http(),
      br: {
        forum:{
          nome: "",
          descricao: "",
          link: ""
        }
      },
      en: {
        forum: {
          nome: "",
          descricao: "",
          link: ""
        }
      },
      link:"",
      forum: {
        nome: "",
        en_nome: "",
        link: "",
        descricao: "",
        en_descricao: "",
        responsavel: { _id: undefined }
      },

      valido: {
        nome: null,
        descricao: "border-valid",
        link: null
      },
      error: false
    };
  },

  async mounted() {
    if (this.$route.query.forum){ 
      this.forum = await this.$route.query.forum;
      
      this.br.forum.nome      = this.forum.nome;
      this.br.forum.descricao = this.forum.descricao;
      
      this.en.forum.nome      = this.forum.en_nome;
      this.en.forum.descricao = this.forum.en_descricao;
      this.link = this.forum.link;

    }
  },

  validations:{
    link: { required, maxLength: maxLength(2000), url },
    br: {
      forum: {
        nome: { required, maxLength: maxLength(100) },
        descricao: { required, maxLength: maxLength(500) },
      }
    },
    en: {
      forum: {
        nome: { required, maxLength: maxLength(100) },
        descricao: { required, maxLength: maxLength(500) },
      }
    }
  },

  methods: {
    onSubmit() {
      this.resetaCamposValidos();

      this.$v.link.$touch();
      if (this.$i18n.locale == "pt_BR") {
        this.$v.br.forum.$touch();
        if (this.$v.br.forum.$anyError || this.$v.link.$anyError) {
          this.error = true;
          if(this.$v.link.$invalid)
            this.valido.link = !this.$v.link.$invalid;
          if (this.$v.br.forum.nome.$invalid)
            this.valido.nome = !this.$v.br.forum.nome.$invalid;
          if (this.$v.link.$invalid)
            this.valido.link = !this.$v.link.$invalid;
          if (this.$v.br.forum.descricao.$invalid)
            this.valido.descricao = "border-danger";
          return;
        }
      } else {
        this.$v.en.forum.$touch();
        if (this.$v.en.forum.$anyError || this.$v.link.$anyError) {
          this.error = true;
          if (this.$v.en.forum.nome.$invalid)
            this.valido.nome = !this.$v.en.forum.nome.$invalid;
          if (this.$v.link.$invalid)
            this.valido.link = !this.$v.link.$invalid;            
          if (this.$v.en.forum.descricao.$invalid)
            this.valido.descricao = "border-danger";
          return;
        }
      }

      this.resetaCamposValidos();
      this.salvar();
    },

    resetaCamposValidos() {
      this.error = false;

      this.$v.br.forum.$reset();
      this.$v.en.forum.$reset();
      this.$v.link.$reset();

      this.valido.link = null;
      this.valido.nome = null;
      this.valido.descricao = "border-valid";
    },

    async salvar() {
      this.forum.link = this.link;
      if (this.$i18n.locale == "pt_BR") {
        this.forum.nome       = this.br.forum.nome;
        this.forum.descricao  = this.br.forum.descricao;
      } else {
        this.forum.en_nome      = this.en.forum.nome;
        this.forum.en_descricao = this.en.forum.descricao;
      }

      if (this.$route.query.forum && this.forum._id) {
        this.http.put("forum", this.forum._id, this.forum).then(resp => {
          if (resp.message == "Editado com sucesso!")
            this.$router.push("forum_lista");
        });
      } else {
        let pessoa = localStorage.getItem("pessoa");
        if (pessoa) pessoa = JSON.parse(pessoa);
        this.forum.responsavel._id = pessoa._id;

        this.http.post("forum", this.forum).then(resp => {
          if (resp._id) this.$router.push("forum_lista");
        });
      }
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