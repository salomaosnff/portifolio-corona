<template>
  <div>
    <section class="section-shaped my-0">
      <div class="row p-5">
        <div class="col-lg-6">
          <img id="logo" :src="'img/logo_' + $i18n.locale + '.png'" />
        </div>

        <div class="col-lg-6 my-4 pr-4">
          <ul class="row" style="align-itens: center;">
            <a class="menu-text" href="#/desenvolvimento">
              {{$t('Sobre o')}}
              <br />REVIVE
            </a>

            <a v-if="$i18n.locale == 'pt_BR'" class="menu-text" href="#/noticias_lista">
              Notícias
              <br />COVID-19
            </a>
            <a v-else class="menu-text" href="#/noticias_lista">
              COVID-19
              <br />News
            </a>

            <a v-if="$i18n.locale == 'pt_BR'" class="menu-text" href="#/desenvolvimento">
              Fale com
              <br />A GENTE
            </a>
            <a v-else class="menu-text" href="#/desenvolvimento">
              Contact
              <br />US
            </a>
            <img
              v-for="(idioma) in idiomas"
              :key="idioma"
              :class="[$i18n.locale == idioma? 'flag-selected' : '', 'flag mt-2']"
              :src="'img/home/' + idioma + '.png'"
              @click="$i18n.locale = idioma"
            />
          </ul>
        </div>
      </div>

      <div class="shape shape-style-1">
        <img
          v-lazy="'img/equipe.jpg'"
          class="card-img-top"
          style="margin-top: -100px; height: 800px;"
        />
      </div>

      <div class="p-5">
        <div class="row pt-5">
          <div class="col-lg-6">
            <div class="col-lg-6">
              <div class="row">
                <base-button
                  href="http://lapisco.fortaleza.ifce.edu.br/covid19"
                  type="warning text-normal"
                  style="font-size: 16px"
                  tag="a"
                  target="_blank"
                >{{$t('Home.Monitor do COVID-19')}}</base-button>

                <base-button
                  class="mt-4"
                  href="http://www.fiquenolar.ifce.edu.br/#/"
                  type="warning text-normal"
                  style="font-size: 16px"
                  tag="a"
                  target="_blank"
                >FiqueNoLar</base-button>

                <!-- <base-button
                  type="warning text-normal"
                  style="font-size: 16px"
                  @click="modal_covid = !modal_covid"
                >{{$t('Home.Estatísticas do COVID-19')}}</base-button>-->

                <!-- <base-button
                  class="mt-4"
                  href="http://lar.ifce.edu.br:5000"
                  type="warning text-normal"
                  style="font-size: 16px"
                  tag="a"
                  target="_blank"
                >{{$t('Home.Monitor de Fake News')}}</base-button>-->
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

          <div class="col-lg-5 text-center">
            <card style="background-color: #fb8640ee;" shadow>
              <h4
                v-if="$i18n.locale == 'pt_BR'"
                class="m-2 text-white font-weight-bold"
                style="line-height: 150%"
              >
                REVIVE, um ponto de encontro de
                <br />PESSOAS, IDEIAS e SOLUÇÕES
                <br />no enfrentamento ao CORONAVÍRUS
              </h4>
              <h4 v-else class="m-2 text-white font-weight-bold" style="line-height: 150%">
                REVIVE, a meeting point for
                <br />PEOPLE, IDEAS and SOLUTIONS
                <br />in the fight against CORONAVIRUS
              </h4>
            </card>
          </div>
        </div>
      </div>
    </section>

    <div class="row" style="background-color: #00000000">
      <div class="col-lg-6" style="background-color: #00000000">
        <img class="logos ml-5" src="img/if.png" />
      </div>
      <div class="col-lg-6" style="background-color: #00000000">
        <img class="logos ml-4 mr-5" src="img/home/iracema.png" />
        <img class="logos ml-5" src="img/home/citinova.jpg" />
        <img class="logos ml-5" src="img/estado.jpg" />
        <div class="text-right pt-4 pr-5" style="background-color: #00000000">
          <p
            style="background-color: #00000000"
            class="text-white"
          >Designed by rawpixel.com / Freepik</p>
        </div>
      </div>
    </div>

    <section class="container" style="margin-top: 90px">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="row row-grid">
            <div v-for="(card, index) in cards" :key="index" class="col-lg-4 mb-5">
              <card class="border-0 text-center" shadow body-classes="py-5">
                <div class="row" style="margin-left: 1px">
                  <icon :name="card.icone" gradient="warning" color="white" shadow rounded></icon>
                  <h4
                    style="margin-top: 10px; margin-left: 20px"
                    class="text-default"
                  >{{$t('Home.Cards[' + index + '].Título')}}</h4>
                </div>
                <p v-if="index < 3" class="mt-3">{{$t('Home.Cards[' + index + '].Descrição')}}</p>
                <div class="text-center">
                  <base-button
                    class="mt-4"
                    type="warning text-normal"
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
                  <icon name="ni ni-chat-round" gradient="warning" color="white" shadow rounded></icon>
                  <h4
                    v-show="$i18n.locale == 'pt_BR'"
                    style="margin-top: 10px; margin-left: 20px"
                    class="text-default"
                  >Fóruns de</h4>
                  <h4
                    v-show="$i18n.locale == 'pt_BR'"
                    style="margin-left: 66px"
                    class="text-default"
                  >Discussão</h4>
                  <h4
                    v-show="$i18n.locale == 'en'"
                    style="margin-top: 10px; margin-left: 20px"
                    class="text-default"
                  >Discussion</h4>
                  <h4
                    v-show="$i18n.locale == 'en'"
                    style="margin-left: 66px"
                    class="text-default"
                  >Forums</h4>
                </div>
                <div class="text-center">
                  <img
                    style="height: 160px; margin: 5px; border-radius: 20px"
                    src="img/forum.jpg"
                    lazy="loaded"
                    alt="Smiley face"
                  />
                  <base-button
                    class="mt-4"
                    type="warning text-normal"
                    style="font-size: 16px"
                    @click="$router.push({ name: 'login', 
                      query: { rota: 'forum_lista' }})"
                  >{{$t('Entrar')}}</base-button>
                </div>
              </card>
            </div>
            <div class="col-lg-4 mb-5">
              <card class="border-0" shadow body-classes="py-5">
                <div class="row" style="margin-left: 1px">
                  <icon
                    name="ni ni-settings-gear-65"
                    gradient="warning"
                    color="white"
                    shadow
                    rounded
                  ></icon>
                  <h4
                    v-show="$i18n.locale == 'pt_BR'"
                    style="margin-top: 10px; margin-left: 20px"
                    class="text-default"
                  >Aconselhamento</h4>
                  <h4
                    v-show="$i18n.locale == 'pt_BR'"
                    style="margin-left: 66px"
                    class="text-default"
                  >Tecnológico</h4>
                  <h4
                    v-show="$i18n.locale == 'en'"
                    style="margin-top: 10px; margin-left: 20px"
                    class="text-default"
                  >Technological</h4>
                  <h4
                    v-show="$i18n.locale == 'en'"
                    style="margin-left: 66px"
                    class="text-default"
                  >Advice</h4>
                </div>
                <div class="text-center">
                  <img
                    style="height: 160px; margin: 5px; border-radius: 20px"
                    src="img/tecnologico.jpg"
                    lazy="loaded"
                  />
                  <base-button
                    class="mt-4"
                    href="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdBTiVxsNkxH6nX4DOASHYZqeITv6XBWBccb_-tZr0QJBxDeA/formResponse"
                    type="warning text-normal"
                    style="font-size: 16px"
                    tag="a"
                    target="_blank"
                  >{{$t('Solicitar')}}</base-button>
                </div>
              </card>
            </div>
            <div class="col-lg-4 mb-5">
              <card class="border-0" shadow body-classes="py-5">
                <div class="row" style="margin-left: 1px">
                  <icon name="ni ni-money-coins" gradient="warning" color="white" shadow rounded></icon>
                  <h4
                    v-show="$i18n.locale == 'pt_BR'"
                    style="margin-top: 10px; margin-left: 20px"
                    class="text-default"
                  >Aconselhamento</h4>
                  <h4
                    v-show="$i18n.locale == 'pt_BR'"
                    style="margin-left: 66px"
                    class="text-default"
                  >Econômico</h4>
                  <h4
                    v-show="$i18n.locale == 'en'"
                    style="margin-top: 10px; margin-left: 20px"
                    class="text-default"
                  >Economic</h4>
                  <h4
                    v-show="$i18n.locale == 'en'"
                    style="margin-left: 66px"
                    class="text-default"
                  >Advice</h4>
                </div>
                <div class="text-center">
                  <img
                    style="height: 160px; margin: 5px; border-radius: 20px"
                    src="img/economico.jpg"
                    lazy="loaded"
                  />
                  <base-button
                    class="mt-4"
                    href="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdBTiVxsNkxH6nX4DOASHYZqeITv6XBWBccb_-tZr0QJBxDeA/formResponse"
                    type="warning text-normal"
                    style="font-size: 16px"
                    tag="a"
                    target="_blank"
                  >{{$t('Solicitar')}}</base-button>
                </div>
              </card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <h2 class="text-center mt-5">{{$t('Realização')}}</h2>
    <hr class="listinha mt-4" />
    <section class="text-center m-5">
      <img class="mx-5" style="height: 60px" src="img/lar.png" lazy="loaded" />
      <img class="mx-5" style="height: 60px" src="img/ifce.png" lazy="loaded" />
    </section>

    <h2 class="text-center mt-0">{{$t('Promoção')}}</h2>
    <hr class="listinha mt-4" />
    <section class="text-center m-5">
      <img class="mx-5" style="height: 130px" src="img/sedet.png" lazy="loaded" />
      <img class="mx-5" style="height: 130px" src="img/home/iracema.png" lazy="loaded" />
      <img class="mx-5" style="height: 130px" src="img/citinova.jpg" lazy="loaded" />
    </section>

    <h2 class="text-center mt-0">{{$t('Colaboradores')}}</h2>
    <hr class="listinha mt-4" />
    <section class="text-center m-5">
      <img class="mx-5" style="height: 70px" src="img/ppgcc.png" lazy="loaded" />
      <img class="mx-5" style="height: 70px" src="img/lapisco.png" lazy="loaded" />
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
      creditos: false,
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
    // await this.corona_noticias();
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
@media (min-width: 320px) {
  #logo {
    width: 100%;
    height: auto;
    background-color: #008ecd;
    border-radius: 20px;
    padding: 15px;
  }
}

@media (min-width: 480px) {
  #logo {
    width: 100%;
    height: auto;
    background-color: #008ecd;
    border-radius: 20px;
    padding: 15px;
  }
}

@media (min-width: 600px) {
  #logo {
    width: 40%;
    height: auto;
    background-color: #008ecd;
    border-radius: 20px;
    padding: 15px;
  }
}

@media (min-width: 1200px) {
  #logo {
    width: 40%;
    height: auto;
    background-color: #008ecd;
    border-radius: 20px;
    padding: 15px;
  }
}

hr.listinha {
  max-width: 3.25rem;
  border-width: 0.2rem;
  border-color: #fb8640ee;
}

.content-wrap {
  position: relative;
  padding: 80px 0;
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

.cardFrase {
  width: 0px;
}
</style>
