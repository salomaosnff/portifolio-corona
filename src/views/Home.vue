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
                <card class="border-0" hover shadow body-classes="py-5" style="border-radius: 20px">
                  <div class="row" style="margin-left: 1px">
                    <icon :name="solucao.icone" gradient="warning" color="white" shadow rounded></icon>
                    <h5
                      style="margin-top: 10px; margin-left: 20px"
                      class="text-default"
                    >{{solucao.titulo}}</h5>
                  </div>
                  <p class="description mt-3">{{solucao.descricao}}</p>
                  <div class="text-center">
                    <base-button
                      class="my-4"
                      type="warning text-capitalize"
                      @click="modal(index)"
                    >{{solucao.botao}}</base-button>
                  </div>
                </card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <modal
        :show.sync="modal_info"
        gradient="warning"
        modal-classes="modal-danger modal-dialog-centered"
      >
        <h4
          slot="header"
          class="modal-title"
          id="modal-title-notification"
        >{{solucoes[index_modal_info].titulo}}</h4>

        <div>
          <h1 class="heading text-capitalize">De quê se trata?</h1>
          <p class="mt-4">{{solucoes[index_modal_info].descricao}}</p>

          <h1 class="mt-4 heading text-capitalize">Como usar / adquirir?</h1>
          <p class="mt-4">{{solucoes[index_modal_info].descricao}}</p>

          <h1 class="mt-4 heading text-capitalize">Contactar proprietário</h1>
          <p class="mt-4">Email: funlano@domain.com</p>
          <p>Número: (88) 99861-2581</p>
        </div>

        <template slot="footer">
          <base-button type="white">R$ {{solucoes[index_modal_info].preco}},00</base-button>
          <base-button
            tag="a"
            icon="fa fa-usd"
            type="link"
            href="#/investidor"
            text-color="white"
            class="ml-auto text-capitalize"
            @click="modal_info = false"
          >Doar</base-button>
        </template>
      </modal>
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
      solucoes: [
        {
          titulo: "Ideias",
          descricao:
            "Compartilhe soluções inovadoras e produtos para um mundo melhor. Sua ideia deve ser cadastrada aqui.",
          icone: "ni ni-bulb-61",
          botao: "Cadastrar"
        },
        {
          titulo: "Soluções",
          descricao:
            "Conheça as ideias inovadoras já cadastradas e encontre as soluções para tornar o mundo melhor.",
          icone: "ni ni-settings",
          botao: "Buscar"
        },
        {
          titulo: "Invista",
          descricao:
            "Nenhuma mudança acontece de forma espontânea. Por isso precisamos de incentivadores como você.",
          icone: "ni ni-money-coins",
          botao: "Investir"
        }
      ],
      cores: ["default", "primary", "info", "success", "warning", "danger"]
    };
  },
  methods: {
    modal(i) {
      this.index_modal_info = i;
      this.modal_info = !this.modal_info;
    }
  }
};
</script>
