import {defineStore} from 'pinia'

/**
 | ---------------------------------------------------------------------------
 | Channels Store
 | ---------------------------------------------------------------------------
 | Manages the state for a collection of channels, including fetching,
 | updating (upserting), deleting channels, and handling their specific
 | relationships. Channels are kept sorted by their ID.
 */

export const useChannelsStore = defineStore('channels', {
    state: () => ({
        status: 'idle',
        channels: [],
        error: '',
    }),
    actions: {
        async fetch() {
            this.status = 'submitting'

            try {
                const response = await axios.get('/api/channels')
                this.status = 'success'
                this.channels = response.data
                this.error = null
                this.sort()
            } catch (e) {
                this.status = 'error'
                this.error = e
            }
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
        /* Much like upsert, except on specific relation */
        async upsertRelation(channelId, relationType, relationObject) {
            const channel = this.find(channelId)
            if (channel && channel[relationType]) {
                const index = channel[relationType].findIndex(i => i.id === relationObject.id)
                index !== -1
                    ? channel[relationType][index] = relationObject
                    : channel[relationType].push(relationObject)

                channel[relationType].sort((a, b) => a.id - b.id)
            }
        },
        deleteRelation(channelId, relationType, relationObject) {
            const channel = this.find(channelId)
            if (channel && channel[relationType]) {
                const index = channel[relationType].findIndex(i => i.id === relationObject.id)
                if (index >= 0) {
                    channel[relationType].splice(index, 1)
                }
            }
        },
        sort() {
            this.channels.sort((a, b) => a.id - b.id)
        },
    },
    getters: {
        find(state) {
            return (id) => state.channels.find(channel => channel.id === parseInt(id)) || null
        },
    },
})