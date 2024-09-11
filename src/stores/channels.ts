import axios from 'axios'
import { defineStore } from 'pinia'

/*
 | ---------------------------------------------------------------------------
 | Channels Store
 | ---------------------------------------------------------------------------
 | Manages the state for a collection of channels, including fetching,
 | updating (upserting), deleting channels, and handling their specific
 | relationships. Channels are kept sorted by their ID.
 */

interface Channel {
    id: number
    [key: string]: any
}

interface ChannelsState {
    status: 'idle' | 'submitting' | 'success' | 'error'
    channels: Channel[]
    error: string | null
}

export const useChannelsStore = defineStore('channels', {
    state: (): ChannelsState => ({
        status: 'idle',
        channels: [],
        error: null,
    }),
    actions: {
        async fetch() {
            this.status = 'submitting'

            try {
                const response = await axios.get<Channel[]>('/api/channels')
                this.status = 'success'
                this.channels = response.data
                this.error = null
                this.sort()
            } catch (e: any) {
                this.status = 'error'
                this.error = e.message || 'An error occurred'
            }
        },
        async upsert(channel: Channel) {
            const index = this.channels.findIndex(c => c.id === channel.id)
            index !== -1
                ? this.channels[index] = channel
                : this.channels.push(channel)
            this.sort()
        },
        delete(id: number) {
            this.channels = this.channels.filter(c => c.id !== id)
            this.sort()
        },
        /* Much like upsert, except on specific relation */
        async upsertRelation(channelId: number, relationType: string, relationObject: any) {
            const channel = this.find(channelId)
            if (channel && channel[relationType]) {
                const index = channel[relationType].findIndex((i: any) => i.id === relationObject.id)
                index !== -1
                    ? channel[relationType][index] = relationObject
                    : channel[relationType].push(relationObject)

                channel[relationType].sort((a: any, b: any) => a.id - b.id)
            }
        },
        deleteRelation(channelId: number, relationType: string, relationObject: any) {
            const channel = this.find(channelId)
            if (channel && channel[relationType]) {
                const index = channel[relationType].findIndex((i: any) => i.id === relationObject.id)
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
        find: (state: ChannelsState) => {
            return (id: number) => state.channels.find(channel => channel.id === id) || null
        },
    },
})
