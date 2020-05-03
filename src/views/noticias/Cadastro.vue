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
            <h4 class="mb-4 text-warning font-weight-bold">{{$t('Noticias.Cadastre sua notícia')}}</h4>
            <template>
              <form role="form">
                <base-alert type="danger" v-show="error">
                  <strong>{{$t('Dados inválidos!')}}</strong>{{$t('Noticias.Verifique os campos destacados!')}}
                </base-alert>
                <base-input
                  class="mb-3"
                  :placeholder="$t('Noticias.Título')"
                  v-model="$v.noticia.titulo.$model"
                  :valid="valido.titulo"
                ></base-input>

                <base-input
                  class="mb-3"
                  :placeholder="$t('Noticias.Subtítulo')"
                  v-model="$v.noticia.subtitulo.$model"
                  :valid="valido.subtitulo"
                ></base-input>

                <textarea
                  class="form-control mb-3 card"
                  :placeholder="$t('Descrição')"
                  v-model="$v.noticia.descricao.$model"
                  :class="valido.descricao"
                ></textarea>

                <div class="text-center">
                  <base-button type="warning" class="mt-4" @click="onSubmit()">{{$t('Noticias.Salvar')}}</base-button>
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      http: new http(),
      noticia: {
        titulo: "",
        subtitulo: "",
        descricao: "",
        data_publicacao: "",
        data_atualizacao: "",
        responsavel: { _id: "" }
      },

      valido: {
        titulo: null,
        subtitulo: null,
        descricao: "border-valid"
      },
      error: false
    };
  },

  async mounted() {
    if (this.$route.query.noticias)
      this.noticia = await this.$route.query.noticias;
  },

  validations: {
    noticia: {
      titulo: { required, maxLength: maxLength(60) },
      subtitulo: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(60)
      },
      descricao: { required, maxLength: maxLength(300) }
    }
  },

  methods: {
    onSubmit() {
      this.resetaCamposValidos();
      this.$v.noticia.$touch();

      if (this.$v.noticia.$anyError) {
        this.error = true;
        if (this.$v.noticia.titulo.$invalid)
          this.valido.titulo = !this.$v.noticia.titulo.$invalid;
        if (this.$v.noticia.subtitulo.$invalid)
          this.valido.subtitulo = !this.$v.noticia.subtitulo.$invalid;
        if (this.$v.noticia.descricao.$invalid)
          this.valido.descricao = "border-danger";
        return;
      }
      // Salvar apos insenção de erros
      this.resetaCamposValidos();
      this.salvar();
    },

    resetaCamposValidos() {
      this.error = false;
      this.valido.titulo = null;
      this.valido.subtitulo = null;
      this.valido.descricao = "border-valid";
    },

    async salvar() {
      if (this.$route.query.noticias && this.noticia._id) {
        this.http.put("noticia", this.noticia._id, this.noticia).then(resp => {
          if (resp.message == "Editado com sucesso!")
            this.$router.push("noticias_lista");
        });
      } else {
        let pessoa = await localStorage.getItem("pessoa");
        if (pessoa) {
          pessoa = await JSON.parse(pessoa);
          this.noticia.responsavel._id = await pessoa._id;
        }
        this.http.post("noticia", this.noticia).then(resp => {
          if (resp._id) this.$router.push("noticias_lista");
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