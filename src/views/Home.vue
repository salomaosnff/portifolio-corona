<template>
  <div>
    <section class="section-shaped my-0">
      <div class="row">
        <div class="col-lg-6">
          <img
            style="width: 300px; margin-left: 30px; margin-top: 30px; background-color: #008ecd; opacity: .8;
      border-radius: 20px; padding: 15px"
            src="img/logo.png"
            alt="logo"
          />
          <img
            style="height: 100px; margin-left: 30px; margin-top: 30px; background-color: #fff; opacity: .8;
      border-radius: 20px; padding: 15px"
            src="img/if.png"
            alt="logo"
          />
        </div>
        <div class="col-lg-6 text-right" style="padding-right: 30px">
          <img
            v-for="(idioma) in idiomas"
            :key="idioma"
            :class="[$i18n.locale == idioma? 'flag-selected' : '', 'flag']"
            :src="'img/home/' + idioma + '.png'"
            @click="$i18n.locale = idioma"
          />
        </div>
      </div>

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
          {{$t('Home.Introdução.Título')}}
          <h5 class="text-white text-justify mt-3">{{$t('Home.Introdução.Descrição')}}</h5>
        </h5>
      </div>
    </section>
    <section gradient="warning" class="section section-lg pt-lg-0 mt--200">
      <div style="margin-top: -100px" class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div v-for="(card, index) in cards" :key="index" class="col-lg-4 mb-5">
                <card class="border-0" shadow body-classes="py-5">
                  <div class="row" style="margin-left: 1px">
                    <icon :name="card.icone" gradient="warning" color="white" shadow rounded></icon>
                    <h4
                      style="margin-top: 10px; margin-left: 20px"
                      class="text-default"
                    >{{$t('Home.Cards[' + index + '].Título')}}</h4>
                  </div>
                  <p class="mt-3">{{$t('Home.Cards[' + index + '].Descrição')}}</p>
                  <div class="text-center">
                    <base-button
                      class="my-4"
                      type="warning text-capitalize"
                      style="font-size: 16px"
                      @click="$router.push({ name: card.link, 
                      query: { rota: card.props_to_link }})"
                    >{{$t('Home.Cards[' + index + '].Botão')}}</base-button>
                  </div>
                </card>
              </div>
              <div class="col-lg-4 mb-5">
                <card class="border-0" shadow body-classes="py-5">
                  <div class="row" style="margin-left: 1px">
                    <icon name="ni ni-books" gradient="warning" color="white" shadow rounded></icon>
                    <h4
                      style="margin-top: 10px; margin-left: 20px"
                      class="text-default"
                    >{{$t('Outros')}}</h4>
                  </div>
                  <div v-for="(botao, index) in botoes" :key="index" class="text-center">
                    <base-button
                      @click="$router.push({ name: botao.link, 
                      query: { rota: botao.props_to_link }})"
                      class="mt-4"
                      type="warning text-capitalize"
                      style="font-size: 16px"
                    >{{$t('Home.Outros['+index+'].Título')}}</base-button>
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
      idiomas: ["pt_BR", "en_US"],
      index_modal_info: 0,
      modal_info: false,
      botoes: [
        { link: "login", props_to_link: "forum_lista" },
        { link: "desenvolvimento", props_to_link: "" },
        { link: "desenvolvimento", props_to_link: "" }
        // { titulo: "Teste", link: "test", props_to_link: ""}
      ],
      cards: [
        {
          icone: "ni ni-bulb-61",
          link: "login",
          props_to_link: "usuario_solucoes_lista"
        },
        {
          icone: "ni ni-settings",
          link: "solucoes_lista",
          props_to_link: ""
        },
        {
          icone: "ni ni-money-coins",
          link: "dashboard_investimento",
          props_to_link: ""
        }
      ]
    };
  },
  methods: {}
};
</script>
