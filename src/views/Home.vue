<template>
  <div>
    <section class="section-shaped my-0">
      <div class="row pt-2 px-4 pb-3 justify-content-center align-items-center">
        <div class="mb-3 col-12 col-lg-6 pt-0" id="top_logo">
          <img id="icon_logo" src="/images/icons/icon-512x512.png" />
          <img id="logo" :src="'img/logo_' + $i18n.locale + '.png'" />
        </div>

        <div class="d-flex" style="flex: 1"></div>

        <div
          class="d-block text-center d-md-flex flex-wrap justify-content-center"
          style="flex: 0 auto"
        >
          <nav class="d-flex justify-content-end">
            <ul class="d-md-flex justify-content-center pl-0">
              <li class="mx-4">
                <a class="menu-text" href="#/sobre">{{$t('Sobre o')}} REVIVE</a>
              </li>
              <li class="mx-4">
                <a
                  v-if="$i18n.locale == 'pt_BR'"
                  class="menu-text"
                  target="_blank"
                  href="https://www.bbc.com/portuguese/topics/clmq8rgyyvjt"
                >Notícias COVID-19</a>
                <a
                  v-else
                  class="menu-text"
                  target="_blank"
                  href="https://www.bbc.com/news/coronavirus"
                >COVID-19 News</a>
              </li>

              <li class="mx-4">
                <a class="menu-text" href="#/contato">{{$t('Fale com A GENTE')}}</a>
              </li>
              <li class="mx-4">
                <a class="menu-text" href="#/login">Login</a>
              </li>
            </ul>
          </nav>
          <ul class="d-flex justify-content-center pl-0">
            <li v-for="(idioma) in idiomas" :key="idioma">
              <img
                :class="[$i18n.locale == idioma? 'flag-selected' : '', 'flag mt-2']"
                :src="'img/home/' + idioma + '.png'"
                @click="$i18n.locale = idioma"
              />
            </li>
          </ul>
        </div>
      </div>

      <div id="page-background" class="shape shape-style-1">
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

      <div class="row px-5 justify-content-between">
        <div class="col-lg-3 botoes mb-4">
          <base-button
            v-if="$i18n.locale == 'pt_BR'"
            href="http://lapisco.fortaleza.ifce.edu.br/covid19"
            type="warning text-normal"
            style="font-size: 16px"
            tag="a"
            target="_blank"
          >{{$t('Home.Monitor do COVID-19')}}</base-button>

          <base-button
            v-if="$i18n.locale == 'pt_BR'"
            class="mt-4"
            href="http://www.fiquenolar.ifce.edu.br/#/"
            type="warning text-normal"
            style="font-size: 16px"
            tag="a"
            target="_blank"
          >FiqueNoLar</base-button>

          <base-button
            v-if="$i18n.locale == 'pt_BR'"
            class="mt-4"
            href="https://perfilcovid.saude.ce.gov.br/"
            type="warning text-normal"
            style="font-size: 16px"
            tag="a"
            target="_blank"
          >COVID-19 no Ceará</base-button>
          <br />
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
      <div class="d-flex flex-wrap justify-content-center mt-5 pt-4">
        <img class="logos" src="img/if.png" />
        <img class="logos" src="img/home/iracema.png" />
        <img class="logos" src="img/citinova.jpg" />
        <img class="logos" src="img/estado.jpg" />
      </div>
      <div class="d-flex flex-wrap pr-5 mr-3" style="justify-content: right">
        <p class="text-dark">Designed by rawpixel.com / Freepik</p>
      </div>
    </section>

    <section class="container" style="margin-top: 90px">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <div class="row row-grid">
            <div v-for="(card, index) in cards" :key="index" class="col-lg-4 mb-5">
              <card class="border-0 text-center" shadow body-classes="py-5">
                <icon
                  :name="card.icone"
                  class="mb-3"
                  gradient="warning"
                  color="white"
                  shadow
                  rounded
                ></icon>
                <h4 class="text-default">{{$t('Home.Cards[' + index + '].Título')}}</h4>
                <p v-if="index < 3" class="mt-3">{{$t('Home.Cards[' + index + '].Descrição')}}</p>
                <div class="text-center">
                  <base-button
                    class="mt-4 btn-block"
                    type="warning text-normal"
                    style="font-size: 16px"
                    @click="card.login && pessoa._id == ''? $router.push({ name: 'login', 
                      query: { rota: card.link }}) : $router.push(card.link)"
                  >{{$t('Home.Cards[' + index + '].Botão')}}</base-button>
                </div>
              </card>
            </div>
            <div class="col-lg-4 mb-5">
              <card class="border-0 text-center" shadow body-classes="py-5">
                <div style="height: 126px" class="mb-3">
                  <icon
                    class="mb-3"
                    name="ni ni-chat-round"
                    gradient="warning"
                    color="white"
                    shadow
                    rounded
                  ></icon>
                  <h4 class="text-default">{{$t('Fóruns de Discussão')}}</h4>
                </div>
                <div>
                  <img
                    style="height: 160px; margin: 5px; border-radius: 20px"
                    src="img/forum.jpg"
                    lazy="loaded"
                    alt="Smiley face"
                  />
                </div>
                <base-button
                  class="mt-4 btn-block btn-block"
                  type="warning text-normal"
                  style="font-size: 16px"
                  @click="pessoa._id == ''? $router.push({ name: 'login', 
                      query: { rota: 'forum_lista' }}) : $router.push('forum_lista')"
                >{{$t('Entrar')}}</base-button>
              </card>
            </div>
            <div class="col-lg-4 mb-5">
              <card class="border-0 text-center" shadow body-classes="py-5">
                <div style="height: 126px" class="mb-3">
                  <icon
                    class="mb-3"
                    name="ni ni-settings-gear-65"
                    gradient="warning"
                    color="white"
                    shadow
                    rounded
                  ></icon>
                  <h4 class="text-default">{{$t('Aconselhamento Tecnológico')}}</h4>
                </div>
                <div class="text-center">
                  <div>
                    <img
                      style="height: 160px; margin: 5px; border-radius: 20px"
                      src="img/tecnologico.jpg"
                      lazy="loaded"
                    />
                  </div>
                  <base-button
                    class="mt-4 btn-block"
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
              <card class="border-0 text-center" shadow body-classes="py-5">
                <div style="height: 126px" class="mb-3">
                  <icon
                    class="mb-3"
                    name="ni ni-money-coins"
                    gradient="warning"
                    color="white"
                    shadow
                    rounded
                  ></icon>
                  <h4 class="text-default">{{$t('Aconselhamento Econômico')}}</h4>
                </div>
                <div class="text-center">
                  <div>
                    <img
                      style="height: 160px; margin: 5px; border-radius: 20px"
                      src="img/economico.jpg"
                      lazy="loaded"
                    />
                  </div>
                  <base-button
                    class="mt-4 btn-block"
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
      <img class="m-4" style="height: 60px" src="img/lar.png" lazy="loaded" />
      <img class="mx-5" style="height: 70px" src="img/prpi.jpeg" lazy="loaded" />
      <img class="m-4" style="height: 60px" src="img/ifce.png" lazy="loaded" />
      <base-button
        class="m-4 col-1"
        type="warning text-normal"
        style="font-size: 16px"
        @click="modal_desenvolvedores = false; modal_visivel = true; modal_autores = true"
      >Autores</base-button>
      <base-button
        class="m-4 col-2"
        type="warning text-normal"
        style="font-size: 16px"
        @click="modal_autores = false; modal_visivel = true; modal_desenvolvedores = true"
      >Desenvolvedores</base-button>
    </section>

    <h2 class="text-center mt-0">{{$t('Promoção')}}</h2>
    <hr class="listinha mt-4" />
    <section class="text-center m-5">
      <img class="mx-5" style="height: 130px" src="img/sedet.png" lazy="loaded" />
      <img class="mx-5" style="height: 130px" src="img/home/iracema.png" lazy="loaded" />
      <img class="mx-5" style="height: 70px" src="img/citinova.jpg" lazy="loaded" />
    </section>

    <h2 class="text-center mt-0">{{$t('Colaboradores')}}</h2>
    <hr class="listinha mt-4" />
    <section class="text-center m-5">
      <img class="mx-5" style="height: 70px" src="img/ppgcc.png" lazy="loaded" />
      <img class="mx-5" style="height: 70px" src="img/lapisco.png" lazy="loaded" />
    </section>

    <modal
      v-if="noticias_corona"
      :show.sync="modal_visivel"
      gradient="warning"
      modal-classes="modal-warning modal-dialog-centered"
    >
      <h4
        class="modal-title"
        slot="header"
      >{{modal_autores? 'Autores do REVIVE' : modal_desenvolvedores? 'Desenvolvedores do REVIVE':'' }}</h4>
      <div class="col" style="justify-content: center">
        <div class="row" style="justify-content: center">
          <h5 v-if="modal_autores" class="text-white" style="line-height: 200%">
            Antonio Mauro Barbosa de Oliveira
            <br />Carina Teixeira de Oliveira
            <br />Reinaldo Bezerra Braga
            <br />Renato Alexandre Costa Freitas
            <br />Renato Alves de Oliveira
          </h5>
          <h5 v-else class="text-white" style="line-height: 200%">
            Renato Alves de Oliveira
            <br />Renato Alexandre Costa Freitas
            <br />Edgar dos Santos Oliveira
            <br />Fernando Ericales da Silva Lima
            <br />Francisco de Sousa Junior
            <br />Ruan dos Santos Gondim
            <br />Salomão Neto Fernandes de Freitas
            <br />Joyce Quintino Alves
            <br />Matheus Ferreira de Oliveira
            <br />Paulo Ericson Valentin Silva
            <br />Rui Guerra Moreno
            <br />Vinicius Nunes Barbosa
          </h5>
        </div>
      </div>
      <template slot="footer">
        <base-button
          type="link"
          text-color="white"
          class="text-normal"
          @click="modal_visivel = false"
        >{{$t('Fechar')}}</base-button>
      </template>
    </modal>
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
      pessoa: { _id: "" },
      carousel: 0,
      carousels: ["COVID-19", "Introdução"],
      noticias_corona: {},
      idiomas: ["pt_BR", "en"],
      modal_visivel: false,
      modal_autores: false,
      modal_desenvolvedores: false,
      cards: [
        {
          icone: "ni ni-bulb-61",
          link: "usuario_solucoes_lista",
          login: true
        },
        {
          icone: "ni ni-settings",
          link: "solucoes_lista",
          login: false
        },
        {
          icone: "ni ni-money-coins",
          link: "dashboard_investimento",
          login: false
        }
      ]
    };
  },
  async mounted() {
    let pessoa = {};
    pessoa = await localStorage.getItem("pessoa");
    pessoa = await JSON.parse(pessoa);
    if (pessoa && pessoa._id) this.pessoa = pessoa;
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
ul {
  list-style: none;
}

#page-background {
  background: url("./assets/img/equipe.jpg") no-repeat;
  background-size: cover;
}

.botoes .btn {
  width: 100%;
}
@media (min-width: 320px) {
  #logo {
    width: 100%;
    height: auto;
    background-color: #008ecd;
    border-radius: 20px;
    padding: 15px;
  }

  #icon_logo {
    width: 150px;
    height: auto;
    border-radius: 20px;
    padding: 15px;
  }

  #top_logo {
    text-align: center;
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

  #icon_logo {
    width: 150px;
    height: auto;
    border-radius: 20px;
    padding: 15px;
  }

  #top_logo {
    text-align: center;
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

  #icon_logo {
    width: 150px;
    height: auto;
    border-radius: 20px;
    padding: 15px;
  }

  #top_logo {
    text-align: center;
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

  #icon_logo {
    width: 150px;
    height: auto;
    border-radius: 20px;
    padding: 15px;
  }

  #top_logo {
    text-align: left;
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
