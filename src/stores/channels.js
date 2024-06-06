import {defineStore} from 'pinia'

/**
 * TODO
 */
export const useChannelsStore = defineStore('channels', {
    state: () => ({
        channels: [],
    }),
    actions: {
        async fetch() {
            const response = await axios.get('/api/channels')
            this.channels = response.data
            this.sort()
        },
        async upsert(channel) {
            const index = this.channels.findIndex(c => c.id === channel.id)
            index !== -1
                ? this.channels[index] = channel
                : this.channels.push(channel)
            await this.sort()
        },
        delete(id) {
            this.channels = this.channels.filter(c => c.id !== id)
            this.sort()
        },
        sort() {
            this.channels.sort((a, b) => a.id - b.id)
        },
    },
})