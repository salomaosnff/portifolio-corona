import axios from 'axios'
import { API_BASE } from '../config'

export default class Http {
    async novo_acesso_solucoes() {
        return await axios
            .get(API_BASE + 'acesso/novo')
            .then(data => { return data.data.solucoes })
            .catch(() => { return {} })
    }

    async logar(dados) {
        return await axios
            .get(API_BASE + 'pessoa/logar', { params: { email: dados.email, senha: dados.senha } })
            .then((data) => { return data.data })
            .catch(() => { return {} })
    }

    async solucoesPorPessoa(dados) {
        return await axios
            .get(API_BASE + 'solucao/buscarPorPessoa', { params: { pessoaId: dados } })
            .then((data) => { return data.data })
            .catch(() => { return {} })
    }

    async noticiasPorPessoa(dados) {
        return await axios
            .get(API_BASE + 'noticia/buscarPorPessoa', { params: { pessoaId: dados } })
            .then((data) => { return data.data })
            .catch(() => { return {} })
    }

    async forunsPorPessoa(dados) {
        return await axios
            .get(API_BASE + 'forum/buscarPorPessoa', { params: { pessoaId: dados } })
            .then((data) => { return data.data })
            .catch(() => { return {} })
    }

    async cidadesByEstado(dados) {
        return await axios
            .get(API_BASE + 'cidade/estado/' + dados)
            .then(data => {
                return data.data
            })
            .catch(err => {
                return {}
            })
    }

    async get(entidade) {
        return await axios
            .get(API_BASE + entidade)
            .then((data) => { return data.data })
            .catch(() => { return [] })
    }

    async getId(entidade, _id) {
        return await axios
            .get(API_BASE + entidade + '/' + _id)
            .then((data) => { return data.data })
            .catch((erro) => { console.error(erro) })
    }

    async post(entidade, dados) {
        return await axios
            .post(API_BASE + entidade, dados)
            .then((data) => { return data.data })
            .catch((erro) => { console.error(erro) })
    }

    async put(entidade, _id, dados) {
        return await axios
            .put(API_BASE + entidade + '/' + _id, dados)
            .then((data) => { return data.data })
            .catch((erro) => { console.error(erro) })
    }

    async delete(entidade, _id) {
        try {
            return await axios
                .delete(API_BASE + entidade + '/' + _id)
                .then((data) => { return 'Ok' })
        } catch (error) {
            return 'Não foi possível excluir'
        }
    }

    async esqueceuSenha(entidade, dados) {
        return await axios
            .post(API_BASE + entidade, dados)
            .then(resp => {
                return resp.data
            })
            .catch(err => {
                return {}
            })
    }



}

