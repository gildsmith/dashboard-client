// noinspection JSUnresolvedReference

import {defineStore} from 'pinia'

/**
 * TODO
 */
export const useLanguagesStore = defineStore('languages', {
    state: () => ({
        fetched: false,
        languages: [],
    }),
    actions: {
        async fetch() {
            if (this.fetched)
                return

            const response = await axios.get('/_gildsmith/languages')
            this.languages = response.data
            this.fetched = true
        },
    },
})