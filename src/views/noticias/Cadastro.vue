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
            <h4 class="mb-4 text-warning font-weight-bold">Cadastre sua Notícia</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Título" v-model="noticia.titulo"></base-input>

                <base-input class="mb-3" placeholder="Subtítulo" v-model="noticia.subtitulo"></base-input>

                <textarea
                  class="form-control mb-3"
                  placeholder="Notícia"
                  v-model="noticia.descricao"
                ></textarea>

                <div class="text-center">
                  <base-button type="warning" class="mt-4" @click="salvar()">Salvar</base-button>
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
      }
    };
  },

  async mounted() {
    if (this.$route.query.noticias)
      this.noticia = await this.$route.query.noticias;
  },

  methods: {
    async salvar() {
      if (this.$route.query.noticias && this.noticia._id) {
        this.http.put("noticia", this.noticia._id, this.noticia).then(resp => {
          if (resp.message == "Editado com sucesso!")
            this.$router.push("noticias_lista");
        });
      } else {
        let pessoa = localStorage.getItem("pessoa");
        if (pessoa) pessoa = JSON.parse(pessoa);
        this.noticia.responsavel._id = pessoa._id;

        this.http.post("noticia", this.noticia).then(resp => {
          if (resp._id) this.$router.push("noticias_lista");
        });
      }
    }
  }
};
</script>