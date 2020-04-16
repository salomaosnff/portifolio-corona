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
        <div class="col-md-3 row ml-0">
          <base-button
            icon="fa fa-home"
            class="mb-5 text-warning text-capitalize"
            type="white"
            @click="$router.push('/')"
          ></base-button>
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
                    class="my-4"
                    type="warning text-capitalize"
                    style="font-size: 16px"
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
      :show.sync="modal_visivel"
      gradient="warning"
      modal-classes="modal-danger modal-dialog-centered"
    >
      <h4
        slot="header"
        class="modal-title"
        id="modal-title-notification"
      >{{solucoes[index_modal].titulo}}</h4>

      <div>
        <h5 class="text-white">{{solucoes[index_modal].texto_modal}}</h5>
        <h5 class="text-white mt-4">{{solucoes[index_modal].texto_modal_secundario}}</h5>
        <p
          v-if="solucoes[index_modal].texto_modal_alerta"
          class="text-white mt-4"
        >{{solucoes[index_modal].texto_modal_alerta}}</p>
        <p class="mt-4">
          Para mais informações, favor entrar em contato:
          mauro@lar.ifce.edu.br
          <br />(85) 99705 - 4321
        </p>
      </div>
      <template slot="footer">
        <base-button
          type="white"
          text-color="warning"
          class="text-capitalize"
          @click="$router.push('solucoes_lista')"
        >Lista de Ideias</base-button>
      </template>
    </modal>
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
      modal_visivel: false,
      index_modal: 0,
      solucoes: [
        {
          titulo: "Fundo REVIVE",
          descricao:
            "Colabore com a manutenção, administração e aperfeiçoamento da plataforma REVIVE.",
          icone: "ni ni-money-coins",
          botao: "Aplicar",
          link: "#/desenvolvimento",
          texto_modal:
            "A plataforma REVIVE é de responsabilidade do Prof. Mauro Oliveira, pesquisador do Programa de Pós-graduação em Ciência da Computação (PPGCC) do IFCE.",
          texto_modal_secundario:
            "Este projeto foi desenvolvido por professores e alunos do PPGCC. O propósito do Fundo REVIVE é a obtenção de recursos para manutenção, administração e aperfeiçoamento desta plataforma.",
          texto_modal_alerta: ""
        },
        {
          titulo: "Apoio Financeiro",
          descricao:
            "Apoie financeiramente um das IDEIAS cadastradas na plataforma REVIVE.",
          icone: "ni ni-money-coins",
          botao: "Apoiar",
          link: "#/solucoes_lista",
          texto_modal:
            "É simples apoiar financeiramente uma das IDEIAS cadastradas no REVIVE. Você seleciona um dos projetos cadastrados (ÁREA de Atuação, Status da IDEIA ou Busca com Palavras-chave). Após a seleção, você deve entrar em contato com o RESPONSÁVEL pelo projeto para dar sua contribuição.",
          texto_modal_secundario:
            "Sugerimos que 1% de sua colaboração seja doado ao Fundo REVIVE.",
          texto_modal_alerta:
            "IMPORTANTE: A plataforma REVIVE não assume nenhum tipo de responsabilidade na aplicação dos recursos doados."
        },
        {
          titulo: "Criar Parceria",
          descricao:
            "Crie uma parceria com o responsável por uma das IDEIAS cadastradas na plataforma REVIVE.",
          icone: "ni ni-building",
          botao: "Criar",
          link: "#/desenvolvimento",
          texto_modal:
            "É simples fazer parceria COMERCIAL ou ACADÊMICA com uma das IDEIAS cadastradas no REVIVE. Você seleciona um dos projetos cadastrados pelo tipo de NEGÓCIO que lhe interessa.",
          texto_modal_secundario:
            "Em seguida, você seleciona o projeto pela ÁREA de Atuação, Status da IDEIA, ou Busca com Palavras-chave. Após a seleção do projeto, você deve entrar em contato com o RESPONSÁVEL para propor a parceria.",
          texto_modal_alerta:
            "IMPORTANTE: A plataforma REVIVE não assume nenhum tipo responsabilidades nas parcerias realizadas."
        }
      ]
    };
  },
  methods: {
    modal(i) {
      this.index_modal = i;
      this.modal_visivel = true;
    }
  }
};
</script>
