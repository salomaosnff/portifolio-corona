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
        <div class="col-lg-10">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <tabs fill class="flex-column flex-md-row">
                <card shadow>
                    <tab-pane>
                        <span slot="title">
                            Solução
                        </span>
                        <form role="form">
                          <base-input class="mb-3" placeholder="Nome" v-model="solucao.nome"></base-input>
                          <base-input class="mb-3" placeholder="Estado" v-model="solucao.estado"></base-input>
                          <base-input class="mb-3" placeholder="Cidade" v-model="solucao.cidade"></base-input>
                          <base-input
                            class="mb-3"
                            placeholder="CEP"
                            v-mask="'#####-###'"
                            v-model="solucao.cep"
                          ></base-input>
                          <base-input class="mb-3" placeholder="Bairro" v-model="solucao.bairro"></base-input>
                          <base-input class="mb-3" placeholder="Logradouro" v-model="solucao.logradouro"></base-input>
                          <base-input class="mb-3" placeholder="Número" v-model="solucao.numero"></base-input>
                          <div class="text-center">
                            <base-button class="my-4" type="success">Cadastrar</base-button>
                          </div>
                        </form>                        
                    </tab-pane>
                    <tab-pane title="Profile">
                        <span slot="title">
                            Produto
                        </span>
                        <form role="form">
                          <base-input class="mb-3" placeholder="Nome" v-model="produto.nome"></base-input>
                          <base-input class="mb-3" placeholder="Tipo" v-model="produto.tipo"></base-input>
                          <base-input class="mb-3" placeholder="Valor" v-model="produto.valor"></base-input>
                          <base-input class="mb-3" placeholder="Validade" v-model="produto.validade"></base-input>
                          <div class="text-center">
                            <base-button class="my-4" type="success">Cadastrar</base-button>
                          </div>
                        </form>  
                    </tab-pane>
                    <tab-pane>
                        <span slot="title">
                            Serviço
                          </span>
                          <form role="form">
                            <base-input class="mb-3" placeholder="Nome" v-model="servico.nome"></base-input>
                            <base-input class="mb-3" placeholder="Tipo" v-model="servico.tipo"></base-input>
                            <base-input class="mb-3" placeholder="Valor" v-model="servico.valor"></base-input>
                            <base-input class="mb-3" placeholder="Telefone" v-model="servico.telefone"></base-input>
                            <div class="text-center">
                              <base-button class="my-4" type="success">Cadastrar</base-button>
                            </div>
                          </form>  
                    </tab-pane>
                </card>
            </tabs>        
          </card>
        </div>              
      </div>
    </div>
  </section>
</template>
<script>
import Tabs from "@/components/Tabs/Tabs";
import TabPane from "@/components/Tabs/TabPane";
export default {
    components: {
    Tabs,
    TabPane
  },
  data() {
    return {
      solucao: {
        nome: "",
        pais: "",
        estado: "",
        cidade: "",
        cep: "",
        bairro: "",
        logradouro: "",
        numero: ""
      },
      produto: {
        nome: "",
        tipo: "",
        valor: "",
        validade: "",
      },
      servico:{
        nome: "",
        tipo: "",
        valor: "",
        telefone: "",
      },
    };
  }
};
</script>

