// noinspection JSUnresolvedReference

import {defineStore} from 'pinia'

/**
 * TODO
 */
export const useCurrenciesStore = defineStore('currencies', {
    state: () => ({
        fetched: false,
        currencies: [],
    }),
    actions: {
        async fetch() {
            if (this.fetched)
                return

            const response = await axios.get('/_gildsmith/currencies')
            this.currencies = response.data
            this.fetched = true
        },
    },
})