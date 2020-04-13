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
            tag="a"
            icon="ni ni-bold-left"
            class="mb-5 text-warning text-capitalize"
            type="white"
            href="#/"
          >Voltar</base-button>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="white"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-4 text-warning font-weight-bold">Entre no REVIVE</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Email" addon-left-icon="ni ni-email-83"></base-input>
                <base-input
                  type="password"
                  placeholder="Senha"
                  addon-left-icon="ni ni-lock-circle-open"
                ></base-input>
                <div class="text-center">
                  <base-button type="warning" class="my-4">Entrar</base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-5 mb-5">
            <div class="col-6">
              <a href="#" class="text-light text-white">
                <small>Esqueceu a senha?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a href="#/registrar" class="text-light text-white">
                <small>Criar conta!</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {};
</script>
<style>
</style>
