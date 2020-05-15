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
      <h2 class="text-white mb-5">{{$t('Fale Conosco')}}</h2>
      <div class="row">
        <div class="col-md-4 row ml-0">
          <base-button
            icon="ni ni-bold-left"
            class="mb-5 text-warning text-capitalize"
            type="white"
            @click="$router.push('/')"
          >{{$t("Voltar")}}</base-button>
        </div>
      </div>
    </div>

    <div class="container">
        <card shadow class="card-profile" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                    <div class="card-profile-image text-center mt-5">
                      <img v-lazy="'img/perfil-mauro-152x152.png'" class="rounded-circle" width="75%" height="75%" alt="icon-Revive">
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
              <h3>Mauro Oliveira </h3>
              <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{$t("Responsável")}}</div>
              <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>digitaliracema@gmail.com</div>
              <div class="h6 mb-4">
                <i class="ni business_briefcase-24 mr-2"></i>
                <a href="http://iracema.digital/" target="_blank"> iracemadigital.org</a>
              </div>
              <div class="h6 mb-4"><i class="ni business_briefcase-24 mr-2"></i>+55 85 99705 4321</div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <p>{{ $t("Bio") }}</p>         
                </div>
              </div>
            </div>
          </div>
        </card>
    </div>
  </section>
</template>

<script>
export default {
  data() { return {}; },
  methods: {}
};
</script>