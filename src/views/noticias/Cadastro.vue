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
                  <strong>{{$t('Noticias.Dados inválidos!')}}</strong>
                  {{$t('Noticias.Verifique os campos destacados!')}}
                </base-alert>
                <base-input
                  v-if="$i18n.locale == 'pt_BR'"
                  class="mb-3"
                  :placeholder="$t('Noticias.Título')"
                  v-model="$v.br.noticia.titulo.$model"
                  :valid="valido.titulo"
                ></base-input>
                <base-input
                  v-else
                  class="mb-3"
                  :placeholder="$t('Noticias.Título')"
                  v-model="$v.en.noticia.titulo.$model"
                  :valid="valido.titulo"
                ></base-input>

                <base-input
                  v-if="$i18n.locale == 'pt_BR'"
                  class="mb-3"
                  :placeholder="$t('Noticias.Subtítulo')"
                  v-model="$v.br.noticia.subtitulo.$model"
                  :valid="valido.subtitulo"
                ></base-input>
                <base-input
                  v-else
                  class="mb-3"
                  :placeholder="$t('Noticias.Subtítulo')"
                  v-model="$v.en.noticia.subtitulo.$model"
                  :valid="valido.subtitulo"
                ></base-input>

                <textarea
                  v-if="$i18n.locale == 'pt_BR'"
                  class="form-control mb-3 card"
                  :placeholder="$t('Descrição')"
                  v-model="$v.br.noticia.descricao.$model"
                  :class="valido.descricao"
                ></textarea>
                <textarea
                  v-else
                  class="form-control mb-3 card"
                  :placeholder="$t('Descrição')"
                  v-model="$v.en.noticia.descricao.$model"
                  :class="valido.descricao"
                ></textarea>

                <div class="text-center">
                  <base-button
                    type="warning"
                    class="mt-4"
                    @click="onSubmit()"
                  >{{$t('Noticias.Salvar')}}</base-button>
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
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      http: new http(),
      br: {
        noticia:{
          titulo: "",
          subtitulo: "",
          descricao: "",
        }
      },
      en: {
        noticia: {
          titulo: "",
          subtitulo: "",
          descricao: "",
        }
      },
      noticia: {
        titulo: "",
        subtitulo: "",
        descricao: "",
        data_publicacao: Date,
        data_atualizacao: Date,
        responsavel: { _id: "" },
        en_titulo: "",
        en_subtitulo: "",
        en_descricao: ""
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
    if (this.$route.query.noticias) {
      this.noticia = await this.$route.query.noticias;

      this.br.noticia.titulo     = this.noticia.titulo;
      this.br.noticia.subtitulo  = this.noticia.subtitulo;
      this.br.noticia.descricao  = this.noticia.descricao;
      
      this.en.noticia.titulo     = this.noticia.en_titulo;
      this.en.noticia.subtitulo  = this.noticia.en_subtitulo;
      this.en.noticia.descricao  = this.noticia.en_descricao;      
    }
  },

  validations: {
    br: {
      noticia:{
        titulo: {
          required,
          maxLength: maxLength(100)            
        },
        subtitulo: { 
          required,
          maxLength: maxLength(200)            
          },
        descricao: { required, maxLength: maxLength(500) }
      }
    },
    en: {
      noticia: {
        titulo: {
          required,
          maxLength: maxLength(100)            
        },
        subtitulo: { 
          required,
          maxLength: maxLength(200)            
          },
        descricao: { required, maxLength: maxLength(500) }
      }
    }
  },

  methods: {
    onSubmit() {
      this.resetaCamposValidos();
      if (this.$i18n.locale == "pt_BR") {
        this.$v.br.noticia.$touch();
        if (this.$v.br.noticia.$anyError) {
          this.error = true;
          if (this.$v.br.noticia.titulo.$invalid)
            this.valido.titulo = !this.$v.br.noticia.titulo.$invalid;
          if (this.$v.br.noticia.subtitulo.$invalid)
            this.valido.subtitulo = !this.$v.br.noticia.subtitulo.$invalid;
          if (this.$v.br.noticia.descricao.$invalid)
            this.valido.descricao = "border-danger";
          return;
        }
      } else {
        this.$v.en.noticia.$touch();
        if (this.$v.en.noticia.$anyError) {
          this.error = true;
          if (this.$v.en.noticia.titulo.$invalid)
            this.valido.titulo = !this.$v.en.noticia.titulo.$invalid;
          if (this.$v.en.noticia.subtitulo.$invalid)
            this.valido.subtitulo = !this.$v.en.noticia.subtitulo.$invalid;
          if (this.$v.en.noticia.descricao.$invalid)
            this.valido.descricao = "border-danger";
          return;
        }        
      }
      this.resetaCamposValidos();
      this.salvar();
    },

    resetaCamposValidos() {
      this.error = false;

      this.$v.br.noticia.$reset();
      this.$v.en.noticia.$reset();

      this.valido.titulo = null;
      this.valido.subtitulo = null;
      this.valido.descricao = "border-valid";
    },

    async salvar() {
      if (this.$i18n.locale == "pt_BR") {
        this.noticia.titulo     = this.br.noticia.titulo;
        this.noticia.subtitulo  = this.br.noticia.subtitulo;
        this.noticia.descricao  = this.br.noticia.descricao;
      } else {
        this.noticia.en_titulo    = this.en.noticia.titulo;
        this.noticia.en_subtitulo = this.en.noticia.subtitulo;
        this.noticia.en_descricao = this.en.noticia.descricao;
      }
      if (this.$route.query.noticias && this.noticias._id) {
        this.noticia.data_atualizacao = Date.now();
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
        this.noticia.data_publicacao = Date.now();
        this.noticia.data_atualizacao = Date.now();
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