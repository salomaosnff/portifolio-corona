<template>
  <div style="transform-origin: center center 0px;">
    <section class="section section-lg section-shaped overflow-hidden my-0">
      <div class="shape shape-style-1 bg-gradient-warning">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container py-0 pb-lg">
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-5 mb-5 mb-lg-0">
            <h1 class="text-white font-weight-light">Página em Desenvolvimento</h1>
            <p class="lead text-white mt-4">
              Estamos trabalhando no desenvolvimento desta página, em breve
              você poderá disfrutar de seus maravilhosos recursos ;)
            </p>
            <div class="row ml-0 mt-4">
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
          <div class="col-lg-6 mb-lg-auto">
            <div class="rounded overflow-hidden transform-perspective-right">
              <i class="ni ni-planet" style="font-size: 350px; color: white"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>