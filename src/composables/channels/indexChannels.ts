import {onMounted, ref} from 'vue'

export function useIndexChannels() {
    // TODO add echo events for when channels list is updated

    const channels = ref([])

    onMounted(() => {
        axios.get('/api/channels').then(response => {
            channels.value = response.data
        })
    })

    return {channels}
}