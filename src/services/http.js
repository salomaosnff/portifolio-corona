import axios from 'axios'

const baseUrl = 'https://portifolio-corona-api.herokuapp.com/'
// const baseUrl = 'http://localhost:3000/'


export default class Http {

    async get(entidade) {
        return await axios
            .get(baseUrl + entidade)
            .then((data) => { return data.data })
            .catch(() => { return [] })
    }

    async getId(entidade, _id) {
        return await axios
            .get(baseUrl + entidade + '/' + _id)
            .then((data) => { return data.data })
            .catch((erro) => { console.error(erro) })
    }

    async post(entidade, dados) {
        return await axios
            .post(baseUrl + entidade, dados)
            .then((data) => { return data.data })
            .catch((erro) => { console.error(erro) })
    }

    async put(entidade, _id, dados) {
        return await axios
            .put(baseUrl + entidade + '/' + _id, dados)
            .then((data) => { return data.data })
            .catch((erro) => { console.error(erro) })
    }

    async delete(entidade, _id) {
        try {
            return await axios
                .delete(baseUrl + entidade + '/' + _id)
                .then((data) => { return 'Ok' })
        } catch (error) {
            return 'Não foi possível excluir'
        }
    }
}

