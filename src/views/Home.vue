<template>
  <div>
    <section class="section-shaped my-0">
      <div class="shape shape-style-1 shape-warning">
        <img v-lazy="'img/equipe.jpg'" class="card-img-top" />
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
      <div class="row p-5">
        <div class="col-lg-6">
          <img
            style="height: 100px; background-color: #008ecd; border-radius: 20px; padding: 15px"
            src="img/logo.png"
            alt="logo"
          />
          <img
            style="height: 100px; background-color: #fff; border-radius: 20px; padding: 15px; margin-left: 30px"
            src="img/if.png"
            alt="logo"
          />
        </div>

        <div class="col-lg-6 text-right">
          <img
            v-for="(idioma) in idiomas"
            :key="idioma"
            :class="[$i18n.locale == idioma? 'flag-selected' : '', 'flag']"
            :src="'img/home/' + idioma + '.png'"
            @click="$i18n.locale = idioma"
          />
        </div>
      </div>
      <div class="container shape-container pb-5">
        <div class="row">
          <div class="col-lg-4"></div>
          <div class="col-lg-8">
            <card v-show="carousel == '0'" class="mt-5" style="background-color: #ffffffee" shadow>
              <div class="row" style="margin-left: 1px">
                <icon name="ni ni-world" gradient="warning" color="white" shadow rounded></icon>
                <h4
                  style="margin-top: 10px; margin-left: 20px"
                  class="text-default"
                >{{$t('Estatísticas do COVID-19')}} / (Brasil - {{noticias_corona.sigla}})</h4>
              </div>
              <div class="col" style="justify-content: center">
                <div class="row" style="justify-content: center">
                  <div class="m-4" v-if="noticias_corona.posicao">
                    <p>Ranking</p>
                    <h4>{{noticias_corona.posicao}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.casos">
                    <p>Casos</p>
                    <h4>{{noticias_corona.casos}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.curas">
                    <p>Curas</p>
                    <h4>{{noticias_corona.curas}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.mortes">
                    <p>Mortes</p>
                    <h4>{{noticias_corona.mortes}}</h4>
                  </div>
                </div>
              </div>

              <div class="col" style="justify-content: center">
                <div class="row" style="justify-content: center">
                  <p style="align-self: center">. . . . . . . Hoje . . . . . . .</p>
                </div>

                <div class="row" style="justify-content: center">
                  <div class="m-4" v-if="noticias_corona.novos_casos_hoje">
                    <p>Novos Casos</p>
                    <h4>{{noticias_corona.novos_casos_hoje}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.novas_mortes_hoje">
                    <p>Novas Mortes</p>
                    <h4>{{noticias_corona.novas_mortes_hoje}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.casos_ativos">
                    <p>Casos Ativos</p>
                    <h4>{{noticias_corona.casos_ativos}}</h4>
                  </div>

                  <div class="m-4" v-if="noticias_corona.casos_graves">
                    <p>Casos Graves</p>
                    <h4>{{noticias_corona.casos_graves}}</h4>
                  </div>
                </div>
              </div>
              <p class="small text-right mr-5 text-thin">Fonte: {{noticias_corona.fonte}}</p>
            </card>

            <card v-show="carousel == '1'" class="mt-5" style="background-color: #ffffffee" shadow>
              <div class="row" style="margin-left: 1px">
                <h4
                  style="margin-top: 10px; margin-left: 20px"
                  class="text-default"
                >{{$t('Home.Introdução.Título')}}</h4>
              </div>
              <div class="m-4" v-if="noticias_corona.casos_graves">
                <h5 class="text-thin">{{$t('Home.Introdução.Descrição')}}</h5>
              </div>
            </card>

            <div class="row text-center" style="justify-content: center">
              <button
                v-for="(c, index) in carousels"
                :key="index"
                :class="[carousel == c? 'btn_bottom_carousel_selected' : '', 'my-4 text-warning btn_bottom_carousel']"
                @click="carousel = c"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-secondary pb-0">
      <div class="container">
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
    </section>

    <section class="section pt-0">
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
import http from "../services/http";
export default {
  components: {
    Modal
  },
  data() {
    return {
      http: new http(),
      carousel: "0",
      carousels: ["0", "1"],
      noticias_corona: {},
      idiomas: ["pt_BR", "en"],
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
  async mounted() {
    await this.corona_noticias();
  },
  methods: {
    corona_noticias() {
      this.http
        .get("corona_noticias")
        .then(async data => {
          this.noticias_corona = await data;
          console.log(this.noticias_corona);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
