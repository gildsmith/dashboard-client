import {defineStore} from 'pinia'

/*
 | ---------------------------------------------------------------------------
 | Datasets Store
 | ---------------------------------------------------------------------------
 | This store is responsible for fetching basic datasets from the API.
 */

export const useDatasetsStore = defineStore('datasets', {
    state: () => ({
        fetched: [],
        currencies: [],
        languages: [],
        features: [],
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

        async fetchFeatures() {
            if (this.fetched.includes('features'))
                return

            const response = await axios.get('/_gildsmith/features')
            this.features = response.data
            this.fetched.push('features')
        },
    },
})