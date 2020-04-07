<template>
  <div>
    <section class="section-shaped my-0">
      <base-nav class="navbar-main" transparent type effect="light" expand>
        <img
          style="width: 300px; margin-left: 30px; margin-top: 30px; background-color: #008ecd; opacity: .8;
        border-radius: 20px; padding: 15px"
          src="img/logo.png"
          alt="logo"
        />
      </base-nav>
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
        >É tempo de recomeçar! Reconstruir o presente, olhando para o futuro. Somos uma plataforma integrada e colaborativa, com o objetivo de contribuir para a evolução individual e coletiva a fim de construir uma sociedade do compartilhamento.</h5>
      </div>
    </section>
    <section gradient="warning" class="section section-lg pt-lg-0 mt--200">
      <div style="margin-top: -100px" class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div
                v-for="(solucao, index) in solucoes"
                :key="solucao + index"
                class="col-lg-4 mb-5"
              >
                <card class="border-0" shadow body-classes="py-5" style="border-radius: 20px">
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
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section>
      <h1>TEST Carousel</h1>
      <div>
        <b-carousel id="carousel1" controls indicators>
          <b-carousel-slide img-src="/img/theme/img-1-1200x1000.jpg"></b-carousel-slide>
          <b-carousel-slide img-src="/img/theme/img-2-1200x1000.jpg"></b-carousel-slide>
        </b-carousel>
      </div>
    </section>-->
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
// import BaseNav from "@/components/BaseNav.vue";
// import { BCarousel } from "bootstrap-vue";
// import { BCarouselSlide } from "bootstrap-vue";
export default {
  components: {
    Modal
    // BCarousel,
    // BCarouselSlide,
    // BaseNav
  },
  data() {
    return {
      index_modal_info: 0,
      modal_info: false,
      solucoes: [
        {
          titulo: "Ideias",
          descricao:
            "Compartilhe soluções inovadoras e produtos para um mundo melhor. Sua ideia deve ser cadastrada aqui.",
          icone: "ni ni-bulb-61",
          botao: "Cadastrar",
          link: "#/solucoes_cadastro"
        },
        {
          titulo: "Soluções",
          descricao:
            "Conheça as ideias inovadoras já cadastradas e encontre as soluções para tornar o mundo melhor.",
          icone: "ni ni-settings",
          botao: "Buscar",
          link: "#/ideias_lista"
        },
        {
          titulo: "Invista",
          descricao:
            "Nenhuma mudança acontece de forma espontânea. Por isso precisamos de incentivadores como você.",
          icone: "ni ni-money-coins",
          botao: "Investir",
          link: "#/colaborador"
        }
      ],
      cores: ["default", "primary", "info", "success", "warning", "danger"]
    };
  },
  methods: {}
};
</script>
