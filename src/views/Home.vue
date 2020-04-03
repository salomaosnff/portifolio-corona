<template>
  <div>
    <div class="position-relative">
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 bg-gradient-warning shape-skew">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-12">
                <h1 class="display-3 text-white">
                  REVIVE
                  <span>REde de Voluntários Inovadores contra o Virus Embriagado</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="section section-lg pt-lg-0 mt--200">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div
                v-for="(solucao, index) in solucoes"
                :key="solucao + index"
                class="col-lg-4 mb-5"
              >
                <card class="border-0" hover shadow body-classes="py-5">
                  <h5 class="text-default">{{solucao.titulo}}</h5>
                  <p class="description mt-3">{{solucao.descricao}}</p>
                  <div>
                    <badge type="warning" rounded>Preço R$ {{solucao.preco}},00</badge>
                  </div>
                  <div class="btn-wrapper">
                    <base-button
                      class="my-4"
                      type="warning text-capitalize"
                      @click="modal(index)"
                    >Mais</base-button>
                    <base-button
                      tag="a"
                      icon="fa fa-usd"
                      class="my-4 text-warning text-capitalize"
                      type="secondary"
                      href="#/investidor"
                    >Doar</base-button>
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
    <section class="section bg-secondary">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6">
            <div class="card bg-warning shadow border-0">
              <img v-lazy="'img/equipe.jpg'" class="card-img-top" />
              <blockquote class="card-blockquote">
                <h4 class="display-3 font-weight-bold text-white">REVIVE</h4>
                <p
                  class="lead text-italic text-white"
                >REde de Voluntários Inovadores contra o Virus Embriagado</p>
              </blockquote>
            </div>
          </div>
          <div class="col-md-6">
            <div class="pl-md-5">
              <icon name="ni ni-spaceship" class="mb-5" size="lg" type="warning" shadow rounded></icon>

              <h3>É tempo de recomeçar! Reconstruir o presente, olhando para o futuro.</h3>
              <p class="lead">
                Somos uma plataforma integrada e colaborativa, com o objetivo de contribuir para a evolução individual e coletiva a fim de construir uma sociedade do compartilhamento. Aqui você vai encontrar iniciativas, serviços e produtos, para suporte e combate aos problemas advindos da pandemia de coronavirus e para o mundo pós- pandemia.
                Participe! Cadastre suas iniciativas para oferecer soluções, adiquira uma de nossas soluções e/ou invista em alguma das soluções catalogadas. É possível construir um novo futuro, acredite!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section section-shaped my-0 overflow-hidden">
      <div class="shape shape-style-1 bg-gradient-warning">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container py-0">
        <div class="row row-grid align-items-center">
          <div class="col-md-6 order-lg-2 ml-lg-auto">
            <div class="position-relative pl-md-5">
              <img src="img/ill/ill-2.svg" class="img-center img-fluid" />
            </div>
          </div>
          <div class="col-lg-6 order-lg-1">
            <div class="d-flex px-3">
              <div>
                <icon
                  name="ni ni-building"
                  size="lg"
                  class="bg-gradient-white"
                  color="primary"
                  shadow
                  rounded
                ></icon>
              </div>
              <div class="pl-4">
                <h4 class="display-3 text-white">Colabore conosco</h4>
                <p class="text-white">
                  Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                  bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla.
                </p>
              </div>
            </div>
            <card shadow class="shadow-lg--hover mt-5">
              <div class="d-flex px-3">
                <div>
                  <icon name="ni ni-satisfied" gradient="warning" color="white" shadow rounded></icon>
                </div>
                <div class="pl-4">
                  <h5 class="title text-warning">Compartilhadores</h5>
                  <p>
                    de soluções, produtos, serviços e processos, para um mundo melhor, aqui é seu lugar. Sua ideia, produtos, serviços ou processos devem ser cadastradas aqui.
                    Lembre-se que para transformar o mundo precisamos dar o primeiro passo e sua contribuição é fundamental nesta jornada. Venha, acreditamos em você!
                  </p>
                  <a href="#/colaborador" class="text-warning">Cadastre sua ideia</a>
                </div>
              </div>
            </card>
            <card shadow class="shadow-lg--hover mt-5">
              <div class="d-flex px-3">
                <div>
                  <icon name="ni ni-active-40" gradient="warning" color="white" shadow rounded></icon>
                </div>
                <div class="pl-4">
                  <h5 class="title text-warning">Incentivadores / investidores</h5>
                  <p>
                    para um mundo melhor, aqui é seu lugar.
                    Nenhuma mudança acontece de forma espontanea. Por isso precisamos de incentivadores como você. Com sua contribuição,
                    criaremos um mundo em que, unidos, somos maiores que a soma de nós todos. Venha, sua ajuda é fator exponencial!
                  </p>
                </div>
              </div>
            </card>
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
      solucoes: [
        {
          titulo: "Solução 1",
          descricao:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra massa eros, quis pulvinar mi sollicitudin sit amet. Donec sed ante ornare, tempor tortor at, vulputate risus. Ut bibendum eros. ",
          preco: 20
        },
        {
          titulo: "Solução 2",
          descricao:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor mauris nec urna malesuada, vitae sollicitudin arcu tincidunt. Sed cursus mi ut ligula posuere, ut rhoncus urna accumsan. Curabitur interdum. ",
          preco: 0
        },
        {
          titulo: "Solução 3",
          descricao:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pharetra nibh dolor, sit amet egestas dui iaculis finibus. Nam fermentum orci non mauris iaculis finibus. Morbi erat orci, venenatis sed.",
          preco: 45
        },
        {
          titulo: "Solução 4",
          descricao:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut urna velit. Fusce at aliquam erat. Praesent a arcu eget elit porttitor lobortis. Sed aliquam ex non fringilla placerat. Nulla.",
          preco: 450
        },
        {
          titulo: "Solução 5",
          descricao:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in imperdiet nunc. Etiam dapibus, risus fermentum ornare elementum, lacus eros dapibus ligula, a tincidunt nibh nunc at metus. Sed lacinia. ",
          preco: 5
        },
        {
          titulo: "Solução 6",
          descricao:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel eleifend mi. Vivamus sollicitudin est ac odio sodales, vel pretium purus facilisis. Sed sed nisi sed turpis molestie auctor. Aliquam.",
          preco: 0
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
