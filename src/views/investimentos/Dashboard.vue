<template>
  <div>
    <section class="section-shaped my-0">
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
                      tag="a"
                      :href="solucao.link"
                      class="my-4"
                      type="warning text-capitalize"
                      style="font-size: 16px"
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
                      tag="a"
                      :href="botao.link"
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
        { titulo: "Fórum", link: "#/desenvolvimento" },
        { titulo: "Notícias", link: "#/desenvolvimento" },
        { titulo: "Resultados", link: "#/desenvolvimento" }
      ],
      solucoes: [
        {
          titulo: "Ideias",
          descricao:
            "Compartilhe AQUI ações e produtos de combate ao COVID-19 para um mundo melhor.",
          icone: "ni ni-bulb-61",
          botao: "Cadastrar",
          // link: "https://docs.google.com/forms/d/e/1FAIpQLSdtwV7kK4IuRuTO5qQ60IxvWXfE-CwEmQ_a3dlD_2rFlolcQg/viewform"
          link: "#/login"
        },
        {
          titulo: "Soluções",
          descricao:
            "Conheça AQUI as ideias inovadoras que você procura para combater o COVID-19.",
          icone: "ni ni-settings",
          botao: "Buscar",
          link: "#/solucoes_lista"
        },
        {
          titulo: "Apoio",
          descricao:
            "Dê seu apoio AQUI às soluções já existentes para combater o COVID-19",
          icone: "ni ni-money-coins",
          botao: "Contribuir",
          link: "#/dashboard_investimento"
        }
      ]
    };
  },
  methods: {}
};
</script>
