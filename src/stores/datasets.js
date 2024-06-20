import {defineStore} from 'pinia'

export const useDatasetsStore = defineStore('datasets', {
    state: () => ({
        fetched: [],
        currencies: [],
        languages: [],
    }),
    actions: {
        async fetchCurrencies() {
            if (this.fetched.includes('currencies'))
                return

            const response = await axios.get('/_gildsmith/currencies')
            this.currencies = response.data
            this.fetched.push('currencies')
        },
        async fetchLanguages() {
            if (this.fetched.includes('languages'))
                return

            const response = await axios.get('/_gildsmith/languages')
            this.languages = response.data
            this.fetched.push('languages')
        },
    },
})