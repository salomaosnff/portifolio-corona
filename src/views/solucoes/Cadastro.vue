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
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div v-show="card_visible == 1" class="col-lg-5">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-4 text-warning font-weight-bold">Dados Pessoais</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Nome do projeto" v-model="pessoa.nome_projeto"></base-input>
                <base-input class="mb-3" placeholder="Nome da Instituição ou da Empresa" v-model="pessoa.nome_empresa"></base-input>
                <base-input class="mb-3" placeholder="Responsável (Contato)" v-model="pessoa.contato_responsavel"></base-input>
                <base-input class="mb-3" placeholder="Email" v-model="pessoa.email"></base-input>
                <base-input class="mb-3" placeholder="Telefone" v-model="pessoa.telefone"></base-input>
                <base-input class="mb-3" placeholder="Whatsapp" v-model="pessoa.wapp"></base-input>
                <base-input class="mb-3" placeholder="Link do projeto" v-model="pessoa.link_projeto"></base-input>
                <base-input class="mb-3" placeholder="Descrição do projeto" v-model="pessoa.descricao_projeto"></base-input>
                <h6 class="mb-3 text-warning font-weight-bold">Área de aplicação: </h6>
                <base-checkbox class="mb-3" v-model="pessoa.area_saude">Saúde</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.area_economia">Economia</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.area_educacao">Educação</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.area_comunicacao">Comunicação</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.area_social">Social</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.area_outros">Outros</base-checkbox>
                <h6 class="mb-3 text-warning font-weight-bold">Tipo: </h6>
                <base-radio name="software" class="mb-3" v-model="pessoa.tipo_ideia_software">Software</base-radio>
                <base-radio name="hardware" class="mb-3" v-model="pessoa.tipo_ideia_hardware">Hardware</base-radio>
                <base-radio name="processo" class="mb-3" v-model="pessoa.tipo_ideia_processo">Processo</base-radio>
                <base-radio name="material" class="mb-3" v-model="pessoa.tipo_ideia_material">Material</base-radio>
                <base-radio name="outros"   class="mb-3" v-model="pessoa.tipo_ideia_outros">Outros</base-radio>
                <h6 class="mb-3 text-warning font-weight-bold">Status da ideia: </h6>
                <base-checkbox class="mb-3" v-model="pessoa.status_produto_comercializado">Produto comercializado</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.status_produto_lancado">Produto lançado</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.status_produto_testado">Produto testado</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.status_produto_terminado">Produto terminado</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.status_produto_desenvolvimento">Produto em desenvolvimento</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.status_produto_outros">Outros</base-checkbox>
                <h6 class="mb-3 text-warning font-weight-bold">Negócio: </h6>
                <base-checkbox class="mb-3" v-model="pessoa.negocio_gratuito">Disponível gratuitamente</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.negocio_restrito">Disponível com restrições</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.negocio_a_venda">À venda</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.negocio_financiamento_publico">À procura de financiamento público</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.negocio_financiamento_privado">À procura de financiamento privado</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.negocio_outros">Outros</base-checkbox>
                <base-input class="mb-3" placeholder="Observações" v-model="pessoa.observacoes"></base-input>
                <div class="text-center">
                  <base-button
                    type="warning"
                    class="mt-4"
                    @click="card_visible = 2"
                  >Salvar</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>

        <div v-show="card_visible == 2" class="col-lg-5" >
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-3 text-warning font-weight-bold">Dados salvos com sucesso!</h4>
            <base-button
              tag="a"
              href="#/"
              type="warning text-capitalize"
              class="mt-4"
            >Início</base-button>
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
        nome_projeto:"",
        nome_empresa:"",
        contato_responsavel:"",
        email:"",
        telefone:"",
        wapp:"",
        link_projeto:"",
        descricao_projeto:"",
        area_saude: false,
        area_economia: false,
        area_educacao: false,
        area_comunicacao: false,
        area_social: false,
        area_outros: false,
        tipo_ideia_software: false,
        tipo_ideia_hardware: false,
        tipo_ideia_processo: false,
        tipo_ideia_material: false,
        tipo_ideia_outros: false,
        status_produto_comercializado: false,
        status_produto_lancado: false,
        status_produto_testado: false,
        status_produto_terminado: false,
        status_produto_desenvolvimento: false,
        status_produto_outros: false,
        observacoes:"",
      },
      card_visible: 1,
      link_home:"#/"
    };
  }
};
</script>
