<template>
  <div>
    <section class="section-shaped my-0">
      <img
        style="width: 300px; margin-left: 30px; margin-top: 30px; background-color: #008ecd; opacity: .8;
      border-radius: 20px; padding: 15px"
        src="img/logo.png"
        alt="logo"
      />
      <div class="shape shape-style-1 bg-gradient-warning shape-skew">
        <img v-lazy="'img/equipe.jpg'" class="card-img-top" style="margin-top: -200px" />
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container shape-container text-right">
        <h5
          style="background-color: #fb8540; border-radius: 20px; 
            padding: 15px; opacity: .9; margin-left: 400px; margin-top: -200px"
          class="text-white"
        >
          É TEMPO DE RECOMEÇAR !
          <h5 class="text-white text-justify mt-3">
            Esse "VÍRUS Embriagado" não é mais forte do que um País sóbrio e solidário. Somos uma plataforma integrada e colaborativa de AÇÕES e PROJETOS de combate ao COVID-19.
            Cadastre aqui o seu projeto (IDEIAS). Conheça aqui os projetos existentes (SOLUÇÕES). Dê seu apoio (APOIO).
          </h5>
        </h5>
      </div>
    </section>
    <section gradient="warning" class="section section-lg pt-lg-0 mt--200">
      <div style="margin-top: -100px" class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div v-for="(solucao, index) in solucoes" :key="index" class="col-lg-4 mb-5">
                <card class="border-0" shadow body-classes="py-5">
                  <div class="row" style="margin-left: 1px">
                    <icon :name="solucao.icone" gradient="warning" color="white" shadow rounded></icon>
                    <h4
                      style="margin-top: 10px; margin-left: 20px"
                      class="text-default"
                    >{{solucao.titulo}}</h4>
                  </div>
                  <p class="mt-3">{{solucao.descricao}}</p>
                  <div class="text-center">
                    <base-button
                      class="my-4"
                      type="warning text-capitalize"
                      style="font-size: 16px"
                      @click="$router.push({ name: solucao.link, 
                      query: { rota: solucao.props_to_link }})"
                    >{{solucao.botao}}</base-button>
                  </div>
                </card>
              </div>
              <div class="col-lg-4 mb-5">
                <card class="border-0" shadow body-classes="py-5">
                  <div class="row" style="margin-left: 1px">
                    <icon name="ni ni-books" gradient="warning" color="white" shadow rounded></icon>
                    <h4 style="margin-top: 10px; margin-left: 20px" class="text-default">Outros</h4>
                  </div>
                  <div v-for="(botao, index) in botoes" :key="index" class="text-center">
                    <base-button
                      @click="$router.push({ name: botao.link, 
                      query: { rota: botao.props_to_link }})"
                      class="mt-4"
                      type="warning text-capitalize"
                      style="font-size: 16px"
                    >{{botao.titulo}}</base-button>
                  </div>
                </card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-4 text-right mt-5">
          <img
            alt="Rounded image"
            class="img-fluid rounded ml-5"
            style="width: 400px;"
            src="img/iracema.jpg"
            lazy="loaded"
          />
        </div>
        <div class="col-sm-8 text-right mt-5 pt-5">
          <img
            class="img-fluid rounded"
            style="width: 160px; margin: 30px"
            src="img/lar.png"
            lazy="loaded"
          />

          <img
            class="img-fluid rounded"
            style="width: 160px; margin: 30px"
            src="img/ppgcc.png"
            lazy="loaded"
          />

          <img
            alt="Rounded image"
            class="img-fluid rounded"
            style="width: 160px; margin: 30px; margin-right: 90px"
            src="img/ifce.png"
            lazy="loaded"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal
  },
  data() {
    return {
      index_modal_info: 0,
      modal_info: false,
      botoes: [
        { titulo: "Fórum", link: "login", props_to_link: "forum_lista" },
        { titulo: "Notícias", link: "desenvolvimento", props_to_link: "" },
        { titulo: "Resultados", link: "desenvolvimento", props_to_link: "" }
      ],
      solucoes: [
        {
          titulo: "Ideias",
          descricao:
            "Compartilhe AQUI ações e produtos de combate ao COVID-19 para um mundo melhor.",
          icone: "ni ni-bulb-61",
          botao: "Cadastrar",
          link: "login",
          props_to_link: "usuario_solucoes_lista"
        },
        {
          titulo: "Soluções",
          descricao:
            "Conheça AQUI as ideias inovadoras que você procura para combater o COVID-19.",
          icone: "ni ni-settings",
          botao: "Buscar",
          link: "solucoes_lista",
          props_to_link: ""
        },
        {
          titulo: "Apoio",
          descricao:
            "Dê seu apoio AQUI às soluções já existentes para combater o COVID-19",
          icone: "ni ni-money-coins",
          botao: "Contribuir",
          link: "dashboard_investimento",
          props_to_link: ""
        }
      ]
    };
  },
  methods: {}
};
</script>
