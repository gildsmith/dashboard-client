import axios from 'axios'
import {defineStore} from 'pinia'

/*
 | ---------------------------------------------------------------------------
 | Datasets Store
 | ---------------------------------------------------------------------------
 | Manages the retrieval of basic datasets such as currencies, languages,
 | and features from the API. Each dataset is fetched only once to minimize
 | redundant API calls.
 */

interface DatasetState {
    fetched: string[]
    currencies: any[]
    languages: any[]
    features: any[]
}

export const useDatasetsStore = defineStore('datasets', {
    state: (): DatasetState => ({
        fetched: [],
        currencies: [],
        languages: [],
        features: [],
    }),
    actions: {
        async fetchCurrencies() {
            if (this.fetched.includes('currencies')) return

            const response = await axios.get('/_gildsmith/currencies')
            this.currencies = response.data
            this.fetched.push('currencies')
        },

        async fetchLanguages() {
            if (this.fetched.includes('languages')) return

            const response = await axios.get('/_gildsmith/languages')
            this.languages = response.data
            this.fetched.push('languages')
        },

        async fetchFeatures() {
            if (this.fetched.includes('features')) return

            const response = await axios.get('/_gildsmith/features')
            this.features = response.data
            this.fetched.push('features')
        },
    },
})