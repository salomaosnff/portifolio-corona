<template>
  <div>
    <section class="section-shaped my-0">
      <div class="row p-5">
        <div class="col-lg-6">
          <img
            style="height: 90px; background-color: #008ecd; border-radius: 20px; padding: 15px"
            :src="'img/logo_' + $i18n.locale + '.png'"
            alt="logo"
          />
          <img
            style="height: 80px; background-color: #fff; border-radius: 20px; padding: 10px; margin-left: 20px"
            src="img/home/citinova.jpg"
            alt="logo"
          />
          <img
            style="height: 80px; background-color: #fff; border-radius: 20px; padding: 10px; margin-left: 20px"
            src="img/home/iracema.png"
            alt="logo"
          />
        </div>

        <div class="col-lg-6 my-4 pr-4 text-right">
          <ul class="row" style="justify-content: right; align-itens: center">
            <a class="menu-text" href="#/colaborador">{{$t('Sobre')}}</a>

            <a class="menu-text" href="#/noticias_lista">{{$t('Notícias')}}</a>

            <a class="menu-text" href="#/investidor">{{$t('Fale Conosco')}}</a>
            <img
              v-for="(idioma) in idiomas"
              :key="idioma"
              :class="[$i18n.locale == idioma? 'flag-selected' : '', 'flag']"
              :src="'img/home/' + idioma + '.png'"
              @click="$i18n.locale = idioma"
            />
          </ul>
        </div>
      </div>

      <div class="shape shape-style-1 shape-skew">
        <img
          v-lazy="'img/equipe.jpg'"
          class="card-img-top"
          style="margin-top: -100px; height: 800px;"
        />
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="p-5">
        <div class="row pt-5">
          <div class="col-lg-6">
            <div class="col-lg-6">
              <div class="row">
                <div class="col-lg-6">
                  <base-button
                    type="warning text-normal"
                    style="font-size: 16px"
                    @click="modal_covid = !modal_covid"
                  >{{$t('Home.Estatísticas do COVID-19')}}</base-button>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <base-button
                    class="mt-4"
                    href="http://lapisco.fortaleza.ifce.edu.br/covid19"
                    type="warning text-normal"
                    style="font-size: 16px"
                    tag="a"
                    target="_blank"
                  >{{$t('Home.Monitor do COVID-19')}}</base-button>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <base-button
                    class="mt-4"
                    href="http://lar.ifce.edu.br:5000"
                    type="warning text-normal"
                    style="font-size: 16px"
                    tag="a"
                    target="_blank"
                  >{{$t('Home.Monitor de Fake News')}}</base-button>
                </div>
              </div>
              <br />
            </div>

            <modal
              v-if="noticias_corona"
              :show.sync="modal_covid"
              gradient="warning"
              modal-classes="modal-warning modal-dialog-centered"
            >
              <h4 class="modal-title" slot="header">{{$t('Home.Estatísticas do COVID-19')}} (Brasil)</h4>
              <div class="col" style="justify-content: center">
                <div class="row" style="justify-content: center">
                  <div class="m-4" v-if="noticias_corona.posicao">
                    <p class="text-white">Ranking</p>
                    <h4 class="text-white">{{noticias_corona.posicao}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.casos">
                    <p class="text-white">{{$t('Casos')}}</p>
                    <h4 class="text-white">{{noticias_corona.casos}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.curas">
                    <p class="text-white">{{$t('Curas')}}</p>
                    <h4 class="text-white">{{noticias_corona.curas}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.mortes">
                    <p class="text-white">{{$t('Mortes')}}</p>
                    <h4 class="text-white">{{noticias_corona.mortes}}</h4>
                  </div>
                </div>
              </div>

              <div class="col" style="justify-content: center">
                <div class="row" style="justify-content: center">
                  <p
                    class="text-white"
                    style="align-self: center"
                  >. . . . . . . {{$t('Hoje')}} . . . . . . .</p>
                </div>

                <div class="row" style="justify-content: center">
                  <div class="m-4" v-if="noticias_corona.novos_casos_hoje">
                    <p class="text-white">{{$t('Novos Casos')}}</p>
                    <h4 class="text-white">{{noticias_corona.novos_casos_hoje}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.novas_mortes_hoje">
                    <p class="text-white">{{$t('Novas Mortes')}}</p>
                    <h4 class="text-white">{{noticias_corona.novas_mortes_hoje}}</h4>
                  </div>
                </div>

                <div class="row" style="justify-content: center">
                  <div class="m-4" v-if="noticias_corona.casos_ativos">
                    <p class="text-white">{{$t('Casos Ativos')}}</p>
                    <h4 class="text-white">{{noticias_corona.casos_ativos}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.casos_graves">
                    <p class="text-white">{{$t('Casos Graves')}}</p>
                    <h4 class="text-white">{{noticias_corona.casos_graves}}</h4>
                  </div>
                </div>
              </div>
              <p
                class="small text-right mr-5 text-thin text-white"
              >{{$t('Fonte')}}: {{noticias_corona.fonte}}</p>
              <template slot="footer">
                <base-button
                  type="link"
                  text-color="white"
                  class="text-normal"
                  @click="modal_covid = false"
                >{{$t('Fechar')}}</base-button>
              </template>
            </modal>
          </div>

          <div class="col-lg-6">
            <card style="background-color: #fb8640ee" shadow>
              <h4 class="m-2 text-white">{{$t('Home.Introdução.Título')}}</h4>
              <h5 class="m-2 text-thin text-white">{{$t('Home.Introdução.Descrição')}}</h5>
              <h5 class="m-2 text-thin text-white">{{$t('Home.Introdução.Subdescrição')}}</h5>
            </card>
          </div>
        </div>
      </div>
    </section>

    <div class="container pt-5">
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

    <section class="section pt-0">
      <h2 class="text-center mt-0">Realização</h2>
      <hr class="listinha my-1" />
      <div class="row p-4">
        <div class="col-sm cards__images">
          <img
            alt="Rounded image"
            class="img-fluid rounded"
            style="width: 300px; margin: 14px; margin-left: 30px"
            src="img/iracema.jpg"
            lazy="loaded"
          />
        </div>
        <div class="col-sm cards__images">
          <img
            class="img-fluid rounded"
            style="width: 160px; margin: 30px"
            src="img/lar.png"
            lazy="loaded"
          />
        </div>
        <div class="col-sm cards__images">
          <img
            class="img-fluid rounded"
            style="width: 160px; margin: 30px"
            src="img/ppgcc.png"
            lazy="loaded"
          />
        </div>
        <div class="col-sm cards__images">
          <img
            alt="Rounded image"
            class="img-fluid rounded"
            style="width: 190px; margin: 30px; margin-right: 33px"
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
import http from "../services/http";
export default {
  components: {
    Modal
  },
  data() {
    return {
      http: new http(),
      carousel: 0,
      carousels: ["COVID-19", "Introdução"],
      noticias_corona: {},
      idiomas: ["pt_BR", "en"],
      modal_covid: false,
      botoes: [
        { link: "login", props_to_link: "forum_lista" },
        { link: "login", props_to_link: "noticias_lista" },
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
  async mounted() {
    await this.corona_noticias();
    // this.change_carousel(0);
  },
  methods: {
    corona_noticias() {
      this.http
        .get("corona_noticia")
        .then(async data => {
          this.noticias_corona = await data;
          console.log(this.noticias_corona);
        })
        .catch(err => {
          console.error(err);
        });
    },

    change_carousel: async function(n) {
      this.carousel = n;
      var that = this;
      setTimeout(function() {
        n = n + 1;
        if (n > that.carousels.length - 1) n = 0;
        console.log(n);
        that.change_carousel(n);
      }, 5000);
    }
  }
};
</script>

<style scoped>
hr.listinha {
  max-width: 3.25rem;
  border-width: 0.2rem;
  border-color: #fb8640ee;
}

.cards__images {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 1rem;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
