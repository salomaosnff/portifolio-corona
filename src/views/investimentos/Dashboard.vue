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
        <div class="col-md-2">
          <base-button
            icon="ni ni-bold-left"
            class="mb-5 text-warning text-capitalize"
            type="white"
            @click="$router.go(-1)"
          >Voltar</base-button>
        </div>
      </div>

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
          </div>
        </div>
      </div>
    </div>
  </section>
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
          titulo: "Fundo REVIVE",
          descricao: "Colabore com o Fundo REVIVE.",
          icone: "ni ni-money-coins",
          botao: "Doar",
          link: "#/desenvolvimento"
        },
        {
          titulo: "Apoio Financeiro",
          descricao: "Apoie, financeiramente, um projeto especifico.",
          icone: "ni ni-money-coins",
          botao: "Apoiar",
          link: "#/solucoes_lista"
        },
        {
          titulo: "Criar Parceria",
          descricao: "Crie parceria com um projeto especifico.",
          icone: "ni ni-building",
          botao: "Criar",
          link: "#/desenvolvimento"
        }
      ]
    };
  },
  methods: {}
};
</script>
