<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img src="img/brand/white.png" alt="logo" />
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
            <img src="img/brand/blue.png" />
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav ml-lg-auto">
        <li class="nav-item">
          <a
            class="nav-link text-weight"
            style="font-size: 18px; font-weight: bold"
            href="#/colaborador"
          >Ideias</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-weight"
            style="font-size: 18px; font-weight: bold"
            href="#/colaborador"
          >Soluções</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="font-size: 18px; font-weight: bold" href="#/investidor">Invista</a>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
