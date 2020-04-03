<template>
  <section class="section section-shaped section-lg my-0">
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
    <div class="container">
      <div class="row row-grid justify-content-center">
        <div class="col-lg-4">
          <card class="border-0" hover shadow body-classes="py-5">
            <icon name="ni ni-badge" type="warning " rounded class="mb-4" />
            <h4 class="text-warning">Deseja se alistar?</h4>
            <p class="description mt-3">Texto motivacional ...</p>
            <div>
              <badge type="warning" rounded>#paz</badge>
              <badge type="warning" rounded>#amor</badge>
              <badge type="warning" rounded>#sucesso</badge>
            </div>
            <base-button tag="a" href="#/register" type="warning" class="mt-4">Alistar-me</base-button>
          </card>
        </div>
        <div class="col-lg-4">
          <card class="border-0" hover shadow body-classes="py-5">
            <icon name="ni ni-fat-add" type="primary" rounded class="mb-4" />
            <h4 class="text-primary">Deseja cadastrar uma solução?</h4>
            <p class="description mt-3">Texto motivacional ...</p>
            <div>
              <badge type="primary" rounded>#paz</badge>
              <badge type="primary" rounded>#amor</badge>
              <badge type="primary" rounded>#sucesso</badge>
            </div>
            <base-button tag="a" href="#/sregister" type="primary" class="mt-4">Cadastrar solução</base-button>
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