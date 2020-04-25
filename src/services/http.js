import axios from 'axios'

const baseUrl = [
    'https://portifolio-corona-api.herokuapp.com/',
    'http://localhost:3000/',
]

export default class Http {
    async logar(dados) {
        return await axios
            .get(baseUrl[0] + 'pessoa/logar', { params: { email: dados.email, senha: dados.senha } })
            .then((data) => { return data.data })
            .catch(() => { return {} })
    }

    async solucoesPorPessoa(dados) {
        return await axios
            .get(baseUrl[0] + 'solucao/buscarPorPessoa', { params: { pessoaId: dados } })
            .then((data) => { return data.data })
            .catch(() => { return {} })
    }

    async forunsPorPessoa(dados) {
        return await axios
            .get(baseUrl[0] + 'forum/buscarPorPessoa', { params: { pessoaId: dados } })
            .then((data) => { return data.data })
            .catch(() => { return {} })
    }

    async cidadesByEstado(dados) {
        return await axios
            .get(baseUrl[0] + 'cidade/estado/' + dados)
            .then(data => {
                return data.data
            })
            .catch(err => {
                return {}
            })
    }

    async get(entidade) {
        return await axios
            .get(baseUrl[0] + entidade)
            .then((data) => { return data.data })
            .catch(() => { return [] })
    }

    async getId(entidade, _id) {
        return await axios
            .get(baseUrl[0] + entidade + '/' + _id)
            .then((data) => { return data.data })
            .catch((erro) => { console.error(erro) })
    }

    async post(entidade, dados) {
        return await axios
            .post(baseUrl[0] + entidade, dados)
            .then((data) => { return data.data })
            .catch((erro) => { console.error(erro) })
    }

    async put(entidade, _id, dados) {
        return await axios
            .put(baseUrl[0] + entidade + '/' + _id, dados)
            .then((data) => { return data.data })
            .catch((erro) => { console.error(erro) })
    }

    async delete(entidade, _id) {
        try {
            return await axios
                .delete(baseUrl[0] + entidade + '/' + _id)
                .then((data) => { return 'Ok' })
        } catch (error) {
            return 'Não foi possível excluir'
        }
    }
}

