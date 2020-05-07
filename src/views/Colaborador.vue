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

    <div class="container pt-lg-md pb">
      <div class="row">
        <div class="col-md-2">
          <base-button
            icon="ni ni-bold-left"
            class="mb-5 text-warning text-capitalize"
            type="white"
            @click="$router.go(-1)"
          >{{$t('Voltar')}}</base-button>
        </div>
      </div>
      <div class="row justify-content-center pb-5">
        <div class="col-lg-4 pb-5">
          <card class="border-0" hover shadow body-classes="py-5">
            <icon name="ni ni-badge" type="warning " rounded class="mb-4" />
            <h4 class="text-warning">{{$t("Colaborador||Investidor.text-warning")}}</h4>
            <p class="description mt-3">{{$t("Colaborador||Investidor.description")}}</p>
            <div>
              <badge type="warning" rounded>{{$t("Colaborador||Investidor.badge_warning1")}}</badge>
              <badge type="warning" rounded>{{$t("Colaborador||Investidor.badge_warning2")}}</badge>
              <badge type="warning" rounded>{{$t("Colaborador||Investidor.badge_warning3")}}</badge>
            </div>
            <base-button
              tag="a"
              href="#/register"
              type="warning"
              class="mt-4"
            >{{$t("Colaborador||Investidor.button_register")}}</base-button>
          </card>
        </div>
        <div class="col-lg-4 pb-5">
          <card class="border-0" hover shadow body-classes="py-5">
            <icon name="ni ni-fat-add" type="primary" rounded class="mb-4" />
            <h4 class="text-primary">{{$t("Colaborador||Investidor.text-primary")}}</h4>
            <p class="description mt-3">{{$t("Colaborador||Investidor.description")}}</p>
            <div>
              <badge type="warning" rounded>{{$t("Colaborador||Investidor.badge_warning1")}}</badge>
              <badge type="warning" rounded>{{$t("Colaborador||Investidor.badge_warning2")}}</badge>
              <badge type="warning" rounded>{{$t("Colaborador||Investidor.badge_warning3")}}</badge>
            </div>
            <base-button
              tag="a"
              href="#/solucoes_cadastro"
              type="primary"
              class="mt-4"
            >{{$t("Colaborador||Investidor.button_solucoes_cadastro")}}</base-button>
          </card>
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
      modals: {
        modal1: false,
        modal2: false,
        modal3: false
      }
    };
  }
};
</script>
<style>
</style>