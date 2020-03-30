<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-success">
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
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Nome" v-model="pessoa.nome"></base-input>
                <base-input class="mb-3" placeholder="Email" v-model="pessoa.email"></base-input>
                <base-radio name="fisica" class="mb-3" v-model="pessoa.tipo">Pessoa Física</base-radio>
                <base-radio name="juridica" class="mb-3" v-model="pessoa.tipo">Pessoa Jurídica</base-radio>
                <base-input
                  v-if="pessoa.tipo == 'fisica'"
                  class="mb-3"
                  placeholder="CPF"
                  v-mask="'###.###.###-##'"
                  v-model="pessoa.cpf"
                ></base-input>
                <base-input
                  v-if="pessoa.tipo == 'juridica'"
                  class="mb-3"
                  placeholder="CNPJ"
                  v-mask="'##.###.###/####-##'"
                  v-model="pessoa.cnpj"
                ></base-input>
                <base-checkbox class="mb-3" v-model="pessoa.colaborador">Colaborador</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.investidor">Investidor</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.cliente">Cliente</base-checkbox>
                <base-input
                  type="password"
                  placeholder="Senha"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="pessoa.senha"
                ></base-input>
                <base-input
                  type="password"
                  placeholder="Confirmar Senha"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="pessoa.confirmacao_senha"
                ></base-input>
                <div class="text-center">
                  <base-button type="success" class="my-4">Cadastrar-me</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      pessoa: {
        colaborador: undefined,
        investidor: undefined,
        cliente: undefined,
        tipo: "fisica",
        cpf: "",
        cnpj: "",
        nome: "",
        email: "",
        senha: "",
        confirmacao_senha: ""
      }
    };
  }
};
</script>
<style>
</style>
