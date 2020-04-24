<template>
  <base-alert
    v-if="ver"
    style="position: absolute; top: 30px; right: 30px"
    :type="sucesso == 'true'? 'success' : 'danger'"
    dismissible
  >
    <span class="alert-inner--icon">
      <i :class="sucesso == 'true'? 'fa fa-thumbs-up' : 'fa fa-thumbs-down'"></i>
    </span>
    <span class="alert-inner--text mr-5">
      <strong>{{mensagem || ''}}</strong>
    </span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span id="fechar" aria-hidden="true">&times;</span>
    </button>
  </base-alert>
</template>
<script>
export default {
  data() {
    return {
      ver: true
    };
  },
  name: "alerta",
  props: {
    sucesso: {
      type: String,
      default: "false"
    },
    mensagem: {
      type: String
    }
  },

  mounted() {
    this.close();
  },

  methods: {
    close() {
      let that = this;
      setTimeout(function() {
        that.ver = false;
      }, 5000);
    }
  }
};
</script>
