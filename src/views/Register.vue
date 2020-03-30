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
        <div v-show="card_visible == 1" class="col-lg-5">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-4 text-success font-weight-bold">Dados Pessoais</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Nome" v-model="pessoa.nome"></base-input>
                <base-input class="mb-3" placeholder="Email" v-model="pessoa.email"></base-input>
                <base-input class="mb-3" placeholder="Telefone" v-model="pessoa.telefone"></base-input>
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
                <base-input type="password" placeholder="Senha" v-model="pessoa.senha"></base-input>
                <base-input
                  type="password"
                  placeholder="Confirmar Senha"
                  v-model="confirmacao_senha"
                  :valid="pessoa.senha == confirmacao_senha && pessoa.senha != ''"
                ></base-input>
                <div class="text-center">
                  <base-button
                    type="success"
                    class="my-4"
                    icon="ni ni-bold-right"
                    @click="card_visible = 2"
                  >Próximo</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>

        <div v-show="card_visible == 2" class="col-lg-5">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-4 text-success font-weight-bold">Endereço</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="País" v-model="endereco.pais"></base-input>
                <base-input class="mb-3" placeholder="Estado" v-model="endereco.estado"></base-input>
                <base-input class="mb-3" placeholder="Cidade" v-model="endereco.cidade"></base-input>
                <base-input
                  class="mb-3"
                  placeholder="CEP"
                  v-mask="'#####-###'"
                  v-model="endereco.cep"
                ></base-input>
                <base-input class="mb-3" placeholder="Bairro" v-model="endereco.bairro"></base-input>
                <base-input class="mb-3" placeholder="Logradouro" v-model="endereco.logradouro"></base-input>
                <base-input class="mb-3" placeholder="Número" v-model="endereco.numero"></base-input>
                <div class="text-center">
                  <base-button
                    class="my-4 text-success"
                    type="secondary"
                    icon="ni ni-bold-left"
                    @click="card_visible = 1"
                  >Anterior</base-button>
                  <base-button class="my-4" type="success">Salvar</base-button>
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
        colaborador: Boolean,
        investidor: Boolean,
        cliente: Boolean,
        tipo: "fisica", //Pode assumir os valores: "fisica" ou "juridica"
        cpf: "",
        cnpj: "",
        nome: "",
        email: "",
        telefone: "",
        senha: ""
      },
      endereco: {
        pais: "",
        estado: "",
        cidade: "",
        cep: "",
        bairro: "",
        logradouro: "",
        numero: ""
      },
      confirmacao_senha: "",
      card_visible: 1
    };
  }
};
</script>
<style>
</style>
