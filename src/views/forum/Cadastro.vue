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
            <h4 class="mb-4 text-warning font-weight-bold">Cadastre seu Fórum</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Nome do Fórum" v-model="forum.nome"></base-input>

                <base-input
                  class="mb-3"
                  placeholder="Link para Entrar no Fórum"
                  v-model="forum.link"
                ></base-input>
                <p
                  class="small"
                >Você deve criar um Fórum no WhatsApp ou Telegram e inserir o link no campo acima.</p>

                <textarea
                  class="form-control mb-3"
                  placeholder="Descrição"
                  v-model="forum.descricao"
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
      forum: {
        nome: "",
        link: "",
        descricao: "",
        responsavel: { _id: "" }
      }
    };
  },

  async mounted() {
    if (this.$route.query.forum) this.forum = await this.$route.query.forum;
  },

  methods: {
    async salvar() {
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
