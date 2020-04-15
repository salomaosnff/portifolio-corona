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
            icon="ni ni-bold-left"
            class="mb-5 text-warning text-capitalize"
            type="white"
            @click="$router.go(-1)"
          >Voltar</base-button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div v-show="card == 1" class="col-lg-5">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-4 text-warning font-weight-bold">Criar Minha Conta</h4>
            <template>
              <form role="form">
                <base-input class="mb-3" placeholder="Nome" v-model.trim="$v.pessoa.nome.$model"></base-input>
                <div class="error mb-3 ml-2 text-danger" v-show="!$v.pessoa.nome.required">Campo obrigatório!</div>
                <base-input class="mb-3" placeholder="E-mail" v-model.trim="$v.pessoa.email.$model"></base-input>
                <div class="error mb-3 ml-2 text-danger" v-show="!$v.pessoa.email.required">Campo obrigatório!</div>
                <div class="error mb-3 ml-2 text-danger" v-show="!$v.pessoa.email.email">E-mail inválido!</div>
                <base-input
                  class="mb-3"
                  placeholder="Telefone"
                  v-model.trim="$v.pessoa.telefone.$model"
                  v-mask="['(##) #### - ####', '(##) ##### - ####']"
                ></base-input>
                <div class="error mb-3 ml-2 text-danger" v-show="!$v.pessoa.telefone.required">Campo obrigatório!</div>

                <base-radio name="fisica" class="mb-3" v-model="pessoa.tipo">Pessoa Física</base-radio>
                <base-radio name="juridica" class="mb-3" v-model="pessoa.tipo">Pessoa Jurídica</base-radio>

                <base-input
                  v-if="pessoa.tipo === 'fisica'"
                  class="mb-3"
                  placeholder="CPF"
                  v-mask="'###.###.###-##'"
                  v-model="$v.pessoa.cpf.$model"
                ></base-input>
                <base-input
                  v-if="pessoa.tipo === 'juridica'"
                  class="mb-3"
                  placeholder="CNPJ"
                  v-mask="'##.###.###/####-##'"
                  v-model="$v.pessoa.cnpj.$model"
                ></base-input>
                <base-checkbox class="mb-3" v-model="pessoa.colaborador">Produtor de Ideias</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.cliente">Interessado em Soluções</base-checkbox>
                <base-checkbox class="mb-3" v-model="pessoa.investidor">Contribuidor e Investidor</base-checkbox>

                <base-input placeholder="Nome de Usuário" v-model="$v.pessoa.nome_usuario.$model"></base-input>
                <div class="error mb-3 ml-2 text-danger" v-show="!$v.pessoa.nome_usuario.required">Campo obrigatório!</div>
                <base-input type="password" placeholder="Senha" v-model="$v.pessoa.senha.$model"></base-input>
                <div class="error mb-3 ml-2 text-danger" v-show="!$v.pessoa.senha.required">Campo obrigatório!</div>
                <base-input
                  type="password"
                  placeholder="Confirmar Senha"
                  v-model="$v.confirmacao_senha"
                  :valid="pessoa.senha === confirmacao_senha && pessoa.senha !== ''"
                ></base-input>
                
                <div class="text-center">
                  <base-button
                    type="warning"
                    class="my-4"
                    icon="ni ni-bold-right"
                    @click="card = 2"
                  >Próximo</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>

        <div v-show="card == 2" class="col-lg-5">
          <card
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <h4 class="mb-4 text-warning font-weight-bold">Endereço</h4>
            <template>
              <form role="form">
                <div class="mb-3">
                  <p class="d-block mb-2">Estado</p>
                  <dropdown>
                    <base-button
                      slot="title"
                      type="warning"
                      class="dropdown-toggle text-capitalize"
                    >{{estado.nome || "Selecione seu Estado"}}</base-button>
                    <a
                      v-for="(item, index) in estados"
                      :key="index"
                      class="dropdown-item"
                      @click="estado = item; buscar_cidades()"
                    >{{item.nome}}</a>
                  </dropdown>
                </div>

                <div class="mb-3" v-if="endereco.cidade && endereco.cidade._id">
                  <p class="d-block mb-2">Cidade</p>
                  <dropdown>
                    <base-button
                      slot="title"
                      type="warning"
                      class="dropdown-toggle text-capitalize"
                    >{{endereco.cidade.nome || "Selecione sua Cidade"}}</base-button>
                    <a
                      v-for="(item, index) in cidades"
                      :key="index"
                      class="dropdown-item"
                      @click="endereco.cidade = item"
                    >{{item.nome}}</a>
                  </dropdown>
                </div>

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
                    class="my-4 text-warning"
                    type="secondary"
                    icon="ni ni-bold-left"
                    @click="card = 1"
                  >Anterior</base-button>
                  <base-button class="my-4" type="warning" @click="salvar()">Salvar</base-button>
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
import http from "../../services/http";
import Dropdown from "../../components/BaseDropdown.vue";
import { required, minLength, email, sameAs  } from "vuelidate/lib/validators"

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      http: new http(),
      pessoa: {
        colaborador: false,
        investidor: false,
        cliente: false,
        tipo: "fisica",
        cpf: "",
        cnpj: "",
        nome: "",
        email: "",
        telefone: "",
        nome_usuario: "",
        senha: "",
        endereco: { _id: "" }
      },
      endereco: {
        cidade: { _id: "" },
        cep: "",
        bairro: "",
        logradouro: "",
        numero: ""
      },
      estado: { _id: "" },
      estados: [],
      cidades: [],
      confirmacao_senha: "",
      card: 1
    };
  },

  validations: {
    pessoa: {
      cpf: { required, minLength: minLength(11) },
      cnpj: { required, minLength: minLength(14) },
      nome: { required, minLength: minLength(4) },
      email: { required, email },
      telefone: { required },
      nome_usuario: { required },
      senha: { required, minLength: minLength(8) }
    },
    endereco: {
      cep: { required, minLength: minLength(8) },
      bairro: { required, minLength: minLength(4) },
      logradouro: { required, minLength: minLength(8) },
      numero: { required }
    },
  },

  async mounted() {
    await this.buscar_estados();
    await this.buscar_cidades();
  },

  methods: {
    async buscar_estados() {
      await this.http.get("estado", 0).then(async data => {
        this.estados = await data;
      });
    },

    async buscar_cidades() {
      if (this.estado && this.estado._id)
        await this.http.cidadesByEstado(this.estado._id).then(async data => {
          this.cidades = await data.cidades;
          if (this.cidades[0] && this.cidades[0]._id)
            this.endereco.cidade = this.cidades[0];
        });
    },

    async salvar() {
      // this.endereco.cep = await this.endereco.cep.replace(/\D+/g, "");
      // this.pessoa.cpf = await this.pessoa.cpf.replace(/\D+/g, "");
      // this.pessoa.cnpj = await this.pessoa.cnpj.replace(/\D+/g, "");
      // this.pessoa.telefone = await this.pessoa.telefone.replace(/\D+/g, "");
      await this.http
        .post("endereco", this.endereco)
        .then(async resp_endereco => {
          if (resp_endereco._id) {
            this.pessoa.endereco = resp_endereco._id;
            await this.http
              .post("pessoa", this.pessoa)
              .then(async resp_pessoa => {
                if (resp_pessoa._id) {
                  this.pessoa._id = resp_pessoa._id;
                  await localStorage.setItem(
                    "pessoa",
                    JSON.stringify(this.pessoa)
                  );
                  this.$router.push("solucoes_cadastro");
                }
              })
              .catch(err => {
                console.log("Erro ao Salvar a Pessoa");
                console.error(err);
              });
          }
        })
        .catch(err => {
          console.log("Erro ao Salvar o Endereço");
          console.error(err);
        });
    }
  }
};
</script>
